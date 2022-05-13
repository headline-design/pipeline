import algosdk from "algosdk";
import Encrypt from "encrypt-with-password";
import Pipeline from "./index";
import { saveAs } from "file-saver";
import pipeWalletStyle from './pwalletCss.js'
import html from './pwalletHTML.js'

function pipeModalScript() {
  var modal = document.getElementById("pipeWalletModal");
  var span = document.getElementsByClassName("close")[0];
  var crtBtn = document.getElementById("pipeWcreate");
  var ldBtn = document.getElementById("pwLoad");
  var selBtn = document.getElementById("pwSelect");
  var signBtn = document.getElementById("pwSign");
  var history = document.getElementById("pwHistory");
  var historyBtn = document.getElementById("pwHistoryBtn");
  var exportBtn = document.getElementById("pwExportBtn");
  var exportBtn2 = document.getElementById("pwExportBtn2");
  var pwExportDiv = document.getElementById("pwExport");
  var responsiveInput = document.getElementById("pwInput");
  responsiveInput.oninput = function () {
    responsiveInput.style.width = (responsiveInput.value.length * 50).toString() + "px"
  }

  pwExportDiv.style.display = "none";

  exportBtn2.onclick = function () {
    PipeWallet.export();
  };

  exportBtn.onclick = function () {
    if (PipeWallet.exportShow) {
      pwExportDiv.style.display = "none";
      PipeWallet.exportShow = false;
    } else {
      pwExportDiv.style.display = "block";
      PipeWallet.exportShow = true;
    }
  };

  historyBtn.onclick = function () {
    if (PipeWallet.history) {
      history.style.display = "none";
      PipeWallet.history = false;
    } else {
      history.style.display = "block";
      PipeWallet.history = true;
    }
  };

  history.style.display = "none";

  signBtn.onclick = function () {
    PipeWallet.approve();
  };

  ldBtn.onclick = function () {
    let decryptedWallet = PipeWallet.loadWallet(
      document.getElementById("pwWord").value
    );
    let newHTML = '<option value="accounts">Select an account</option>">';
    Object.keys(decryptedWallet).forEach((address) => {
      newHTML += '<option value="' + address + '">' + address + "</option>";
    });
    document.getElementById("pwSelect").innerHTML = newHTML;
  };

  crtBtn.onclick = PipeWallet.createAccount;

  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  selBtn.onchange = function (event) {
    let address = event.target.value;
    Pipeline.address = address;
    document.getElementById("selectedpwAccount").innerText = address;
    PipeWallet.getHistory();
  };

  document
    .getElementById("pwInputfile")
    .addEventListener("change", function () {
      var fr = new FileReader();
      fr.onload = function () {
        localStorage.setItem("PipeWallet", fr.result);
        alert('Wallet loaded! Enter your password and press "load accounts"');
      };

      fr.readAsText(this.files[0]);
    });
}

export default class PipeWallet {
    
  static init() {
    this.history = false
    this.exportShow = false
    this.approved = false
    let walletDiv = document.createElement("div")
    walletDiv.id = "pipeWallet"
    document.body.appendChild(walletDiv)
    document.getElementById("pipeWallet").innerHTML =
      "<style>" + pipeWalletStyle + "</style>" + html;

    Pipeline.address = "";

    pipeModalScript();
  }

  static loadWallet(password = "") {
    let cipherText = localStorage.getItem("PipeWallet");
    if (cipherText !== null) {
      let decipheredString = Encrypt.decrypt(cipherText, password);
      return JSON.parse(decipheredString);
    } else {
      alert(
        "No wallet detected. Please create a new wallet or restore from data"
      );
      return {};
    }
  }

  static restoreFromData(data = "") {
    localStorage.setItem("PipeWallet", data);
  }

  static export() {
    return localStorage.getItem("PipeWallet");
  }

  static updateWallet(data = {}, password = "") {
    data = JSON.stringify(data);
    localStorage.setItem("PipeWallet", Encrypt.encrypt(data, password));
  }

  static sign(txn = undefined) {
    let password = document.getElementById("pwWord").value;
    let decryptedWallet = PipeWallet.loadWallet(password);
    let sk = this.getSecret(Pipeline.address, decryptedWallet);
    let signedTxn = algosdk.signTransaction(txn, sk);
    console.log(signedTxn);
    return signedTxn;
  }

  static getSecret(address, decryptedWallet) {
    let skU8Array = new Uint8Array(64);
    let skArray = decryptedWallet[address].split(",");
    console.log(skArray);
    for (let i = 0; i < 64; i++) {
      skU8Array[i] = parseInt(skArray[i]);
    }

    return skU8Array;
  }

  static createAccount() {
    let password = document.getElementById("pwWord").value;
    let decryptedWallet = PipeWallet.loadWallet(password);
    let newAccount = algosdk.generateAccount();
    decryptedWallet[newAccount.addr] = String(newAccount.sk);
    PipeWallet.updateWallet(decryptedWallet, password);
  }

  static openWallet() {
    this.approved = false;
    document.getElementById("pipeWalletModal").style.display = "block";
  }

  static approve() {
    PipeWallet.approved = true;
  }

  static waitForApproval() {
    return new Promise((resolve) => {
      var start_time = Date.now();
      function checkFlag() {
        if (PipeWallet.approved) {
          resolve(PipeWallet.approved);
        } else if (Date.now() > start_time + 60000) {
          resolve(false);
        } else {
          window.setTimeout(checkFlag, 100);
        }
      }
      checkFlag();
    });
  }

  static previewTxn(txn) {
    let keys = Object.keys(txn);
    let html = "";

    keys.forEach((key) => {
      if (typeof txn[key] === "string" || typeof txn[key] === "number")
        html += "<h4>" + key + ": " + "</h4>" + txn[key];
    });
    document.getElementById("pwPreview").innerHTML = html;
  }

  static clearPreviewTxn() {
    document.getElementById("pwPreview").innerText = "";
  }

  static close() {
    document.getElementById("pipeWalletModal").style.display = "none";
  }

  static async getHistory() {
    if (Pipeline.address !== "") {
      let address = Pipeline.address;
      let url = Pipeline.main
        ? "https://algoindexer.algoexplorerapi.io/v2/accounts/" +
          address +
          "/transactions"
        : "https://algoindexer.testnet.algoexplorerapi.io/v2/accounts/" +
          address +
          "/transactions";

      let txUrl = Pipeline.main
        ? "https://algoexplorer.io/tx/"
        : "https://testnet.algoexplorer.io/tx/";

      let data = await fetch(url);
      let dataJSON = await data.json();
      console.log(dataJSON);
      let transactions = dataJSON.transactions;
      let html = "";
      transactions.forEach((txn) => {
        html += '<a href="' + txUrl + txn.id + '">' + txn.id + "</a><br></br>";
      });
      document.getElementById("pwHistory").innerHTML = html;
    } else {
      alert("Please load your wallet");
    }
  }

  static export() {
    let data = localStorage.getItem("PipeWallet");

    let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "PipeWallet.txt");
  }

  static showHide(show = [], hide = []){
    show.forEach(id => document.getElementById(id).style.display = "block")
    hide.forEach(id => document.getElementById(id).style.display = "none")
  }
}

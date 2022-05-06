import algosdk from "algosdk";
import Encrypt from "encrypt-with-password";
import Pipeline from "./index";
import { saveAs } from "file-saver";

const pipeWalletStyle = `
.Modal {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #202c3acc;
}

.modal__content {
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 11;
	width: 500px;
	background: #fff;
	border-radius: 8px;
}

@media (max-width: 800px) {
	.Modal {
		right: 0;
		margin: 0px;
	}

	.modal__content {
		height: 100vh;
		width: 100vw;
		border-radius: 0;
		align-items: flex-start;
	}
}

.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .Section {
	width: 100%;
	min-width: 320px;
	height: fit-content;
	border: 1px solid #dedfd2;
	border-radius: 8px;
	background-color: white;
	margin-bottom: 24px;
}

.section-width-s {
	max-width: 650px;
}
.Tab {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

.tabBtn__wrapper {
	display: flex;
}

.tabBtn {
	position: relative;
	padding: 24px 16px;
	text-align: center;
	font-weight: 600;
	width: 100%;
	cursor: pointer;
	border: none;
	border-bottom: 1px solid #dedfd2;
}
.tabBtn:not(:last-child) {
	border-right: 1px solid #dedfd2;
}

.tabBtn__active {
	border-bottom: 1px solid transparent;
	background-color: white;
	border-radius: 8px 8px 0 0;
	color: #2151f5;
}

.tabBtn__active::before {
	content: '';
	display: block;
	position: absolute;
	top: -1px;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	border-radius: 8px 8px 0 0;
	height: 3px;
	background: #2151f5;
}

.tabContent {
	padding: 20px;
	display: none;
	height: 100%;
}

.tabContent__active {
	display: block;
}
.TabContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: space-between;
  }
  .InputAmountContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 48px 0 8px 0;
    width: 100%;
  }
  
  .inputAmountContainer_amount {
    display: flex;
    justify-content: center;
  }
  
  .inputAmountContainer_currency {
    font-size: 40px;
    font-weight: 600;
    color: #5b616e;
  }
  
  .inputAmountContainer_amountError {
    display: flex;
    justify-content: center;
    margin-top: 16px;
    min-height: 24px;
  }
  
  @media (max-width: 800px) {
    .InputAmountContainer {
      margin: 8% 0;
    }
  }
  
  @media (max-width: 600px) {
    .InputAmountContainer {
      margin: 16% 0;
    }
  }
  .InputAmountDynamicWidth {
	height: 80px;
	font-size: 88px;
	font-weight: 500;
	border: none;
	color: #2151f5;
	caret-color: #5b616e;
}

.InputAmountDynamicWidth::placeholder {
	font-size: 88px;
	font-weight: 500;
}

.InputAmountDynamicWidth:focus {
	outline: none;
}


.InputAmountDynamicWidth::-webkit-outer-spin-button,
.InputAmountDynamicWidth::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}


.InputAmountDynamicWidth[type='number'] {
	-moz-appearance: textfield;
}
.Table,
table {
	width: 100%;
	overflow-x: scroll;
}

table {
	border-spacing: 0;
	width: 100%;
}

th,
td {
	padding: 8px;
	text-align: left;
	padding: 14px 16px;
}

tr {
	cursor: pointer;
}

tbody tr:hover > td {
	background: #f8f8f8;
}

tbody .tr-no-hover-bg tr:hover > td {
	background: none;
}

tbody tr:first-child > td:first-child {
	border-top-left-radius: 8px;
}
tbody tr:first-child > td:last-child {
	border-top-right-radius: 8px;
}
tbody tr:last-child > td:first-child {
	border-bottom-left-radius: 8px;
}
tbody tr:last-child > td:last-child {
	border-bottom-right-radius: 8px;
}

th:last-child,
td:last-child {
	text-align: right;
	padding-right: 32px;
}

th:first-child,
td:first-child {
	padding-left: 32px;
	text-align: left;
}

tr:last-child > td {
	border-bottom: none;
}

th {
	color: #5b616e;
	font-weight: 400;
	font-size: 14px;
}

.table-is-input-table {
	border: 1px solid #dedfd2;
	border-radius: 8px;
	margin-bottom: 24px;
}

.table-is-input-table > tbody > tr {
	height: 65px;
	cursor: pointer;
}

.table-has-border-bottom th,
td {
	border-bottom: 1px solid #d8d8d8;
}

.table-has-small-padding th:last-child,
.table-has-small-padding td:last-child {
	padding-right: 16px;
}

.table-has-small-padding th:first-child,
.table-has-small-padding td:first-child {
	padding-left: 16px;
}
.tableRowSelectAsset__cellVerticalAligned {
    display: flex;
    align-items: center;
  }
  
  .tableRowSelectAsset__iconAsset {
    margin: 3px 16px 0 0;
    width: 24px;
    color: #2151f5;
  }
  .tableRowSelectAsset__cellVerticalAligned {
    display: flex;
    align-items: center;
  }
  
  .tableRowSelectAsset__iconAsset {
    margin: 3px 16px 0 0;
    width: 24px;
    color: #2151f5;
  }

  .Button {
	padding: 5px;
	border: 1px solid #2151f5;
	padding: 11px 16px;
	border-radius: 4px;
	font-size: 15px;
	font-weight: 600;
	background-color: #2151f5;
	color: white;
	cursor: pointer;
}

.Button:hover {
	background-color: #1d48d6;
}

.btn-secondary {
	background-color: white;
	color: black;
	border: 1px solid #d8d8d8;
}

.btn-secondary:hover {
	background-color: rgb(241, 241, 241);
}

.btn-danger {
	background-color: #cf202f;
	color: white;
	border: 1px solid #cf202f;
}

.btn-danger:hover {
	background-color: rgb(233, 66, 66);
}

.btn-xl {
	padding: 22px;
	width: 100%;
}

.btn-xxl {
	padding: 32px;
	width: 100%;
}

.btn-stretch {
	width: 100%;
}

.btn-disabled {
	cursor: not-allowed;
}

.btn-light {
	border: none;
	background-color: white;
}

.btn-light.btn-primary {
	color: #2151f5;
}

.btn-light.btn-primary:hover {
	color: #1d48d6;
	background-color: white;
}

.Dropdown {
	height: 48px;
	padding-left: 8px;
	color: #474747;
	border: 1px solid #d8d8d8;
	border-radius: 8px;
	font-weight: 700;
	cursor: pointer;
}

.Dropdown:focus {
	outline: none;
}


.btn-light.btn-secondary {
	color: black;
}

.btn-light.btn-secondary:hover {
	color: black;
	background-color: white;
}

.btn-light.btn-danger {
	color: #cf202f;
}

.btn-light.btn-danger:hover {
	color: #cf202f;
	background-color: white;
}
.TabFooter {
	display: flex;
	justify-content: space-between;
	margin-top: 24px;
}

.tab-footer-margin-top-none {
	margin-top: 0;
}
.Text {
	margin: 0;
}

.text-h1 {
	font-size: 22px;
	font-weight: 600;
}

.text-h2 {
	font-size: 22px;
	font-weight: 500;
}

.text-h3 {
	font-size: 18px;
	font-weight: 600;
}

.text-xxl {
	font-size: 32px;
}

.text-xl {
	font-size: 22px;
}

.text-l {
	font-size: 18px;
}

.text-m {
	font-size: 16px;
}

.text-s {
	font-size: 14px;
}

.text-xs {
	font-size: 12px;
}

.text-700 {
	font-weight: 700;
}

.text-600 {
	font-weight: 600;
}

.text-500 {
	font-weight: 500;
}

.text-400 {
	font-weight: 400;
}

.text-white {
	color: white;
}

.text-grey {
	color: #5b616e;
}

.text-blue {
	color: #2151f5;
}

.text-red {
	color: #cf202f;
}

.text-green {
	color: #098551;
}

.text-uppercase {
	text-transform: uppercase;
}

.input__field {
	border: none;
	height: 40px;
	font-size: 16px;
}

.input__field:focus {
	outline: none;
}
.Section {
	width: 100%;
	min-width: 320px;
	height: fit-content;
	border: 1px solid #dedfd2;
	border-radius: 8px;
	background-color: white;
	margin-bottom: 24px;
}

.Table,
table {
	width: 100%;
	overflow-x: scroll;
}

table {
	border-spacing: 0;
	width: 100%;
}

th,
td {
	padding: 8px;
	text-align: left;
	padding: 14px 16px;
}

tr {
	cursor: pointer;
}

tbody tr:hover > td {
	background: #f8f8f8;
}

tbody .tr-no-hover-bg tr:hover > td {
	background: none;
}

tbody tr:first-child > td:first-child {
	border-top-left-radius: 8px;
}
tbody tr:first-child > td:last-child {
	border-top-right-radius: 8px;
}
tbody tr:last-child > td:first-child {
	border-bottom-left-radius: 8px;
}
tbody tr:last-child > td:last-child {
	border-bottom-right-radius: 8px;
}

th:last-child,
td:last-child {
	text-align: right;
	padding-right: 32px;
}

th:first-child,
td:first-child {
	padding-left: 32px;
	text-align: left;
}

tr:last-child > td {
	border-bottom: none;
}

th {
	color: #5b616e;
	font-weight: 400;
	font-size: 14px;
}

.table-is-input-table {
	border: 1px solid #dedfd2;
	border-radius: 8px;
	margin-bottom: 24px;
}

.table-is-input-table > tbody > tr {
	height: 65px;
	cursor: pointer;
}

.table-has-border-bottom th,
td {
	border-bottom: 1px solid #d8d8d8;
}

.table-has-small-padding th:last-child,
.table-has-small-padding td:last-child {
	padding-right: 16px;
}

.table-has-small-padding th:first-child,
.table-has-small-padding td:first-child {
	padding-left: 16px;
}

.TableRowInputText:hover td {
	background-color: white;
}

.tableRowInputText__cellVerticalAligned {
	display: flex;
	align-items: center;
}

.tableRowInputText__icon {
	margin: 3px 16px 0 0;
	color: #5b616e;
}



.section-width-s {
	max-width: 650px;
}

/* Global styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  overscroll-behavior: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  color: inherit;
}

`;

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
  responsiveInput.oninput = function (){
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



const pscriptTest = `document.getElementById("myBtn").onclick = function(){alert("hello")}`;

export default class PipeWallet {
    
  static init() {
    const html = `

        <div id="pipeWalletModal" class="modal">
          <!-- Modal content -->
          <div class="modal-content">
          <div class="Modal">
          <div class="modal__content">
             <div class="Tab">
                <div class="tabBtn__wrapper">
                   <div class="tabBtn tabBtn__active">Send</div>
                   <div id="pwExportBtn" class="tabBtn">Tools</div>
                </div>
                <div class="tabContent tabContent__active">
                   <div>
                      <div class="TabContent">
                      <span class="close">&times;</span>



            <div id="pwExport">
                <button id="pwExportBtn2">Export</button>
                <label>Import:</label><input type="file" name="inputfile" id="pwInputfile">
                <button id="pwHistoryBtn" >History</button>
                <input id="pwWord" type="text" value="testingarandompassword"></input>
            <button id="pwLoad">Load Accounts</button>
            <button id="pipeWcreate">Create a new account</button>
            <h3 id="selectedpwAccount"></h3>
            
            <p id="pwPreview"></p>
            <p>Select Your Account</p> 
            <select class="Dropdown" id="pwSelect"><option value="accounts">Select Account</option></select>

                <div id="pwHistory"></div>
            </div>
            
            <br></br>
          </div>
                         <form>
                            <div class="InputAmountContainer">
                               <div class="inputAmountContainer_amount"><span class="inputAmountContainer_currency">$</span>
                               <input  id="pwInput" class="InputAmountDynamicWidth" type="number" name="amount" min="1" max="999999" placeholder="0" value="0" style="width: 50px;"></div>
                               <div class="inputAmountContainer_amountError">
                                  <p class="Text text-red"></p>
                               </div>
                            </div>
                            <table class="table-is-input-table table-has-border-bottom">
                               <tbody>
                                  <tr class="selectCoin">
                                     <td>
                                        <p class="Text text-grey">Pay with</p>
                                     </td>
                                     <td>
                                        <div class="tableRowSelectAsset__cellVerticalAligned">
                                           <img class="tableRowSelectAsset__iconAsset" src="https://cdn.coinranking.com/lzbmCkUGB/algo.svg" alt="Algorand icon">
                                           <p class="Text">Algo</p>
                                        </div>
                                     </td>
                                     <td>
                                        <div>
                                           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                              <path fill="none" d="M0 0h24v24H0V0z"></path>
                                              <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                           </svg>
                                        </div>
                                     </td>
                                  </tr>
                                  <tr class="TableRowInputText">
                                     <td>
                                        <p class="Text text-grey">To</p>
                                     </td>
                                     <td>
                                        <div class="tableRowInputText__cellVerticalAligned">
                                           <div class="tableRowInputText__icon" style="font-size: 16px;">
                                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                 <path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path>
                                              </svg>
                                           </div>
                                           <div class="Input"><input type="text" placeholder="Mobile, email or address" class="input__field" name="address" required="" minlength="0" value=""></div>
                                        </div>
                                     </td>
                                     <td></td>
                                  </tr>
                                  <tr class="TableRowInputText">
                                     <td>
                                        <p class="Text text-grey">Note</p>
                                     </td>
                                     <td>
                                        <div class="tableRowInputText__cellVerticalAligned">
                                           <div class="tableRowInputText__icon" style="font-size: 21px;">
                                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                 <path fill="none" d="M0 0h24v24H0z"></path>
                                                 <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                                              </svg>
                                           </div>
                                           <div class="Input"><input type="text" placeholder="Optional message" class="input__field" name="note" minlength="0" value=""></div>
                                        </div>
                                     </td>
                                     <td></td>
                                  </tr>
                               </tbody>
                            </table>
                            <button class="Button btn-xl" id="pwSign">Sign Transaction</button>
                         </form>
                         <div class="TabFooter">
                            <p class="Text text-grey">Algo balance</p>
                            <p class="Text text-grey">0.000000 Algo = $0.00</p>
                         </div>
                      </div>
                   </div>
                </div>
                <div class="tabContent">
                   <div>
                      <div class="TabContent">
                         <div class="TableReceive">
                            <table class="table-is-input-table table-has-border-bottom">
                               <tbody>
                                  <tr class="TableRowQR">
                                     <td colspan="3">
                                        <div class="tableRowQR__iconWrapper">
                                           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                              <path fill="none" d="M0 0h24v24H0z"></path>
                                              <path d="M15 21h-2v-2h2v2zm-2-7h-2v5h2v-5zm8-2h-2v4h2v-4zm-2-2h-2v2h2v-2zM7 12H5v2h2v-2zm-2-2H3v2h2v-2zm7-5h2V3h-2v2zm-7.5-.5v3h3v-3h-3zM9 9H3V3h6v6zm-4.5 7.5v3h3v-3h-3zM9 21H3v-6h6v6zm7.5-16.5v3h3v-3h-3zM21 9h-6V3h6v6zm-2 10v-3h-4v2h2v3h4v-2h-2zm-2-7h-4v2h4v-2zm-4-2H7v2h2v2h2v-2h2v-2zm1-1V7h-2V5h-2v4h4zM6.75 5.25h-1.5v1.5h1.5v-1.5zm0 12h-1.5v1.5h1.5v-1.5zm12-12h-1.5v1.5h1.5v-1.5z"></path>
                                           </svg>
                                        </div>
                                     </td>
                                  </tr>
                                  <tr class="selectCoin">
                                     <td>
                                        <p class="Text text-grey">Asset</p>
                                     </td>
                                     <td>
                                        <div class="tableRowSelectAsset__cellVerticalAligned">
                                           <img class="tableRowSelectAsset__iconAsset" src="https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg" alt="Bitcoin icon">
                                           <p class="Text">Bitcoin</p>
                                        </div>
                                     </td>
                                     <td>
                                        <div>
                                           <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                              <path fill="none" d="M0 0h24v24H0V0z"></path>
                                              <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                           </svg>
                                        </div>
                                     </td>
                                  </tr>
                                  <tr>
                                     <td>
                                        <p class="Text text-grey">Address</p>
                                     </td>
                                     <td>
                                        <div class="tableRowInputText__cellVerticalAligned">
                                           <div class="tableRowInputText__icon" style="font-size: 16px;">
                                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                 <path d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-352 96c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H86.4C74 384 64 375.4 64 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2zM512 312c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
                                              </svg>
                                           </div>
                                           <p class="Text">123bu1b2423i45b4ib</p>
                                        </div>
                                     </td>
                                     <td>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                           <path fill="none" d="M0 0h24v24H0V0z"></path>
                                           <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                                        </svg>
                                     </td>
                                  </tr>
                               </tbody>
                            </table>
                         </div>
                         <div class="TabFooter tab-footer-margin-top-none">
                            <p class="Text text-grey">BTC balance</p>
                            <p class="Text text-grey">0.000000 BTC = €0.00</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>           
       
       
       
        
        </div>`;
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

  static approved = false;

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

  static history = false;

  static export() {
    let data = localStorage.getItem("PipeWallet");

    let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "PipeWallet.txt");
  }

  static exportShow = false;
}

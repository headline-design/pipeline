import algosdk from 'algosdk'

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function getAppIndex(txn, net) {

    let data = undefined
    let dataObj = undefined
    let id = undefined
  
    let url = ""

    await sleep(15000)
  
    if (!net) {
      url = "https://algoindexer.testnet.algoexplorerapi.io"
    }
    else {
      url = "https://algoindexer.algoexplorerapi.io"
    }
  
    data = await fetch(url + '/v2/transactions/' + txn)
    dataObj = await data.json()
    id = await dataObj.transaction["created-application-index"]
    window.reachLog += "\nCreated Application: " + id
    return id
  }

  async function waitForConfirmation (algodclient, txId) {
    let response = await algodclient.status().do();
    let lastround = response["last-round"];
    while (true) {
      const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
      if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
        //Got the completed Transaction
        console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
        break;
      }
      lastround++;
      await algodclient.statusAfterBlock(lastround).do();
    }
  };

  function u8array(text) {
    return Uint8Array.from(Array.from(text).map(letter => letter.charCodeAt(0)));
  }

  async function readGlobalState(net,index) {
  
    let client = ""
    let url = ""
  
    if (!net) {
      client = new algosdk.Algodv2("", 'https://api.testnet.algoexplorer.io', '');
      url = "https://api.testnet.algoexplorer.io"
    }
    else {
      client = new algosdk.Algodv2("", 'https://algoexplorerapi.io', '');
      url = "https://algoexplorerapi.io"
    }
  
    let appData = await fetch(url + '/v2/applications/' + index)
    let appJSON = await appData.json()
    return appJSON.params["global-state"]
  }

  export {getAppIndex, waitForConfirmation, u8array, readGlobalState}
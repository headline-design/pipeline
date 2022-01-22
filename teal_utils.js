function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function getAppIndex(txn, net, ref) {

    let data = undefined
    let dataObj = undefined
    let id = undefined
  
    let url = ""

    await sleep(15000)
  
    if (ref.EnableDeveloperAPI) {
      url = ref.indexer
    }
    else {
      if (!net) {
        url = "https://algoindexer.testnet.algoexplorerapi.io"
      }
      else {
        url = "https://algoindexer.algoexplorerapi.io"
      }
    }
  
    data = await fetch(url + '/v2/transactions/' + txn)
    dataObj = await data.json()
    id = await dataObj.transaction["created-application-index"]
    return id
  }

  function u8array(text) {
    return Uint8Array.from(Array.from(text).map(letter => letter.charCodeAt(0)));
  }

  async function readGlobalState(net,index,ref) {
  
    let url = ""

    if (ref.EnableDeveloperAPI) {
      url = ref.indexer
    }
    else {
      if (!net) {
        url = "https://algoindexer.testnet.algoexplorerapi.io"
      }
      else {
        url = "https://algoindexer.algoexplorerapi.io"
      }
    }

    let appData = await fetch(url + '/v2/applications/' + index)
    let appJSON = await appData.json()
    return appJSON.application.params["global-state"]
  }

  async function getAsaIndex(txn, net, ref) {

    let data = undefined
    let dataObj = undefined
    let id = undefined
  
    let url = ""

    await sleep(15000)
  
    if (ref.EnableDeveloperAPI) {
      url = ref.indexer
    }
    else {
      if (!net) {
        url = "https://algoindexer.testnet.algoexplorerapi.io"
      }
      else {
        url = "https://algoindexer.algoexplorerapi.io"
      }
    }
  
    data = await fetch(url + '/v2/transactions/' + txn)
    dataObj = await data.json()
    id = await dataObj.transaction["created-asset-index"]
    return id
  }

  export {getAppIndex, getAsaIndex, u8array, readGlobalState}
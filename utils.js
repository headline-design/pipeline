async function configClient(main, api) {

    let paramServer = 'https://'
    let transServer = 'https://'

    if (main) {
        paramServer = paramServer + 'algoexplorerapi.io/v2/transactions/params/'
        transServer = transServer + 'algoexplorerapi.io/v2/transactions/'
    }
    else {
        paramServer = paramServer + "testnet.algoexplorerapi.io/v2/transactions/params/"
        transServer = transServer + "testnet.algoexplorerapi.io/v2/transactions/"
    }

    if (api) {
        paramServer = this.algod + "/v2/transactions/params/";
        transServer = this.algod + "/v2/transactions/";
    }

    let fetchObject = {}
    if (api) {
        fetchObject = {
            method: "GET",
            headers: {
                'X-Algo-API-Token': this.token,
            }
        }
    }

    let params = await (await fetch(paramServer, fetchObject)).json()

    if (!main) {
        params.genesisID = 'testnet-v1.0';
        params.genesisHash = 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=';
    }
    else{
        params.genesisID = 'mainnet-v1.0'
        params.genesisHash = 'wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8='
    }

    if (api) {
        params.genesisID = this.devGenId;
        params.genesisHash = this.devGenHash;
    }

    params.firstRound = params["last-round"]
    params.lastRound = params["last-round"] + 1000

    return {
        paramServer: paramServer,
        tranServer: transServer,
        params: params
    }
}

function configIndexer(main, api) {
    let indexerURL = "https://"

    if (main) {
        indexerURL = indexerURL + 'algoexplorerapi.io/idx2/v2/accounts/'
    }
    else {
        indexerURL = indexerURL + "testnet.algoexplorerapi.io/idx2/v2/accounts/"
    }

    if (api) { indexerURL = this.indexer + "/v2/accounts/" }

    return indexerURL
}

async function sendTxns(txns, transServer, api = false,token="") {
    let requestHeaders = { 'Content-Type': 'application/x-binary' };

    if (api) {
        requestHeaders = {
            'X-Algo-API-Token': token
        }
    }

    let transactionID = await fetch(transServer, {
        method: 'POST',
        headers: requestHeaders,
        body: txns
    })
        .then(response => response.json())
        .then(data => {
            return data.txId
        })
        .catch(error => {
            console.error('Error:', error)
        })

    return transactionID

}

export { configClient, configIndexer, sendTxns }
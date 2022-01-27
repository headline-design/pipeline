import MyAlgo from '@randlabs/myalgo-connect'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { encode, decode } from "algo-msgpack-with-bigint";
import base32 from 'hi-base32';
import { CachedKeyDecoder } from 'algo-msgpack-with-bigint/dist/CachedKeyDecoder';
import createAsaTxn from './createAsaTxn.js'
import { getAppIndex, getAsaIndex, u8array,readGlobalState} from './teal_utils.js';
import algosdk from 'algosdk'
import { configIndexer, configClient, sendTxns, configAlgosdk} from './utils.js';

//Note: this class is a work in progress. May be unstable. Roll back to version 1.2.7 if issues encountered
export default class Pipeline {
    static init() {
        this.alerts = true
        this.EnableDeveloperAPI = false;
        this.indexer = "http://localhost:8980";
        this.algod = "http://localhost:4001";
        this.token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        this.devGenHash = "sC3P7e2SdbqKJK0tbiCdK9tdSpbe6XeCGKdoNzmlj0E="
        this.devGenId = "devnet-v1.0"
        this.index = 0;
        this.pipeConnector = "myAlgoWallet";
        this.chainId = 0
        this.main = true;
        this.address = "";
        this.txID = "";
        this.myBalance = 0;
        this.connector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org", // Required
            qrcodeModal: QRCodeModal,
        });

        this.wallet = new MyAlgo();
        return new MyAlgo();
    }

    static async balance(address) {

        let indexerURL = configIndexer(this.main, this.EnableDeveloperAPI, this)

        let url2 = indexerURL +"/v2/accounts/" + address
        try {
            let data = await fetch(url2)
            let data2 = await data.json()
            let data3 = JSON.stringify(data2.account.amount / 1000000);
            this.myBalance = data3;
            return data3;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    static async connect(wallet) {
        this.address = "";

        switch (this.pipeConnector) {
            case "myAlgoWallet":
                try {
                    const accounts = await wallet.connect()
                    let item1 = accounts[0]
                    item1 = item1['address']
                    this.address = item1;
                    return item1;
                } catch (err) {
                    console.error(err)
                }
                break;
            case "WalletConnect":

                this.connector.on("connect", (error, payload) => {
                    if (error) {
                        throw error;
                    }
                    console.log(payload)
                    this.address = payload.params[0].accounts[0];
                    this.chainId = payload.params[0].chainId
                }
                );

                this.connector.on("session_update", (error, payload) => {
                    alert(error + payload)
                    if (error) {
                        throw error;
                    }
                    // Get updated accounts
                    this.chainId = payload.params[0].chainId

                });

                if (!this.connector.connected) {
                    await this.connector.createSession().then(data => { console.log(data) })
                }
                else {
                    this.address = this.connector.accounts[0];
                }
                break;
            case "AlgoSigner":
                if (typeof AlgoSigner !== 'undefined') {
                    await AlgoSigner.connect()
                    let data = await AlgoSigner.accounts({ ledger: (this.main === true) ? 'MainNet' : 'TestNet' })
                    let SignerAdd = data[0].address
                    this.address = SignerAdd;
                    return SignerAdd

                } else {
                    alert('AlgoSigner is NOT installed.');
                };
                break;
            default:
                break;
        }

        function waitForAddress() {
            return new Promise(resolve => {
                var start_time = Date.now();
                function checkFlag() {
                    if (Pipeline.address !== "") {
                        resolve(Pipeline.address);
                    } else if (Date.now() > start_time + 60000) {
                        resolve("error occurred");
                    } else {
                        window.setTimeout(checkFlag, 200);
                    }
                }
                checkFlag();
            });
        }

        const address = await waitForAddress();
        return address;
    }

    static async sign(mytxnb, group = false) {

        console.log(mytxnb)
        let signedTxn = ""

        if (this.pipeConnector === "myAlgoWallet") {
            if (!group) {
                signedTxn = await this.wallet.signTransaction(mytxnb.toByte())
                signedTxn = signedTxn.blob;
                return signedTxn

            }
            else {
                signedTxn = await this.wallet.signTransaction(mytxnb.map(txn => txn.toByte()))
                return [signedTxn[0].blob,signedTxn[1].blob]
            }
        }
        else {

            let txns = []
            if (!group) {
                txns[0] = mytxnb
            }
            else {
                txns[0] = mytxnb[0]
                txns[1] = mytxnb[1]
            }

            console.log("Unencoded txns:")
            console.log(txns)

            /*
                    let prototxn = {
                        "amt": mytxnb.amount,
                        "fee": 1000,
                        "fv": mytxnb.lastRound - 1000,
                        "gen": mytxnb.genesisID,
                        "gh": new Uint8Array(Buffer.from(mytxnb.genesisHash, 'base64')),
                        "lv": mytxnb.lastRound,
                        "note": mytxnb.note,
                        "rcv": new Uint8Array(base32.decode.asBytes(mytxnb.to).slice(0, 32)),
                        "snd": new Uint8Array(base32.decode.asBytes(this.address).slice(0, 32)),
                        "type": "pay"
                    }
            
                    let prototxnASA = {};
                    let prototxnb = encode(prototxn);
                    let txns = [];
                    txns[0] = prototxnb;
            
                    if (this.index !== 0) {
                        prototxnASA = {
                            "aamt": mytxnb.amount,
                            "arcv": new Uint8Array(base32.decode.asBytes(mytxnb.to).slice(0, 32)),
                            "fee": 1000,
                            "fv": mytxnb.lastRound - 1000,
                            "gen": mytxnb.genesisID,
                            "gh": new Uint8Array(Buffer.from(mytxnb.genesisHash, 'base64')),
                            "lv": mytxnb.lastRound,
                            "note": mytxnb.note,
                            "snd": new Uint8Array(base32.decode.asBytes(this.address).slice(0, 32)),
                            "type": "axfer",
                            "xaid": parseInt(mytxnb.assetIndex)
                        }
                        prototxnb = encode(prototxnASA);
                        txns[0] = prototxnb;
                    }
                    
                            console.log(prototxnb)
                            console.log(new TextDecoder().decode(prototxnb))
                            console.log(JSON.stringify(decode(prototxnb)))
                    */
            // Sign transaction

            let txnsToSign = txns.map(txnb => {

                let packed = algosdk.encodeUnsignedTransaction(txnb)
                let encodedTxn = Buffer.from(packed).toString("base64")

                if (this.pipeConnector === "WalletConnect") {
                    return {
                        txn: encodedTxn,
                        message: "",
                        // Note: if the transaction does not need to be signed (because it's part of an atomic group
                        // that will be signed by another party), specify an empty singers array like so:
                        // signers: [],
                    };
                }
                else {
                    return { txn: encodedTxn }
                }
            });

            let requestParams = [txnsToSign]
            console.log("TXNs to Sign:")
            console.log(requestParams)

            if (this.pipeConnector === "WalletConnect") {

                let request = formatJsonRpcRequest("algo_signTxn", requestParams)
        
                //request.id = this.chainId

                console.log(request);

                try {
                    let result = await this.connector.sendCustomRequest(request);

                    let binarySignedTxs = await result.map((tx) => {return new Uint8Array(Buffer.from(tx, 'base64'))});
                    return !group?binarySignedTxs[0]:binarySignedTxs
                }
                catch (error) { console.log(error) }
            }
            else {
                try {
                    let result = await AlgoSigner.signTxn(requestParams)

                    let binarySignedTxs = await result.map((tx) => {return new Uint8Array(Buffer.from(tx.blob, 'base64'))});
                    return !group?binarySignedTxs[0]:binarySignedTxs
                }
                catch (error) { console.log(error) }
            }
        }
    }

    static makeAppCall(appId, appArgs, params,accounts) {
        let id = parseInt(appId)
        let converted = []
        appArgs.forEach(arg => {
            converted.push(
                typeof arg === "number" ? algosdk.encodeUint64(arg) : u8array(arg)
            )
        })
        appArgs = converted

        let txn = algosdk.makeApplicationNoOpTxn(this.address, params, id, appArgs,accounts)

        return txn

    }

    static makeTransfer(address, amt, myNote, index = 0, params = {}) {
        var buf = new Array(myNote.length)
        var encodedNote = new Uint8Array(buf)
        for (var i = 0, strLen = myNote.length; i < strLen; i++) {
            encodedNote[i] = myNote.charCodeAt(i)
        }

        console.log('My encoded note: ' + encodedNote)

        let txn = {
            from: this.address,
            to: address,
            amount: parseInt(amt),
            note: encodedNote,
            genesisId: params.genesisID,
            genesisHash: params.genesisHash,
            type: 'pay',
            flatFee: true,
            fee: 1000,
            firstRound: parseInt(params['last-round']),
            lastRound: parseInt(params['last-round'] + 1000),
        }

        if (index !== 0) {
            this.index = index;
            txn.type = 'axfer'
            txn.assetIndex = parseInt(index)

            txn = algosdk.makeAssetTransferTxn(txn.from, txn.to, undefined, undefined,txn.fee, txn.amount, txn.firstRound, txn.lastRound, txn.note, txn.genesisHash, txn.genesisId, txn.assetIndex, undefined)
        }
        else {
            txn = algosdk.makePaymentTxn(txn.from, txn.to, txn.fee, txn.amount, undefined, txn.firstRound, txn.lastRound, txn.note, txn.genesisHash, txn.genesisId, undefined)
        }

        txn.fee = 1000

        console.log(txn);
        return txn
    }

    static async send(address, amt, myNote, _sendingAddress, _wallet, index = 0) {

        let client = await configClient(this.main, this.EnableDeveloperAPI,this)
        let transServer = client.tranServer
        let params = client.params

        try {
            let txn = this.makeTransfer(address, amt, myNote, index, params)

            let signedTxn = {};

            signedTxn = await this.sign(txn)

            console.log(signedTxn)

            let transactionID = await sendTxns(signedTxn, transServer, this.EnableDeveloperAPI,this.token,this.alerts)

            this.txID = transactionID
            if (transactionID === undefined) { transactionID = "Transaction failed" }
            return transactionID
        } catch (err) {
            console.error(err)
        }
    }

    static async createAsa(asaObject = {}) {

        let txn = {}

        let client = await configClient(this.main, this.EnableDeveloperAPI,this)
        let transServer = client.tranServer
        let params = client.params

        let myNote = asaObject.note || "New Asa"

        let buf = new Array(myNote.length)
        let encodedNote = new Uint8Array(buf)
        for (let i = 0, strLen = myNote.length; i < strLen; i++) {
            encodedNote[i] = myNote.charCodeAt(i)
        }

        asaObject.note = encodedNote

        console.log('My encoded note: ' + encodedNote)

        txn = createAsaTxn(params, asaObject)

        txn.fee = 1000

        console.log(txn);

        let signedTxn = {};

        signedTxn = await this.sign(txn, false)

        console.log(signedTxn)

        try {

            let transactionID = await sendTxns(signedTxn, transServer, this.EnableDeveloperAPI,this.token,this.alerts)

            this.txID = transactionID
            if (transactionID === undefined) {
                return "Transaction failed"
            }
            else {
                let assetID = await getAsaIndex(transactionID, this.main, this)
                console.log(assetID)
                return assetID
            }

        } catch (err) {
            console.error(err)
        }
    }

    static async compileProgram(client, teal) {
        let encoder = new TextEncoder();
        let programBytes = encoder.encode(teal);
        try {
            let compileResponse = await client.compile(programBytes).do();
            return compileResponse;
        }
        catch (error) { console.log(error) }
    }

    static async deployTeal(teal = "", teal2 = "", bytesInts = [], appArgs = [], onComplete = 0) {
        if (teal !== "") {

            let algodClient = configAlgosdk(this)

            let clientb = await configClient(this.main, this.EnableDeveloperAPI)
            let transServer = clientb.tranServer

            let compiled = ""

            compiled = await this.compileProgram(algodClient, teal)
            let compiledClear = await this.compileProgram(algodClient, teal2)

            let params = await algodClient.getTransactionParams().do();

            let converted = []
            appArgs.forEach(arg => {
                converted.push(
                    typeof arg === "number" ? algosdk.encodeUint64(arg) : u8array(arg)
                )
            })
            appArgs = converted

            console.log(appArgs)

            let lbytes = bytesInts[0]
            let gbytes = bytesInts[1]
            let lints = bytesInts[2]
            let gints = bytesInts[3]

            let txn = algosdk.makeApplicationCreateTxnFromObject({
                suggestedParams: {
                    ...params,
                },
                from: this.address,
                numLocalByteSlices: lbytes,
                numGlobalByteSlices: gbytes,
                numLocalInts: lints,
                numGlobalInts: gints,
                appArgs: appArgs,
                approvalProgram: new Uint8Array(Buffer.from(compiled.result, "base64")),
                clearProgram: new Uint8Array(Buffer.from(compiledClear.result, "base64")),
                onComplete: onComplete,
            });

            try {
                let signedTxn = await this.sign(txn)
                console.log(signedTxn)
                let response = await sendTxns(signedTxn, transServer, this.EnableDeveloperAPI, this.token,this.alerts);

                console.log(response)
                this.txID = response
                let appId = await getAppIndex(response, this.main,this)
                console.log(appId)

                if (appId === undefined) {
                    appId = "Transaction failed"
                }
                return appId
            }
            catch (error) { console.log(error) }
        }
        else {
            console.log("Teal program or clear program empty")
        }
    }

    static async optIn(appId = 0, appArgs = []) {

        let algodClient = configAlgosdk(this)

        let clientb = await configClient(this.main, this.EnableDeveloperAPI,this)
        let transServer = clientb.tranServer

        let params = await algodClient.getTransactionParams().do();

        let converted = []
        appArgs.forEach(arg => {
            converted.push(
                typeof arg === "number" ? algosdk.encodeUint64(arg) : u8array(arg)
            )
        })
        appArgs = converted

        let txn = ""

        txn = algosdk.makeApplicationOptInTxnFromObject({
            suggestedParams: {
                ...params,
            },
            from: this.address,
            appIndex: parseInt(appId),
            appArgs: appArgs
        });

        try {
            let signedTxn = await this.sign(txn);
            console.log(signedTxn)
            let response = await sendTxns(signedTxn, transServer, this.EnableDeveloperAPI, this.token, this.alerts)
            console.log(response)
            return response
        }
        catch (error) {
            console.log(error)
        }

    }

    static async appCall(appId, appArgs) {

        let clientb = await configClient(this.main, this.EnableDeveloperAPI)
        let transServer = clientb.tranServer
        let params = clientb.params

        let txn = this.makeAppCall(appId, appArgs, params)

        try {
            let signedTxn = await this.sign(txn);
            console.log(signedTxn)
            let response = await sendTxns(signedTxn, transServer, this.EnableDeveloperAPI, this.token, this.alerts)
            console.log(response)

            return response
        }
        catch (error) {
            console.log(error)
        }

    }

    static async getParams() {
        let client = await configClient(this.main, this.EnableDeveloperAPI,this)
        return client.params
    }

    static async deleteApp(appId = 0) {

        let algodClient = configAlgosdk(this)
        let params = await algodClient.getTransactionParams().do();

        let txn = algosdk.makeApplicationDeleteTxnFromObject({
            suggestedParams: {
                ...params,
            },
            from: this.address,
            appIndex: parseInt(appId),
        });

        let signedTxn = await this.sign(txn);

        let clientb = await configClient(this.main, this.EnableDeveloperAPI,this)
        let transServer = clientb.tranServer

        try {
            let response = await sendTxns(signedTxn, transServer, this.EnableDeveloperAPI,this.token,this.alerts)
            console.log(response)
            return response
        }
        catch (error) { console.log(error) }
    }

    static async appCallWithTxn(appId = 0, appArgs = [],reciever = "", amount = 0, note = "", index = 0, accounts = undefined) {
        let id = parseInt(appId)

        let algodClient = configAlgosdk(this)

        let clientb = await configClient(this.main, this.EnableDeveloperAPI,this)
        let params = clientb.params

        let txns = [
            this.makeAppCall(id, appArgs, params,accounts),
            this.makeTransfer(reciever, amount, note, index, params)
        ]

        txns = algosdk.assignGroupID(txns)

        console.log(txns)

        let signedTxn = await this.sign(txns, true)

        console.log(signedTxn)

        try {
            let response = await algodClient.sendRawTransaction(signedTxn).do();
            if (response.txId !== undefined) {
                return response.txId
            }
            else{
                if (this.alerts){
                    alert(response.message)
                }
            }
        }
        catch (error) { console.log(error) }
    }


    static async getAppCreator(appid) {
        let data = undefined
        let dataObj = undefined
        let id = undefined

        let url = ""

        url = configIndexer(this.main, this.EnableDeveloperAPI, this)

        data = await fetch(url + '/v2/applications/' + parseInt(appid))
        dataObj = await data.json()
        id = await dataObj.application.params.creator
        return id
    }

    static async readGlobalState(appId){
        let data = await readGlobalState(this.main,appId,this)
        return data
    }
}

/* usage

update balance at intervals:

componentDidMount() {
      this.interval = setInterval(() => this.setState({balance: Pipeline.myBalance}), 1000);
    }

var balance = 0;

Pipeline.balance(address).then(data => balance = data);

const myAlgoWallet = Pipeline.init();

//useTestNet

Pipeline.main = false;

Pipeline.connect(myAlgoWallet)
    .then(data => {
        console.log(data);
    });

Pipeline.send(address, amount, note, sendingAddress, myAlgowallet, index)
    .then(data => {
        console.log(data);
    });

    */

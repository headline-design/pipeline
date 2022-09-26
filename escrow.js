import algosdk from "algosdk";
import Pipeline from "./index";

export default class Escrow {

    static address = ""

    static createAccount(){
        let newAccount = algosdk.generateAccount();
        console.log(newAccount)
        let mnemonic = algosdk.secretKeyToMnemonic(newAccount.sk)
        this.address = newAccount.addr
        return {
            address: newAccount.addr,
            mnemonic: mnemonic,
            sk:newAccount.sk
        }
    }

    static sign(mytxnb, group = false) {

        if (!group) {
            let signedTxn = PipeWallet.sign(mytxnb);
            PipeWallet.clearPreviewTxn();
            PipeWallet.close();
            return signedTxn.blob;
        } else {
            let signedGroup = [];

            mytxnb.forEach((transaction) => {
                let signed = PipeWallet.sign(transaction);
                signedGroup.push(signed.blob);
            });

            console.log("Signed Group:");
            console.log(signedGroup);
            return signedGroup;
        }
    }

    static async fund(amount){
        let txid = await Pipeline.send(this.address,parseInt(amount),"",undefined,undefined,0)
        return txid
    }
}
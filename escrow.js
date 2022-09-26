import algosdk from "algosdk";
import Pipeline from "./index";

export default class Escrow {

    static address = ""
    static secret = undefined

    static createAccount(){
        let newAccount = algosdk.generateAccount();
        console.log(newAccount)
        let mnemonic = algosdk.secretKeyToMnemonic(newAccount.sk)
        this.address = newAccount.addr
        this.secret = newAccount.sk
        return {
            address: newAccount.addr,
            mnemonic: mnemonic,
            sk:newAccount.sk
        }
    }

    static sign(mytxnb, group = false) {

        if (!group) {
            let signedTxn = algosdk.signTransaction(mytxnb, this.secret)
            return signedTxn.blob;
        } else {
            let signedGroup = [];

            mytxnb.forEach((transaction) => {
                let signed = algosdk.signTransaction(transaction, this.secret);
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
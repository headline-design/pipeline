import WalletConnect from '@walletconnect/client'
import algosdk from 'algosdk'
import Encrypt from 'encrypt-with-password'

console.log(Encrypt.encrypt("hello world", "testing1234567890"))

console.log(Encrypt.decrypt("d78afe527a0b1bcc4a38cf8e565f47e9:4423b393dc2f5e2bb8c2c697ed2839c0", "testing1234567890"))

export default class PipeWallet {

    static decryptedWallet = {
    }


    static loadWallet(password="") {
        let cipherText = localStorage.getItem("PipeWallet")
        if (cipherText.length > 0) {
            return JSON.parse(Encrypt.decrypt(cipherText, password))
        }
        else {
            alert("No wallet detected. Please create a new wallet or restore from data")
        }
    }

    static restoreFromData(data="") {
        localStorage.setItem("PipeWallet", data)
    }

    static export(){
        return localStorage.getItem("PipeWallet")
    }

    static updateWallet(data={}, password="") {
        data = JSON.stringify(data)
        localStorage.setItem("PipeWallet", Encrypt.encrypt(data, password))
    }

    static sign(address,txn=any){
        let sk = getSecret(address)
        return algosdk.signTransaction(txn,sk)
    }

    static getSecret(address){
        let skU8Array = new Uint8Array(64)
        let skArray = this.decryptedWallet[address].split(",")
        console.log(skArray)
        for (let i = 0; i< 64;i++){
            skU8Array[i] = parseInt(skArray[i])
        }

        return skU8Array
    }

    static createAccount(){
        let newAccount = algosdk.generateAccount()
        this.decryptedWallet[newAccount.addr] = String(newAccount.sk)
    }
}


PipeWallet.createAccount()
console.log(PipeWallet.decryptedWallet)
console.log(PipeWallet.getSecret(Object.keys(PipeWallet.decryptedWallet)[0]))

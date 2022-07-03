import WalletConnect from "@walletconnect/client";
import { SignerTransaction } from "./util/model/peraWalletModels";
import { AppMeta } from "./util/peraWalletTypes";
interface PeraWalletConnectOptions {
    bridge?: string;
    deep_link?: string;
    app_meta?: AppMeta;
}
declare class PeraWalletConnect {
    bridge: string;
    connector: WalletConnect | null;
    constructor(options?: PeraWalletConnectOptions);
    connect(): Promise<string[]>;
    reconnectSession(): Promise<string[]>;
    disconnect(): Promise<void> | undefined;
    signTransaction(txGroups: SignerTransaction[][], signerAddress?: string): Promise<Uint8Array[]>;
}
export default PeraWalletConnect;

interface PeraWalletConnectErrorData {
    type: "SIGN_TRANSACTIONS" | "SESSION_DISCONNECT" | "SESSION_UPDATE" | "SESSION_CONNECT" | "SESSION_RECONNECT";
    detail?: any;
}
declare class PeraWalletConnectError extends Error {
    data: PeraWalletConnectErrorData;
    constructor(data: PeraWalletConnectErrorData, message: string, ...args: any[]);
}
export default PeraWalletConnectError;

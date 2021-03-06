declare class Teller<Message> {
    private channel;
    private listener?;
    /**
     * Cross-origin solution to communicate between tabs, windows, and iframes.
       Usage:
          - Create a new Teller instance.
            - If you want to use a custom message type, you can pass it to Teller<MyMessageType>.
            - const tellerManager = new Teller<MyMessageType>();
          - Call tellerManager.sendMessage({message, targetWindow, origin}) to send a message to the other tab/window/iframe.
          - Call tellerManager.setupListener({onReceiveMessage}) to listen for messages from the other tab/window/iframe.
          - Call tellerManager.close(); to close the active listener.
  
        Details on: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    */
    constructor(options: TellerOptions);
    setupListener({ onReceiveMessage }: {
        onReceiveMessage: (event: MessageEvent<TellerMessage<Message>>) => void;
    }): void;
    sendMessage({ message, targetWindow, origin }: TellerMessageOptions<Message>): void;
    close(): void;
}
export default Teller;

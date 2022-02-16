# Pipeline Algorand Connector
A work-in-progress JavaScript class to streamline the process of using MyAlgo Connect, WalletConnect and AlgoSigner to sign and send transactions to the Algorand network. 
## Usage

### Running the included example
```bash
cd example
npm install
npm run start
```

### Use as <script>

```html

<button onclick="connect()">TEST</button>

<script src="https://unpkg.com/@pipeline-ui-2/pipeline@1.3.4/dist/index.js"></script>

<script>
    const Pipeline = window.pipeline
    const wallet = Pipeline.init()
    function connect(){
        Pipeline.connect(wallet).then(data => {
            console.log(data)
        })
    }
</script>
```

### Install via npm:
```bash
npm install @pipeline-ui-2/pipeline
```
Import the class into your project:
```javascript
import Pipeline from "@pipeline-ui-2/pipeline";
```
Initialize Pipeline:
```javascript
const myAlgoWallet = Pipeline.init();
```
Connect to MyAlgo (returns first address in wallet):
```javascript
Pipeline.connect(myAlgoWallet)
    .then(data => {
        console.log(data);
    });
```
Connect to AlgoSigner (returns first address in wallet):
```javascript
Pipeline.pipeConnector = "AlgoSigner";
Pipeline.connect()
    .then(data => {
        console.log(data);
    });
```
Send a transaction (returns transaction id):
```javascript
send(address, amt, myNote, sendingAddress, wallet, index = 0)
    .then(data => {
        console.log(data);
    });
```
#### Pipeline.send Arguments 
1. address (string)
2. amt (amount in microalgos, integer)
3. myNote (note, string)
4. sendingAddress (string)
5. wallet (instance of Pipeline.init)
6. index (0 = Algorand, otherwise asset index number, integer)

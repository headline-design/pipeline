# Pipeline Algorand Connector
A work-in-progress JavaScript class to streamline the process of using MyAlgo Connect to sign and send transactions to the Algorand network. 
## Usage
### Install from npm:
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
Send a transaction (returns transaction id):
```javascript
Pipeline.send(address, amount, note, sendingAddress, myAlgoWallet)
    .then(data => {
        console.log(data);
    });
```
#### Pipeline.send Arguments 
1. address (string)
2. amount (in microalgos, integer)
3. note (string)
4. sendingAddress (string)
5. myAlgoWallet (instance of Pipeline.init)

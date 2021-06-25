# Pipeline Algorand Connector
A JavaScript class to streamline the process of using MyAlgo Connect to sign and send transactions to the Algorand network. 
## Usage
Run npm install @pipeline-ui-2/pipeline

Import the class into your project:

import Pipeline from "@pipeline-ui-2/pipeline";

Initialize Pipeline:

const myAlgoWallet = Pipeline.init();

Connect to MyAlgo (returns first address in wallet):

Pipeline.connect(myAlgoWallet)
    .then(data => {
        console.log(data);
    });

Send a transaction (returns transaction id):

Pipeline.send(address, amount, note, sendingAddress, myAlgowallet)
    .then(data => {
        console.log(data);
    });

import react, { Component } from "react";
import Pipeline from '@pipeline-ui-2/pipeline';

//change recipient address before sending transaction

const recipient = "LMKFQIPL3VQCZGGFK4WZ7FPCQWLNBTJQ3UWSTA7D7QZSPJTZQKTDVT7WG4";

const myAlgoWallet = Pipeline.init();

//amount in micro Algos
const amount = 1;

const note = "";

//0 = Algorand, otherwise index number of asset
const index = 0;

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      txID: "",
      myAddress: "",
      balance: 0
    }
  }

  fetchBalance(context, returnTo) {
    Pipeline.balance(this.state.myAddress).then(
      data => {
        const object = {};
        object[returnTo] = data;
        context.setState(object);
      }
    );
  }
  
  handleConnect(context, returnTo) {
    Pipeline.connect(myAlgoWallet).then(
      data => {
        const object = {};
        object[returnTo] = data;
        context.setState(object);
      }
    );
  }
  
  handleSend(context, returnTo) {
    Pipeline.send(recipient, amount, note, address, myAlgowallet, index).then(
      data => {
        const object = {};
        object[returnTo] = data;
        context.setState(object);
      }
    );
  }

  render() {
    return (
    <div>
      <h1>Edit the code to make things happen!</h1>
      <button onClick={handleConnect(this, "myAddress")}>Click to check balance</button><br></br>
      <button onClick={fetchBalance(this, "balance")}>Click to check balance</button><br></br>
      <button onClick={handleSend(this, "txID")}>Click to check balance</button><br></br>
      <p>{"Connected Address: " + this.state.address}</p><br></br>
      <p>{"Balance: " + this.state.balance + "Micro Algos"}</p><br></br>
      <p>{"Transaction ID: " + this.state.txID}</p><br></br>
      </div>
      );
  }
}

export default App;

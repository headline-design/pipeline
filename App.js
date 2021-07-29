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

  fetchBalance = () => {
    Pipeline.balance(this.state.myAddress).then(
      data => {
      this.setState({balance: data});
      }
    );
  }
  
  handleConnect = () => {
    Pipeline.connect(myAlgoWallet).then(
      data => {
        this.setState({myAddress: data});
      }
    );
  }
  
  handleSend = () => {
    Pipeline.send(recipient, amount, note, this.state.myAddress, myAlgoWallet, index).then(
      data => {
        this.setState({txID: data});
      }
    );
  }

  render() {
    return (
    <div>
      <h1>Edit the code to make things happen!</h1>
      <button onClick={this.handleConnect}>Click to Connect</button><br></br>
      <button onClick={this.handleSend}>Click to Send Transaction</button><br></br>
      <button onClick={this.fetchBalance}>Click to check balance</button><br></br>
      <p>{"Connected Address: " + this.state.myAddress}</p><br></br>
      <p>{"Balance: " + this.state.balance + " Micro Algos"}</p><br></br>
      <p>{"Transaction ID: " + this.state.txID}</p><br></br>
      </div>
      );
  }
}

export default App;

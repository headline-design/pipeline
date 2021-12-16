import React, { Component } from "react";
import Pipeline from 'Pipeline'; //change to import Pipeline from 'Pipeline for realtime editing Pipeline index.js, and dependency to: "Pipeline": "file:..",

//change recipient address before sending transaction
const recipient = "LMKFQIPL3VQCZGGFK4WZ7FPCQWLNBTJQ3UWSTA7D7QZSPJTZQKTDVT7WG4";

const myAlgoWallet = Pipeline.init();

//amount in micro Algos
const amount = 0;

const note = "test note";

//0 = Algorand, otherwise index number of asset
const index = 0;

//set to false to switch to TestNet
Pipeline.main = true;

var mynet = (Pipeline.main) ? "MainNet" : "TestNet";

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      net: mynet,
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

  switchConnector = (event) => {
    Pipeline.pipeConnector = event.target.value
    console.log(Pipeline.pipeConnector)
  }

  render() {
    return (
    <div>
      <h1>Edit the code to make things happen!</h1>
      <h2>{this.state.net}</h2>
      <select onChange={this.switchConnector}><option>myAlgoWallet</option><option>WalletConnect</option><option>AlgoSigner</option></select><br></br>
      
      <button onClick={this.handleConnect}>Click to Connect</button><br></br>
      <button onClick={this.handleSend}>Click to Send Transaction</button><br></br>
      <button onClick={this.fetchBalance}>Click to check balance</button><br></br>
      <p>{"Connected Address: " + this.state.myAddress}</p><br></br>
      <p>{"Balance: " + this.state.balance}</p><br></br>
      <p>{"Transaction ID: " + this.state.txID}</p><br></br>
      </div>
      );
  }
}

export default App;

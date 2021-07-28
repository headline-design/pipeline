import react, { Component } from "react";
import Pipeline from '@pipeline-ui-2/pipeline';

const address ="LMKFQIPL3VQCZGGFK4WZ7FPCQWLNBTJQ3UWSTA7D7QZSPJTZQKTDVT7WG4"
function myBalance(){Pipeline.balance(address).then(data => alert(data));}

/* 
 * uncomment the lines below one at a time to see how things work!
 * to send a real transaction, simply replace all arguments in Pipeline.send (except for myAlgoWallet) with the values you would like to use.
 * IMPORTANT: you transaction will be executed immediately when the app loads.
 * Therefore, it is recommended to wrap Pipeline.send in a function that is called when a button is click
*/

// const myAlgoWallet = Pipeline.init();
// Pipeline.connect(myAlgoWallet).then(data => {console.log(data);});
// Pipeline.send(address, amount, note, sendingAddress, myAlgowallet, index).then(data => {console.log(data);});

class App extends Component {

  render() {
    return (
    <div align="center">
      <h1>uncomment and edit the code to make things happen!</h1>
      <button onClick={myBalance}>Click to check balance</button>
      </div>
      );
  }
}

export default App;

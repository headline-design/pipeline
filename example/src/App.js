import react, { Component } from "react";
import Pipeline from '@pipeline-ui-2/pipeline';

var balance = 0;
const address ="LMKFQIPL3VQCZGGFK4WZ7FPCQWLNBTJQ3UWSTA7D7QZSPJTZQKTDVT7WG4"
function myBalance(){Pipeline.balance(address).then(data => alert(data));}

/*
const myAlgoWallet = Pipeline.init();
Pipeline.connect(myAlgoWallet).then(data => {console.log(data);});
Pipeline.send(address, amount, note, sendingAddress, myAlgowallet, index).then(data => {console.log(data);});
*/
class App extends Component {

  render() {
    return (
    <div>
      <h1>uncomment and edit the code to make things happen!</h1>
      <button onClick={myBalance}>Click to check balance</button>
      </div>
      );
  }
}

export default App;

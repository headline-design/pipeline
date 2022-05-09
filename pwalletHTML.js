const html = `

<div id="pipeWalletModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
  <div class="Modal">
  <div class="modal__content">
     <div class="Tab">
        <div class="tabBtn__wrapper">
           <div class="tabBtn tabBtn__active">Send</div>
           <div id="pwExportBtn" class="tabBtn">Tools</div>
        </div>
        <div class="tabContent tabContent__active">
           <div>
              <div class="TabContent">
              <span class="close">&times;</span>



    <div id="pwExport">
        <button id="pwExportBtn2">Export</button>
        <label>Import:</label><input type="file" name="inputfile" id="pwInputfile">
        <button id="pwHistoryBtn" >History</button>
        <input id="pwWord" type="text" value="testingarandompassword"></input>
    <button id="pwLoad">Load Accounts</button>
    <button id="pipeWcreate">Create a new account</button>
    <h3 id="selectedpwAccount"></h3>
    
    <p id="pwPreview"></p>
    <p>Select Your Account</p> 
    <select class="Dropdown" id="pwSelect"><option value="accounts">Select Account</option></select>

        <div id="pwHistory"></div>
    </div>
    
    <br></br>
  </div>
                 <form>
                    <div class="InputAmountContainer">
                       <div class="inputAmountContainer_amount"><span class="inputAmountContainer_currency">$</span>
                       <input  id="pwInput" class="InputAmountDynamicWidth" type="number" name="amount" min="1" max="999999" placeholder="0" value="0" style="width: 50px;"></div>
                       <div class="inputAmountContainer_amountError">
                          <p class="Text text-red"></p>
                       </div>
                    </div>
                    <table class="table-is-input-table table-has-border-bottom">
                       <tbody>
                          <tr class="selectCoin">
                             <td>
                                <p class="Text text-grey">Pay with</p>
                             </td>
                             <td>
                                <div class="tableRowSelectAsset__cellVerticalAligned">
                                   <img class="tableRowSelectAsset__iconAsset" src="https://cdn.coinranking.com/lzbmCkUGB/algo.svg" alt="Algorand icon">
                                   <p class="Text">Algo</p>
                                </div>
                             </td>
                             <td>
                                <div>
                                   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                                      <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                   </svg>
                                </div>
                             </td>
                          </tr>
                          <tr class="TableRowInputText">
                             <td>
                                <p class="Text text-grey">To</p>
                             </td>
                             <td>
                                <div class="tableRowInputText__cellVerticalAligned">
                                   <div class="tableRowInputText__icon" style="font-size: 16px;">
                                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path>
                                      </svg>
                                   </div>
                                   <div class="Input"><input type="text" placeholder="Mobile, email or address" class="input__field" name="address" required="" minlength="0" value=""></div>
                                </div>
                             </td>
                             <td></td>
                          </tr>
                          <tr class="TableRowInputText">
                             <td>
                                <p class="Text text-grey">Note</p>
                             </td>
                             <td>
                                <div class="tableRowInputText__cellVerticalAligned">
                                   <div class="tableRowInputText__icon" style="font-size: 21px;">
                                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                         <path fill="none" d="M0 0h24v24H0z"></path>
                                         <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                                      </svg>
                                   </div>
                                   <div class="Input"><input type="text" placeholder="Optional message" class="input__field" name="note" minlength="0" value=""></div>
                                </div>
                             </td>
                             <td></td>
                          </tr>
                       </tbody>
                    </table>
                    <button class="Button btn-xl" id="pwSign">Sign Transaction</button>
                 </form>
                 <div class="TabFooter">
                    <p class="Text text-grey">Algo balance</p>
                    <p class="Text text-grey">0.000000 Algo = $0.00</p>
                 </div>
              </div>
           </div>
        </div>
        <div class="tabContent">
           <div>
              <div class="TabContent">
                 <div class="TableReceive">
                    <table class="table-is-input-table table-has-border-bottom">
                       <tbody>
                          <tr class="TableRowQR">
                             <td colspan="3">
                                <div class="tableRowQR__iconWrapper">
                                   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                      <path fill="none" d="M0 0h24v24H0z"></path>
                                      <path d="M15 21h-2v-2h2v2zm-2-7h-2v5h2v-5zm8-2h-2v4h2v-4zm-2-2h-2v2h2v-2zM7 12H5v2h2v-2zm-2-2H3v2h2v-2zm7-5h2V3h-2v2zm-7.5-.5v3h3v-3h-3zM9 9H3V3h6v6zm-4.5 7.5v3h3v-3h-3zM9 21H3v-6h6v6zm7.5-16.5v3h3v-3h-3zM21 9h-6V3h6v6zm-2 10v-3h-4v2h2v3h4v-2h-2zm-2-7h-4v2h4v-2zm-4-2H7v2h2v2h2v-2h2v-2zm1-1V7h-2V5h-2v4h4zM6.75 5.25h-1.5v1.5h1.5v-1.5zm0 12h-1.5v1.5h1.5v-1.5zm12-12h-1.5v1.5h1.5v-1.5z"></path>
                                   </svg>
                                </div>
                             </td>
                          </tr>
                          <tr class="selectCoin">
                             <td>
                                <p class="Text text-grey">Asset</p>
                             </td>
                             <td>
                                <div class="tableRowSelectAsset__cellVerticalAligned">
                                   <img class="tableRowSelectAsset__iconAsset" src="https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg" alt="Bitcoin icon">
                                   <p class="Text">Bitcoin</p>
                                </div>
                             </td>
                             <td>
                                <div>
                                   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                                      <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                   </svg>
                                </div>
                             </td>
                          </tr>
                          <tr>
                             <td>
                                <p class="Text text-grey">Address</p>
                             </td>
                             <td>
                                <div class="tableRowInputText__cellVerticalAligned">
                                   <div class="tableRowInputText__icon" style="font-size: 16px;">
                                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-352 96c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H86.4C74 384 64 375.4 64 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2zM512 312c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
                                      </svg>
                                   </div>
                                   <p class="Text">123bu1b2423i45b4ib</p>
                                </div>
                             </td>
                             <td>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                   <path fill="none" d="M0 0h24v24H0V0z"></path>
                                   <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                                </svg>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
                 <div class="TabFooter tab-footer-margin-top-none">
                    <p class="Text text-grey">BTC balance</p>
                    <p class="Text text-grey">0.000000 BTC = €0.00</p>
                 </div>
              </div>
           </div>
        </div>
     </div>
  </div>
</div>           




</div>`

export default html
const pipeWalletStyle = 

`.Modal {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #202c3acc;
}

.modal__content {
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 11;
	width: 500px;
	background: #fff;
	border-radius: 8px;
}

@media (max-width: 800px) {
	.Modal {
		right: 0;
		margin: 0px;
	}

	.modal__content {
		height: 100vh;
		width: 100vw;
		border-radius: 0;
		align-items: flex-start;
	}
}

.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .Section {
	width: 100%;
	min-width: 320px;
	height: fit-content;
	border: 1px solid #dedfd2;
	border-radius: 8px;
	background-color: white;
	margin-bottom: 24px;
}

.section-width-s {
	max-width: 650px;
}
.Tab {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

.tabBtn__wrapper {
	display: flex;
}

.tabBtn {
	position: relative;
	padding: 24px 16px;
	text-align: center;
	font-weight: 600;
	width: 100%;
	cursor: pointer;
	border: none;
	border-bottom: 1px solid #dedfd2;
}
.tabBtn:not(:last-child) {
	border-right: 1px solid #dedfd2;
}

.tabBtn__active {
	border-bottom: 1px solid transparent;
	background-color: white;
	border-radius: 8px 8px 0 0;
	color: #2151f5;
}

.tabBtn__active::before {
	content: '';
	display: block;
	position: absolute;
	top: -1px;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	border-radius: 8px 8px 0 0;
	height: 3px;
	background: #2151f5;
}

.tabContent {
	padding: 20px;
	display: none;
	height: 100%;
}

.tabContent__active {
	display: block;
}
.TabContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: space-between;
  }
  .InputAmountContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 48px 0 8px 0;
    width: 100%;
  }
  
  .inputAmountContainer_amount {
    display: flex;
    justify-content: center;
  }
  
  .inputAmountContainer_currency {
    font-size: 40px;
    font-weight: 600;
    color: #5b616e;
  }
  
  .inputAmountContainer_amountError {
    display: flex;
    justify-content: center;
    margin-top: 16px;
    min-height: 24px;
  }
  
  @media (max-width: 800px) {
    .InputAmountContainer {
      margin: 8% 0;
    }
  }
  
  @media (max-width: 600px) {
    .InputAmountContainer {
      margin: 16% 0;
    }
  }
  .InputAmountDynamicWidth {
	height: 80px;
	font-size: 88px;
	font-weight: 500;
	border: none;
	color: #2151f5;
	caret-color: #5b616e;
}

.InputAmountDynamicWidth::placeholder {
	font-size: 88px;
	font-weight: 500;
}

.InputAmountDynamicWidth:focus {
	outline: none;
}


.InputAmountDynamicWidth::-webkit-outer-spin-button,
.InputAmountDynamicWidth::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}


.InputAmountDynamicWidth[type='number'] {
	-moz-appearance: textfield;
}
.Table,
table {
	width: 100%;
	overflow-x: scroll;
}

table {
	border-spacing: 0;
	width: 100%;
}

th,
td {
	padding: 8px;
	text-align: left;
	padding: 14px 16px;
}

tr {
	cursor: pointer;
}

tbody tr:hover > td {
	background: #f8f8f8;
}

tbody .tr-no-hover-bg tr:hover > td {
	background: none;
}

tbody tr:first-child > td:first-child {
	border-top-left-radius: 8px;
}
tbody tr:first-child > td:last-child {
	border-top-right-radius: 8px;
}
tbody tr:last-child > td:first-child {
	border-bottom-left-radius: 8px;
}
tbody tr:last-child > td:last-child {
	border-bottom-right-radius: 8px;
}

th:last-child,
td:last-child {
	text-align: right;
	padding-right: 32px;
}

th:first-child,
td:first-child {
	padding-left: 32px;
	text-align: left;
}

tr:last-child > td {
	border-bottom: none;
}

th {
	color: #5b616e;
	font-weight: 400;
	font-size: 14px;
}

.table-is-input-table {
	border: 1px solid #dedfd2;
	border-radius: 8px;
	margin-bottom: 24px;
}

.table-is-input-table > tbody > tr {
	height: 65px;
	cursor: pointer;
}

.table-has-border-bottom th,
td {
	border-bottom: 1px solid #d8d8d8;
}

.table-has-small-padding th:last-child,
.table-has-small-padding td:last-child {
	padding-right: 16px;
}

.table-has-small-padding th:first-child,
.table-has-small-padding td:first-child {
	padding-left: 16px;
}
.tableRowSelectAsset__cellVerticalAligned {
    display: flex;
    align-items: center;
  }
  
  .tableRowSelectAsset__iconAsset {
    margin: 3px 16px 0 0;
    width: 24px;
    color: #2151f5;
  }
  .tableRowSelectAsset__cellVerticalAligned {
    display: flex;
    align-items: center;
  }
  
  .tableRowSelectAsset__iconAsset {
    margin: 3px 16px 0 0;
    width: 24px;
    color: #2151f5;
  }

  .Button {
	padding: 5px;
	border: 1px solid #2151f5;
	padding: 11px 16px;
	border-radius: 4px;
	font-size: 15px;
	font-weight: 600;
	background-color: #2151f5;
	color: white;
	cursor: pointer;
}

.Button:hover {
	background-color: #1d48d6;
}

.btn-secondary {
	background-color: white;
	color: black;
	border: 1px solid #d8d8d8;
}

.btn-secondary:hover {
	background-color: rgb(241, 241, 241);
}

.btn-danger {
	background-color: #cf202f;
	color: white;
	border: 1px solid #cf202f;
}

.btn-danger:hover {
	background-color: rgb(233, 66, 66);
}

.btn-xl {
	padding: 22px;
	width: 100%;
}

.btn-xxl {
	padding: 32px;
	width: 100%;
}

.btn-stretch {
	width: 100%;
}

.btn-disabled {
	cursor: not-allowed;
}

.btn-light {
	border: none;
	background-color: white;
}

.btn-light.btn-primary {
	color: #2151f5;
}

.btn-light.btn-primary:hover {
	color: #1d48d6;
	background-color: white;
}

.Dropdown {
	height: 48px;
	padding-left: 8px;
	color: #474747;
	border: 1px solid #d8d8d8;
	border-radius: 8px;
	font-weight: 700;
	cursor: pointer;
}

.Dropdown:focus {
	outline: none;
}


.btn-light.btn-secondary {
	color: black;
}

.btn-light.btn-secondary:hover {
	color: black;
	background-color: white;
}

.btn-light.btn-danger {
	color: #cf202f;
}

.btn-light.btn-danger:hover {
	color: #cf202f;
	background-color: white;
}
.TabFooter {
	display: flex;
	justify-content: space-between;
	margin-top: 24px;
}

.tab-footer-margin-top-none {
	margin-top: 0;
}
.Text {
	margin: 0;
}

.text-h1 {
	font-size: 22px;
	font-weight: 600;
}

.text-h2 {
	font-size: 22px;
	font-weight: 500;
}

.text-h3 {
	font-size: 18px;
	font-weight: 600;
}

.text-xxl {
	font-size: 32px;
}

.text-xl {
	font-size: 22px;
}

.text-l {
	font-size: 18px;
}

.text-m {
	font-size: 16px;
}

.text-s {
	font-size: 14px;
}

.text-xs {
	font-size: 12px;
}

.text-700 {
	font-weight: 700;
}

.text-600 {
	font-weight: 600;
}

.text-500 {
	font-weight: 500;
}

.text-400 {
	font-weight: 400;
}

.text-white {
	color: white;
}

.text-grey {
	color: #5b616e;
}

.text-blue {
	color: #2151f5;
}

.text-red {
	color: #cf202f;
}

.text-green {
	color: #098551;
}

.text-uppercase {
	text-transform: uppercase;
}

.input__field {
	border: none;
	height: 40px;
	font-size: 16px;
}

.input__field:focus {
	outline: none;
}
.Section {
	width: 100%;
	min-width: 320px;
	height: fit-content;
	border: 1px solid #dedfd2;
	border-radius: 8px;
	background-color: white;
	margin-bottom: 24px;
}

.Table,
table {
	width: 100%;
	overflow-x: scroll;
}

table {
	border-spacing: 0;
	width: 100%;
}

th,
td {
	padding: 8px;
	text-align: left;
	padding: 14px 16px;
}

tr {
	cursor: pointer;
}

tbody tr:hover > td {
	background: #f8f8f8;
}

tbody .tr-no-hover-bg tr:hover > td {
	background: none;
}

tbody tr:first-child > td:first-child {
	border-top-left-radius: 8px;
}
tbody tr:first-child > td:last-child {
	border-top-right-radius: 8px;
}
tbody tr:last-child > td:first-child {
	border-bottom-left-radius: 8px;
}
tbody tr:last-child > td:last-child {
	border-bottom-right-radius: 8px;
}

th:last-child,
td:last-child {
	text-align: right;
	padding-right: 32px;
}

th:first-child,
td:first-child {
	padding-left: 32px;
	text-align: left;
}

tr:last-child > td {
	border-bottom: none;
}

th {
	color: #5b616e;
	font-weight: 400;
	font-size: 14px;
}

.table-is-input-table {
	border: 1px solid #dedfd2;
	border-radius: 8px;
	margin-bottom: 24px;
}

.table-is-input-table > tbody > tr {
	height: 65px;
	cursor: pointer;
}

.table-has-border-bottom th,
td {
	border-bottom: 1px solid #d8d8d8;
}

.table-has-small-padding th:last-child,
.table-has-small-padding td:last-child {
	padding-right: 16px;
}

.table-has-small-padding th:first-child,
.table-has-small-padding td:first-child {
	padding-left: 16px;
}

.TableRowInputText:hover td {
	background-color: white;
}

.tableRowInputText__cellVerticalAligned {
	display: flex;
	align-items: center;
}

.tableRowInputText__icon {
	margin: 3px 16px 0 0;
	color: #5b616e;
}



.section-width-s {
	max-width: 650px;
}

/* Global styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  overscroll-behavior: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  color: inherit;
}
`

export default pipeWalletStyle
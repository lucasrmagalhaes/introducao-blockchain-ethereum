// Source code to interact with smart contract
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// ContractAddress and abi are setted after contract deploy
var contractAddress = '0x8376774af4F6d7a55dD9DA92F7C43AC84FBfE151';

var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

// Contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
	if (err != null) {
    	alert("Falha ao obter conta");
    	return;
  	}
  
	if (accounts.length == 0) {
    	alert("Não foi possível acessar contas");
    	return;
  	}

  	account = accounts[0];
  	console.log('Conta: ' + account);
  	web3.eth.defaultAccount = account;
});

// Smart contract functions
function setUser() {
	name = $("#userName").val();
  	age = $("#userAge").val();
  	
	contract.methods.setUser (name, age).send( {from: account}).then( function(tx) { 
    	console.log("Usuário registrado na transação: ", tx); 
  	});

  	$("#userName").val('');
  	$("#userAge").val('');
}

function getUser() {
	contract.methods.getUser().call().then( function( result ) {
    	console.log(result[0], result[1]);
    	document.getElementById('user').innerHTML = ("Nome: " + result[0] + "<br />" + "Idade:  " + result[1]);
  	});    
}
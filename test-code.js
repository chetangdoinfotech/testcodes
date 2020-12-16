var Contract = require('web3-eth-contract');

var adminPrivateKey = '609e08f39a415e13901556f3eb55a47cae9b1603561381d3221971f8fe6987f5';
var adminWallet = '0xe528fbc00c10874f01d7fc97c308721e5faf9b8e';

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'testdb'
});

connection.connect();

// test net
//Contract.setProvider('wss://:e36b9ab0afb6412683d28e0843ff15eb@rinkeby.infura.io/ws/v3/85cbf3d2da0445e4b5d0e5ca2f2eea45');
// Main net
Contract.setProvider('wss://:e36b9ab0afb6412683d28e0843ff15eb@mainnet.infura.io/ws/v3/85cbf3d2da0445e4b5d0e5ca2f2eea45');
var	jsonInterface =	[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
// Mainnet address 
var Contractaddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
// testnet 
//var Contractaddress = "0xe825853442ef72f3a4b357dfd7db6c67b26613d9";
var contract = new Contract(jsonInterface, Contractaddress);

var wallets = [];
connection.query('select address from coin_address where updated_at IS NULL' , function (error, results, fields) {
  if (error) throw error;
  if(results.length > 0){
  		console.log(results[0].address);
  		if(results[0].toString().indexOf('0x')<0){
  			addr = '0x'+results[0].address;  			
  		}else{
  			addr = results[0].address;
  		}
  		wallets.push(addr);
  }else{
  		console.log("no record found");
  }
});

connection.end();

setTimeout(()=>{	
	for(i=0;i<wallets.length;i++){		
		balanceChecker(wallets[i].toString());
	}	
}, 4000);

/*
contract.methods.balanceOf('0x4dfe135e5a40e25c38aaa147bc10650820cb8f7a').send({from: '0x7d588db40fe27f92785abc6c1d5249c6670878da'})
.on('receipt', function(res){
    console.log(res);
});
*/

//'0x4dfe135e5a40e25c38aaa147bc10650820cb8f7a'
function balanceChecker(wallet){
	console.log(" in balanceChecker Function ...");
	contract.methods.balanceOf(wallet)
	.call()
	.then(function(res){				
		console.log(res);	
		// uncomment below line ...
		//if(res > 0){
			sendEthersToWallet(wallet);			
		//}
	}).catch(function(e){
		console.log(e);
	});
}

// admin send ethers to wallet/user
function sendEthersToWallet(wallet){
	var Web3 = require('web3');
	var web3 = new Web3('wss://:e36b9ab0afb6412683d28e0843ff15eb@ropsten.infura.io/ws/v3/85cbf3d2da0445e4b5d0e5ca2f2eea45');
	console.log("In send ether function....");
	console.log("WAllet ID::::::");
	console.log(wallet.toString());
	//console.log(web3.eth);
	/*
	web3.eth.sendTransaction({
	    from: adminWallet.toString(),
	    gasPrice: "20000000000",
	    gas: "21000",
	    to: wallet.toString(),
	    value: "1000000000000000000",
	    data: ""
	}, adminPrivateKey).then(console.log);
	*/
	try{
    	web3.eth.getTransactionCount(adminWallet.toString(),"pending").then((n)=>{
    		console.log("NONCE::::");
    		console.log(n);    		
    		/////
			const Transaction = require('ethereumjs-tx').Transaction;
			const Common = require('ethereumjs-common').default;
			const toBuffer = require('ethereumjs-util');	
			web3.eth.getGasPrice().then((gasPrice) => {
				console.log("<<<<<.... GAS Price ....>>>>>");
				console.log(gasPrice);
				///
				var rawTx = {						
					  nonce: web3.utils.toHex(n),
					  gasPrice: web3.utils.toHex(gasPrice),
					  gas: web3.utils.toHex(10000000),
					  gasLimit: web3.utils.toHex(2500000),
					  to: wallet.toString(),
					  value: web3.utils.toHex(0),
					  data: '0x0'
				}
				console.log("<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>");
				console.log(rawTx);
				const tx = new Transaction('0x'+rawTx, { chain: 'ropsten', hardfork: 'petersburg' });			
				 
				var privateKey = Buffer.from(adminPrivateKey, 'hex');				
				console.log(privateKey);
				const signedTx = tx.sign(privateKey);
				console.log(signedTx);			 
				const serializedTx = signedTx.serialize();
				console.log(serializedTx);
				///	
			}).catch((e)=>{ console.log(e); });
			/*
			
			*/
    		/////
    	}).catch((e)=>{
    		console.log(e)
    	})    	
    }catch(e){
    	console.log(e)
    }

    /*
	web3.eth.accounts.signTransaction({
	    to: wallet.toString(),
	    value: '1000000000',
	    gas: 2000000
	}, adminPrivateKey).then(console.log);
	*/
}
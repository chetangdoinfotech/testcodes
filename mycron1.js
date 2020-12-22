/// this script is called by cron 1 

/*
(2) cron 1: 
=> it checks every minutes for incoming deposit transaction. This is to call a smart contract read function balanceOf for list of users wallets in database. 
=> once fund found, then it makes one call to send ether from admin wallet to that particular user wallet. 
=> changes status of this wallet in db, which can be picked up by cron 2 below. 
*/
var Web3 = require('web3');
// SET THIS 
var web3 = new Web3('wss://:e36b9ab0afb6412683d28e0843ff15eb@ropsten.infura.io/ws/v3/85cbf3d2da0445e4b5d0e5ca2f2eea45');

var Contract = require('web3-eth-contract');
var adminWallet = "0xBa87EFCD03f3434d00E1643767BD05eE93Cb61Bd";
var adminPrivateKey = '65a6b9103fc5b735e7ebf7ef5ffec5d210c9bc71a87c8f9f8a76f198114ebfc2';

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'testdb'
});

connection.connect();

setTimeout(()=>{ 
	console.log(">>>> Closing mysql conection from code.... <<<");
	connection.end(); 
	process.exit(1); 
}, 60000);	

// Main net
Contract.setProvider('wss://:e36b9ab0afb6412683d28e0843ff15eb@mainnet.infura.io/ws/v3/85cbf3d2da0445e4b5d0e5ca2f2eea45');
var	jsonInterface =	[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
// Mainnet address 
var Contractaddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";

var contract = new Contract(jsonInterface, Contractaddress);

var wallets = [];
connection.query('select address from coin_address where admin_ethsent_touser=0 limit 5' , function (error, results, fields) {
  if (error) throw error;
  if(results.length > 0){
  		console.log("=====================================================");			  					  		
		console.log(Date());	
		console.log(results);
  		console.log(results[0].address);
  		for(var i=0;i<results.length;i++){
	  		if(results[i].address.indexOf('0x') < 0){
	  			addr = '0x'+results[i].address;  			
	  		}else{
	  			addr = results[i].address;
	  		}
	  		wallets.push(addr);
	  	}
  }else{
  		console.log("no record found");
  }
});

setTimeout(()=>{	
	for(i=0;i<wallets.length;i++){
		console.log(wallets);			
		balanceChecker(wallets[i].toString());
		setTimeout(()=>{},2000);
	}	
}, 1000);

//'0x4dfe135e5a40e25c38aaa147bc10650820cb8f7a'
async function balanceChecker(wallet){
	/*
	await web3.eth.getBalance(wallet.toString()).then(mybalance =>{
		console.log("Mybalance....",mybalance);
		if(mybalance > 0){ 
			console.log(" <<<<<<< In balanceChecker Function ... >>>>>>>>>");
			sendEthersToWallet(wallet);	
		}
	});
	*/
	contract.methods.balanceOf(wallet)
	.call()
	.then(function(res){				
		console.log(" <<<<<<< In balanceChecker Function ... >>>>>>>>>");
		console.log(res);			
		// uncomment below line ...
		if(res > 0){
			sendEthersToWallet(wallet);			
		}
	}).catch(function(e){
		console.log(e);
	});
}

// admin send ethers to wallet/user
function sendEthersToWallet(wallet){
	console.log("In send ether function....");
	console.log("WAllet ID::::::");
	console.log(wallet.toString());
	//console.log(web3.eth);
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
				const rawTx = {						
					  gasPrice: web3.utils.toHex(10e9),
					  gasLimit: web3.utils.toHex(25000),
					  to: wallet,
					  from:adminWallet,					  
					  value: web3.utils.toHex(web3.utils.toWei('1', 'wei'))					  
				}				
				//console.log(rawTx);				
				const tx = new Transaction({ ...rawTx, nonce:web3.utils.toHex(n)}, {chain: 'ropsten'});				
				//console.log(tx);
				var privateKey = Buffer.from(adminPrivateKey, 'hex');				
				//console.log(privateKey);
				//console.log("##### <<<<>>>>>>> ###### <<<<<>>>>> #####");
				tx.sign(privateKey);
				console.log("serializedTx :::::");							 
				const serializedTx = tx.serialize().toString('hex');
				console.log(serializedTx);				
				// send ether to user from admin				
			    myfun(serializedTx, wallet);
				///	
			}).catch((e)=>{ console.log(":::: In catch block ::::"); console.log(e); });
    		/////
    	}).catch((e)=>{
    		console.log(e)
    	})    

    }catch(e){
    	console.log(e);
    }

	async function myfun(serializedTx, wallet){
		try{			
			const q = await web3.eth.sendSignedTransaction('0x' + serializedTx).then((d)=>{
				console.log("::::::DATA:::::",d);								
			}).catch((e)=>{
				console.log("EERRRRRRR :::::",e);
			});			
			setTimeout(()=>{ chagetableStatus(wallet); },1000);
		}catch(e){
			console.log(e);
		}
	}

	function chagetableStatus(walletid){
		console.log(">>>>> IN CHANGE TABLE STATUS >>>>>");
		try{
			var walletid1 = walletid.substr(2);
			var sql="update coin_address SET `admin_ethsent_touser`=1 where address='"+walletid.toString()+"' || address='"+walletid1.toString()+"'" ;			
			console.log("<<<<< SQL >>>>>");
			console.log(sql);
			connection.query(sql,function(error, results, fields) {
				if (error) throw error;
				if(results){
					console.log(">>>>>>>>>> Executed query <<<<<<<<<<");
			  		console.log(results);
			  		console.log("=====================================================");			  					  		
				}else{
				  	console.log("no record found");
				}
			});
		}catch(e){
			console.log(e);
		}		
	}
}
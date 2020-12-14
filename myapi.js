const lightwallet = require('eth-lightwallet');
var express = require('express');
const port = "9000";
const app = express();

class Wallet {
	costructor(){}
    generateStr(){    
		var password = ''; 
		for(var i=0;i<7;i++){
			password = password.concat(String.fromCharCode(Math.floor(Math.random() *10) + 64));				
			password = password.concat(String.fromCharCode(Math.floor(Math.random() *10) + 97));
			if(i==3){ password = password.concat('@'); }
			if(i==5){ password = password.concat('#'); }
			if(i==2){ password = password.concat(Math.floor(Math.random() *10));}							
		}
        const seedPhrase = lightwallet.keystore.generateRandomSeed();        
        return new Promise((resolve, reject) => {
            lightwallet.keystore.createVault({
                password,
                seedPhrase,
                hdPathString: "m/44'/60'/0'/0"
            }, function (error, keystore) {
                if(error) {
                    return reject(error);
                }
        
                keystore.keyFromPassword(password, function (error, pwDerivedKey) {
                    if(error) {
                        return reject(error);
                    }
        
                    keystore.generateNewAddress(pwDerivedKey);
                    const addresses = keystore.getAddresses();
                    const priKey = keystore.exportPrivateKey(addresses[0], pwDerivedKey);

                    resolve({                    	
                        priKey,
                        seedPhrase,
                        walletAddress: addresses[0],
                        password,
                    });
         
                });
            });
        })   	
    }
}

async function myfun(){
	try{
		const x = new Wallet();				
		const { walletAddress, priKey, seedPhrase, password } =  await x.generateStr().catch(console.error);		
		var z = {};
		z.walletAddress = walletAddress;
		z.priKey = priKey;
		z.seedPhrase = seedPhrase;
		return z;
	}catch(e){
		console.log(e);
	}
}

app.get('/generate', (req,res)=>{
	//res.send(req.hostname);	
	//console.log(req.hostname);
	if(req.hostname=="127.0.0.1"){
		var data = myfun();
		data.then((mydata)=>{
			//console.log(">>>>>>><<<<<<>>>>>>");
			//console.log(mydata);
	    	res.setHeader('Content-Type', 'application/json');
			res.send(mydata);
		});
	}else{
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({"Error":"Invalid Caller"}));
	}
});

app.listen(port,()=>{
	console.log(`listining to port ${port}`);
    console.log("api accessible from url >>>");
    console.log("http://127.0.0.1:9000/generate");
});
var AbiArray = require("./abiArray.js");
var Tx = require('ethereumjs-tx');
var privateKey = new Buffer('<Priate key of your account>', 'hex')

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/<Add Your Token>"));


var MyContract = web3.eth.contract(AbiArray);

//Contract Address
var contractInstance = MyContract.at("0xda611139e2D57559520c681Ce721B94618652D93");

//set wallet is a method in my contract 
var myCallData = contractInstance.setWallet.getData("0x8Ef249B118b9830E59369B2c3081AAbd729955b1");
var rawTx = {
  nonce: '1',
  chainId :4,
  gasPrice:  web3.toHex('4000000000'),
  gasLimit: web3.toHex('21000'),
  gas: web3.toHex('600000'),
  to: '0xda611139e2D57559520c681Ce721B94618652D93', 
  from:'0x7939d79d850a15a50cebcbf26ae4724b3bf321d9',
  data: myCallData
}



var tx = new Tx(rawTx);
tx.sign(privateKey);

var serializedTx = tx.serialize();

 

web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
  
  if (!err){
    console.log(hash);
    }else{
    	console.log(err);
    }
});


web3.eth.getTransactionReceipt("0xfa42ebbdb098d2a5dfdf6549ccac6ee70598d826c93730d279e875b12bd7d38c", function(err, transaction) {
    console.info(transaction);    
  })



contractInstance.contains("0x8ef249b118b9830e59369b2c3081aabd729955b1",function(err,res){
	console.log(res);
});

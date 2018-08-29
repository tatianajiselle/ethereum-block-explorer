var Web3 = require('web3');
var transactionEngine = require('./transaction.js');

module.exports = {

    // Checks to see if there is an exisiting web3 instance (in case of metamask or mist)
    // If none, creates a web3 instance with the local GANACHE testnet.
    setWeb3Provider: function() {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
        return new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            return new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
        }
    },

    // output: saves current block number to global variable
    getCurrentBlockNumber: function(web3){
        return web3.eth.getBlockNumber(function(error, result){
            if(!error){
                return JSON.stringify(result);
            } else {
                console.error(error);
            }   
        })
    },

    // input: start and end block number
    // prints block data for given range from current block till # block
    doubleNumberQuery: async function(start, end, web3) {
        var currentBlock = end;
        var totalEther = 0;
        var totalContracts = 0;
        var totalTransactionCount = 0;

        while (currentBlock >= start){

            // make a query to the blockchain
            var block = await web3.eth.getBlock(currentBlock).then(function(block){
                return block;
            });
            
            // save transaction hashes (array) of the block
            var blockTxs = block.transactions; 
            
            // for all transactions in the block
            var transactionData = await transactionEngine.calculateTransactionData(blockTxs, web3);
            
            // sum the total transaction data
            totalContracts += transactionData.count;
            totalEther += transactionData.value;
            totalTransactionCount += 1;
    
            currentBlock--; 
        }

        if (totalTransactionCount !== 0) {
            console.log("Total value in Ether transfered for all blocks in given range: " + totalEther);
            console.log("Total contract addresses in given range: " + totalContracts);
            console.log("Total percent of addresses that are contract addresses: " + ((totalContracts/(2*totalTransactionCount))*100).toFixed(2) + "%");
        }
    },
}

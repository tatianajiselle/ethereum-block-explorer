//                                //
//      Web3 QUERY FUNCTIONS      // 
//                                //
var Web3 = require('web3');
var helper = require('../common/helpers.js');

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

    // input: block number
    // output: fetch block #
    getSingleBlock: async function(number,web3) {
        return web3.eth.getBlock(number);
        // ,function(error, result){
        //     console.log("in get block: ")
        //     //console.log(result);
        //     if(!error)
        //         return JSON.stringify(result);
        //     else
        //         console.error(error);
        // })
    },

    getTransaction: async function(hash, web3){
        return web3.eth.getTransaction(hash)
        // , function(error, transaction){
        //     console.log(" in get transaction, should be returning transaction :")
        //     console.log(transaction)
        //     if(!error)
        //         return JSON.stringify(transaction);
        //     else
        //         console.error(error);
        // })
    },

    // input: start and end block number
    // output: print block data for given range from current block till # block
    doubleNumberQuery: async function(start, end, web3) {
        var temp = end;
        var totalEther = 0;
        var totalContracts = 0
        
        while (temp >= start){

            // make a query to the blockchain
            var block = await this.getSingleBlock(temp, web3).then(function(block){
                return block
            });
            
            // save transaction hashes (array) of the block
            var blockTxs = block.transactions; 

            // for transactions in the array
            for (var i = 0; i < blockTxs.length; i++) {
                var transaction = await this.getTransaction(blockTxs[i], web3).then(function(tx){
                    return tx
                   });

                // for each transaction, parse and calculate sum
                var transactionData = this.parseTx(transaction)

                totalContracts += transactionData.count;
                totalEther += transactionData.value;
            }
           temp--; 
        }

        console.log("Total value in Ether transfered for all blocks in given range: " + totalEther);
        console.log("Total amount of contract addresses for all blocks in given range: " + totalContracts);
    },

    getTxFromHash : function(block){
            return web3.eth.getTransaction(block, function(error, transaction){
                            if (!error) 
                                return transaction;
                            else
                                console.error(error);
            });
    },

    parseTx: function(transaction){
        var count = 0;
        var value = Number(transaction.value);

        if (!transaction.to || !transaction.from){
                count += count + 1;
            }

        this.printTransactionData(transaction.hash, transaction.to, transaction.from, transaction.value);
        
        return {
            value: value,
            count: count
        }
    },

    printTransactionData: function(hash, addressTo, addressFrom, value){
        console.log("\n Transaction Hash: " + hash);
        console.log(" Sending Address: " + addressFrom);
        console.log(" Receiving Address : " + addressTo);
        console.log(" Amount sent in Ether: " + value + "\n");
    },
}

var Web3 = require('web3');

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
    // output: get block
    getSingleBlock: async function(number,web3) {
        return web3.eth.getBlock(number);
    },

    // input: transaction hash
    // output: get transaction
    getTransaction: async function(hash, web3){
        return web3.eth.getTransaction(hash);
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
            var block = await this.getSingleBlock(currentBlock, web3).then(function(block){
                return block;
            });
            
            // save transaction hashes (array) of the block
            var blockTxs = block.transactions; 

            // for transactions in the block
            for (var i = 0; i < blockTxs.length; i++) {
                var transaction = await this.getTransaction(blockTxs[i], web3).then(function(tx){
                    return tx;
                });

                // for each transaction, parse and calculate sum, print tx info
                var transactionData = this.parseTx(transaction)

                totalContracts += transactionData.count;
                totalEther += transactionData.value;
                totalTransactionCount += 1;
            }
           currentBlock--; 
        }
        console.log("Total value in Ether transfered for all blocks in given range: " + totalEther);
        console.log("Total percent of addresses that are contract addresses: " + ((totalContracts/(2*totalTransactionCount))*100).toFixed(2) + "%");
    },

    // input: transaction object
    // parse and calculate sum of ether transfered and contract addresses, print tx info
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
        
        if (addressFrom === null) 
            console.log(" Sending address is a contract.");
         else 
            console.log(" Sending Address: " + addressFrom);

        if (addressTo === null) 
            console.log(" Receiving address is a contract.");
         else 
           console.log(" Receiving Address : " + addressTo); 

        console.log(" Amount sent in Ether: " + value + "\n");
    },
}

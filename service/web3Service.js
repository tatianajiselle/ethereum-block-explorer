//                                //
//      Web3 QUERY FUNCTIONS      // 
//                                //
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
    // output: fetch block #
    fetchSingleBlock: function(number,web3) {
        return web3.eth.getBlock(number,function(error, result){
            if(!error)
                return JSON.stringify(result);
            else
                console.error(error);
        })
    },

    // input: start and end block number
    // output: print block data for given range from current block till # block
    doubleNumberQuery: function(start, end, web3) {
        //var totalEtherTransfered, contractCount;
        var blockData; // an array of length 2
        var temp = end;

        while (temp >= start){
            var block = this.fetchSingleBlock(temp, web3);
            blockData = this.getTotalEtherTransfered(block, web3);
            temp--; 
        }

        // TODO: refactor these print statements to the helper file
        // TODO: Add the ability to print the address to and from list 
        console.log("\n The total Ether transfered from blocks " + start + " to " + end + ": " + blockData.value);
        console.log(" Total addresses that are contracts: " + blockData.count);
    },

    // input: block object as a pending promise ; web3 object
    // output: returns the total ether transfered
    // parse block for all transaction ether history and calculate total value transfered
    getTotalEtherTransfered: function(blockAsPromise, web3){
        var totalEtherTransfered = 0;
        var transactionData;
        var etherTransferedInTransaction = 0;
        var contractCount = 0;

        blockAsPromise.then(function(result){            
            // Blocks can have more than one transaction per block, this is to iterate for all tx in block
            for (var i = 0; i < result.transactions.length; i++) {
                transactionData = web3.eth.getTransaction(result.transactions[i], function(error, transaction){
                    if (!error) {
                        if (transaction.to === null) contractCount++;
                        console.log("\n Transaction Hash: " + transaction.hash );
                        console.log(" Sending Address: " + transaction.to);
                        console.log(" Receiving Address :" + transaction.from);
                        console.log(" Amount sent in Ether: " + transaction.value);
                        return {
                            value : transaction.value,
                            count : contractCount
                        };
                    } else {
                        console.log(error + " Web3 call to get transaction failed.");
                    }   
                });
                etherTransferedInTransaction += transactionData.count;
                contractCount+= transactionData.value; // update the value of total ether transfered after each transaction
            }
        });
        return {
            value : etherTransferedInTransaction,
            count : contractCount
        };
    }

}

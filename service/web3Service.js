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
        var totalEtherTransfered = 0;

        while (end >= start){
            // fetch block
            var block = this.fetchSingleBlock(end, web3);
            // parse block for transaction ether history
            var totalEtherTransfered = this.parseBlockGetAmtOfEtherTransfered(block, web3);
            totalEtherTransfered += totalEtherTransfered;
            end--; 
        }
        console.log("The total Ether transfered in this transaction is: " + totalEtherTransfered);
    },

    // input: block object as a pending promise ; web3 object
    // output: returns the total ether transfered
    parseBlockGetAmtOfEtherTransfered: function(blockAsPromise, web3){
        var totalEtherTransfered = 0;
        var etherTransferedInTransaction = 0;

        blockAsPromise.then(function(result){            
            // Blocks can have more than one transaction per block, this is to iterate for all tx in block
            for (var i = 0; i < result.transactions.length; i++) {
                etherTransferedInTransaction = web3.eth.getTransaction(result.transactions[i], function(error, result){
                    return result.value;
                });
                totalEtherTransfered += etherTransferedInTransaction; // update the value of total ether transfered after each transaction
            }
        });
        return totalEtherTransfered;
    }

}

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
    doubleNumberQuery: function (start, end, web3) {
        while (end >= start){
            var $block = this.fetchSingleBlock(end, web3)
            $block.then(function(result){
               console.log(result)
            });
            end--; 
        }
    }
 
};
var prompt = require('prompt');
var helper = require('../common/helpers.js')
var web3Service = require('../service/web3Service.js')

module.exports = {

    singleNumberInput: function(web3){
        console.log("\nPlease input a single number representing how far back from present block to search. Ex.) 10");
        var promise = web3Service.getCurrentBlockNumber(web3)
        
        promise.then(function(currentBlockNumber){
            console.log("You can pick any number between 1 and " + (currentBlockNumber + 1));
            
            prompt.get(['number'], function (err, result) {
                var num = Number(result.number);

                if (helper.isBlockNumberInRange(num, (currentBlockNumber+1)) === true){ // +1 to account for index offset 
                    var start = ((currentBlockNumber+1) - num);
                    web3Service.doubleNumberQuery(start, currentBlockNumber, web3);
                } else {
                    console.error(err + "Please pick a number that is within the current block number range.")
                }
            });
        })
    },

    doubleNumberInput: function(web3){
        console.log("\nPlease input two numbers (one at a time), defining the start and end block numbers to search an inclusive range. Ex.) 8 10");
        console.log("Max number you can input is equal to the current block number:");

        var promise = web3Service.getCurrentBlockNumber(web3);

        promise.then(function(currentBlockNumber){
            console.log("You can pick any number between 1 and " + (currentBlockNumber + 1)); // +1 for index offset
     
            prompt.get(['start','end'], function (error, result) {
                var start = Number(result.start)
                var end = Number(result.end)

                if ((helper.isBlockNumberInRange(start, currentBlockNumber) === true) && 
                        (helper.isBlockNumberInRange(end-1, currentBlockNumber) === true)){
                        web3Service.doubleNumberQuery(start, end-1, web3);
                } else {
                    console.error(error + " Please pick a number that is within the current block number range.")
                }
            });
        });
    }
};
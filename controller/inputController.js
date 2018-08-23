//                            //
//      INPUT FUNCTIONS       // 
//                            //
var prompt = require('prompt');
var helper = require('../common/helpers.js')
var web3Service = require('../service/web3Service.js')

module.exports = {

    singleNumberInput: function(web3){
        var currentBlockNumber;

        console.log("Please input a single number representing how far back from present block to search. Ex.) 10");
        
        var $currentBlockNumber = web3Service.getCurrentBlockNumber(web3)
        $currentBlockNumber.then(function(result){
            console.log("You can pick any number between 0 and " + result);
            currentBlockNumber = result;
            prompt.get(['number'], function (err, result) {
                // prompt returns string so type convert to number 
                // TODO: write a test that ensures the number converts properly 
                var num = Number(result.number)
                if (helper.isBlockNumberInRange(num, currentBlockNumber) === true){
                    var start = (currentBlockNumber - num);
                    web3Service.doubleNumberQuery(start, num, web3);
                } else {
                    console.error(err + "Please pick a number that is within the current block number range.")
                }
            });
        })
        // console.log("current block number" + currentBlockNumber)
        
    },


    doubleNumberInput: function(web3){

        console.log("Please input two numbers defining the start and end block numbers to search an inclusive range. Ex.) 8 10");
        console.log("Max number you can input is equal to the current block number:");

        var $currentBlockNumber = web3Service.getCurrentBlockNumber(web3);

        $currentBlockNumber.then(function(result){
            console.log(result);
            currentBlockNumber = result;
        })
        
        prompt.get(['start','end'], function (err, result) {
            // prompt returns string so type convert to number
            var start = Number(result.start)
            var end = Number(result.end)

            if (helper.isBlockNumberInRange(start, currentBlockNumber) === true && helper.isBlockNumberInRange(end, web3) === true){
                web3Service.doubleNumberQuery(start, end, currentBlockNumber);
            } else {
                console.error(error + "Please pick a number that is within the current block number range.")
            }
        });
    }

};
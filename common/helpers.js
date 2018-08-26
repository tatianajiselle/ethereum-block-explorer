//                            //
//      HELPER FUNCTIONS      // 
//                            //
var web3Service = require('../service/web3Service.js')

module.exports = {

    welcomeInstructions: function(){
        console.log("\nHello and welcome to Tatiana's Block Explorer.\n")
        console.log("Please select a number representing how you'd like to explore block data:")
        console.log("1. Input a single number representing how far back from present block to search. Ex.) 10")
        console.log("2. Input two numbers defining the start and end block numbers to search an inclusive range. Ex.) 8 10")
    },

    // validates that a user inputed block number is in the current block number history
    isBlockNumberInRange: function(number, currentBlockNumber){
        return (0 <= number && number <= currentBlockNumber); // TODO: handle error if block number undefined 
    },
    
};
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
};
#!/usr/bin/env node
var Web3 = require('web3');
var prompt = require('prompt');
var currentBlockNumber = 0; 

prompt.start();

welcomeInstructions();

// main block of logic
// if number is given , convert to ranage, else call query on range
// retrieve the block data 
//preform the calculations
// display the data
prompt.get(['number'], function (err, result) {

    // Create new instance of web3 to call api
    var web3Provider = setWeb3Provider();
    const web3 = new Web3(web3Provider);

    if (result.number === '1'){
        singleNumberInput(web3);
     } else if (result.number === 2){

     } else {
        console.error(error);
    }
});

function singleNumberInput(web3) {
    
    console.log("Please input a single number representing how far back from present block to search. Ex.) 10");
    console.log("Max number you can input is equal to the current block number:");
    getCurrentBlockNumber(web3);
    
    prompt.get(['number'], function (err, result) {
        if (result.number <= currentBlockNumber){
            var start = (currentBlockNumber - result.number);
            doubleNumberInput(start, result.number, web3);
         } else {
             console.error(error + "Please pick a number that is within the current block number range.")
         }

    });

   
}

function doubleNumberInput(start, end, web3) {
    while (start <= end){
        console.log("Fetching block number:" + start)
        fetchSingleBlock(start,web3);
        console.log();
        start++;
    }
    //return x,y;
}







//                  //
// HELPER FUNCTIONS // 
//                  //
function welcomeInstructions(){
    // greet the user and ask for input
    console.log("\nHello and welcome to Tatiana's Block Explorer.\n")
    console.log("Please select a number representing how you'd like to explore block data:")
    console.log("1. Input a single number representing how far back from present block to search. Ex.) 10")
    console.log("2. Input two numbers defining the start and end block numbers to search an inclusive range. Ex.) 8 10")
}

// fetch block #
function fetchSingleBlock(number,web3) {
    web3.eth.getBlock(number,function(error, result){
        if(!error)
            console.log(JSON.stringify(result));
        else
            console.error(error);
    })
}

function getCurrentBlockNumber(web3){
    web3.eth.getBlockNumber(function(error, result){
        if(!error){
            console.log(JSON.stringify(result));
            currentBlockNumber = JSON.stringify(result);
        } else {
            console.error(error);
        }   
    })
}

function setWeb3Provider(){
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
       return new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        return new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
}
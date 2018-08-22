#!/usr/bin/env node
var Web3 = require('web3');
var prompt = require('prompt');

// Global Variables
var CURRENT_BLOCKCHAIN_NUMBER = 0; 


main();

function main() {
    prompt.start();

    welcomeInstructions();

    prompt.get(['number'], function (err, result) {
    
        // Create new instance of web3 to call api
        var web3Provider = setWeb3Provider();
        const web3 = new Web3(web3Provider);
    
        if (result.number === '1'){
            singleNumberInput(web3);
         } else if (result.number === '2'){
            doubleNumberInput(web3);
         } else {
            console.error(error);
        }
    });
}








//                            //
//      INPUT FUNCTIONS       // 
//                            //
function singleNumberInput(web3) {

    console.log("Please input a single number representing how far back from present block to search. Ex.) 10");
    console.log("Max number you can input is equal to the current block number:");

    getCurrentBlockNumber(web3);
    
    prompt.get(['number'], function (err, result) {
        if (isBlockNumberInRange(result.number) === true){
            var start = (CURRENT_BLOCKCHAIN_NUMBER - result.number);
            doubleNumberQuery(start, result.number, web3);
         } else {
             console.error(error + "Please pick a number that is within the current block number range.")
         }
    });
}


function doubleNumberInput(web3) {

    console.log("Please input two numbers defining the start and end block numbers to search an inclusive range. Ex.) 8 10");
    console.log("Max number you can input is equal to the current block number:");

    getCurrentBlockNumber(web3);
    
    prompt.get(['start','end'], function (err, result) {
        if (isBlockNumberInRange(result.start) === true && isBlockNumberInRange(result.end) === true){
            doubleNumberQuery(result.start, result.end, web3);
         } else {
            console.error(error + "Please pick a number that is within the current block number range.")
         }
    });
}

//                                //
//      Web3 QUERY FUNCTIONS      // 
//                                //

// Checks to see if there is an exisiting web3 instance (in case of metamask or mist)
// If none, creates a web3 instance with the local GANACHE testnet.
function setWeb3Provider(){
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
       return new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        return new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
}

// output: saves current block number to global variable
function getCurrentBlockNumber(web3){
    web3.eth.getBlockNumber(function(error, result){
        if(!error){
            console.log(JSON.stringify(result));
            CURRENT_BLOCKCHAIN_NUMBER = JSON.stringify(result);
        } else {
            console.error(error);
        }   
    })
}

// input: block number
// output: fetch block #
function fetchSingleBlock(number,web3) {
    web3.eth.getBlock(number,function(error, result){
        if(!error)
            console.log(JSON.stringify(result));
        else
            console.error(error);
    })
}

// input: start and end block number
// output: print block data for given range
function doubleNumberQuery(start, end, web3) {
    while (start <= end){
        fetchSingleBlock(start,web3);
        start++;
    }
}

//                            //
//      HELPER FUNCTIONS      // 
//                            //

function welcomeInstructions(){
    console.log("\nHello and welcome to Tatiana's Block Explorer.\n")
    console.log("Please select a number representing how you'd like to explore block data:")
    console.log("1. Input a single number representing how far back from present block to search. Ex.) 10")
    console.log("2. Input two numbers defining the start and end block numbers to search an inclusive range. Ex.) 8 10")
}

// validates that a user inputed block number is in the current block number history
function isBlockNumberInRange(number){
    return (0 <= number && number <= CURRENT_BLOCKCHAIN_NUMBER);
}
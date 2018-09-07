#!/usr/bin/env node
var Web3 = require('web3');
var prompt = require('prompt');
var helper = require('./lib/helpers.js');
var web3Service = require('./lib/service.js');

main();

function main(){
    prompt.start();

    helper.welcomeInstructions();

    prompt.get(['number'], function (err, result) {
    
        // Create new instance of web3 to call api
        var web3Provider = web3Service.setWeb3Provider();
        const web3 = new Web3(web3Provider);
        
        if (result.number === '1'){
            getRangeSingleInput(web3);
         } else if (result.number === '2'){
            getRangeDoubleInput(web3);
         } else {
            console.error(error);
        }
    });
}

function getRangeSingleInput(web3) {
    console.log("\nPlease input a single number representing how far back from present block to search. Ex.) 10");
    
    web3Service.getCurrentBlockNumber(web3).then(function(currentBlockNumber){
        
        console.log("You can pick any number between 1 and " + (currentBlockNumber + 1));
        
        prompt.get(['number'], function (error, result) {
            var num = Number(result.number);

            if (helper.isBlockNumberInRange(num, (currentBlockNumber+1)) === true){ // +1 to account for index offset 
                var start = ((currentBlockNumber+1) - num);
                web3Service.doubleNumberQuery(start, currentBlockNumber, web3);
            } else {
                console.error("ERROR: " + error + ". Please pick a number that is within the current block range.")
            }
        });
    })
}

function getRangeDoubleInput(web3){
    console.log("\nPlease input two numbers (one at a time), defining the start and end block numbers to search an inclusive range. Ex.) 8 10");
    console.log("Max number you can input is equal to the current block number:");

    var promise = web3Service.getCurrentBlockNumber(web3);
    
        promise.then(function(currentBlockNumber,error){
        if(!error){
            console.log("You can pick any number between 1 and " + (currentBlockNumber + 1)); // +1 for index offset

            prompt.get(['start','end'], function (error, result) {
                var start = Number(result.start)
                var end = Number(result.end)

                if ((helper.isBlockNumberInRange(start, currentBlockNumber) === true) && 
                        (helper.isBlockNumberInRange(end-1, currentBlockNumber) === true) && (start <= end) ){
                        web3Service.doubleNumberQuery(start, end-1, web3);
                } else {
                    console.error("ERROR: " + error + ". Please pick a range that is within the current block range.")
                }
            });
         } else {
            console.error(error);
        } 
        });
        
}
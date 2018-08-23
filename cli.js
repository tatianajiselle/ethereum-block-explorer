#!/usr/bin/env node
var Web3 = require('web3');
var prompt = require('prompt');
var helper = require('./common/helpers.js')
var inputController = require('./controller/inputController.js');
var web3Service = require('./service/web3Service.js')

main();

function main() {
    prompt.start();

    helper.welcomeInstructions();

    prompt.get(['number'], function (err, result) {
    
        // Create new instance of web3 to call api
        var web3Provider = web3Service.setWeb3Provider();
        const web3 = new Web3(web3Provider);
        
        if (result.number === '1'){
            inputController.singleNumberInput(web3);
         } else if (result.number === '2'){
            inputController.doubleNumberInput(web3);
         } else {
            console.error(error);
        }
    });
}

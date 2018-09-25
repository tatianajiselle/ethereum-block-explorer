var helper = require('./helpers.js');

module.exports = {

    // calculates the transaction data for each transaction in the block
    calculateTransactionData: async function(blockTxs, web3){
        for (var i = 0; i < blockTxs.length; i++) {
            var transaction = await web3.eth.getTransaction(blockTxs[i]).then(function(tx){
                return tx;
            });

            // for each transaction, parse and calculate sum, print tx info
            var transactionData = this.parseTx(transaction)
            return transactionData;
        }
    },

    // parse and calculate sum of ether transfered and contract addresses, print tx info
    parseTx: function(transaction){
        var count = 0;
        var value = Number(transaction.value);

        if (!transaction.to || !transaction.from){
            count += count + 1;
        }

        helper.printTransactionData(transaction.hash, transaction.to, transaction.from, transaction.value);
        
        return {
            value: value,
            count: count,
            transactionCount : 1
        }
    }

};
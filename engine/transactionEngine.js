var helper = require('../common/helpers.js');

module.exports = {

    calculateTransactionData: async function(blockTxs, web3){
        // for transactions in the block
        for (var i = 0; i < blockTxs.length; i++) {
            var transaction = await web3.eth.getTransaction(blockTxs[i]).then(function(tx){
                return tx;
            });

            // for each transaction, parse and calculate sum, print tx info
            var transactionData = this.parseTx(transaction)

            // totalContracts += transactionData.count;
            // totalEther += transactionData.value;
            // totalTransactionCount += 1;
            return transactionData;
        }
    },

    // input: transaction object
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
            count: count
        }
    }

};
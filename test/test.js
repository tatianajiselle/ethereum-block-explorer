var Web3 = require('web3');
var assert = require('assert');
var helper = require('../common/helpers.js');
var web3;
var web3Provider;

before("Initialize the provider", function() {
    // Create new instance of web3 to call api
    if (typeof web3 !== 'undefined') {
        web3Provider = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3Provider =  new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
        }
    web3 = new Web3(web3Provider);
});

describe("ganache_blockNumber", function() {
    it("should return current block number of four", function(done) {
    var number = web3.eth.getBlockNumber(function(err, result) {
        if (err) return done(err);
        assert.deepEqual(4, result);
        done();
    });
    });
});

describe("eth_getBlockByNumber", function() {
    it("should return block given the block number", function(done) {
    web3.eth.getBlock(0, true, function(err, block) {
        if (err) return done(err);

        var expectedFirstBlock = {
        number: 0,
        hash: block.hash, 
        mixHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        parentHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0x0000000000000000',
        sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
        logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        transactionsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
        stateRoot: '0xa01d157fd700acdfa883a3b0cff1314179b8571b25a2ffe72f07b9c01cb540f3',
        receiptsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
        miner: '0x0000000000000000000000000000000000000000',
        difficulty: "0",
        totalDifficulty: "0",
        extraData: '0x',
        size: 1000,
        gasLimit: 6721975,
        gasUsed: 0,
        timestamp: block.timestamp,
        transactions: [],
        uncles: []
        };

        assert.deepStrictEqual(block, expectedFirstBlock);

        var now = (new Date()).getTime();
        var then = block.timestamp * 1000; // block.timestamp is in seconds.

        assert.equal(then.toString().length, now.toString().length, "Invalid timestamp length");
        assert(then < now, "Time returned was greater than the current time");
        done();
    });
    });

    it("should return null given a future block number", function(done) {
    web3.eth.getBlock(100445, true, function(err, block) {
        if (err) return done(err);

        assert.deepStrictEqual(block, null);
        done();
    });
    });

});

describe("eth_getBlockNumber queries successfully", function() {
    it("should return current block number of four", function(done) {
    var number = web3.eth.getBlockNumber(function(err, result) {
        if (err) return done(err);
        assert.deepStrictEqual(4, result);
        done();
    });
    });

describe("isBLockNumberInRange is successful", function() {
    it("should return true if block is in range", function(done) {
        var mockNumber = 3;
        var mockCurrentBlockNumber = 4
        var result = helper.isBlockNumberInRange(mockNumber, mockCurrentBlockNumber);
        
        assert.deepStrictEqual(true, result);
        done();
    });
    });
});
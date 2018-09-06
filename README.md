# Ethereum Block Explorer
Block explorer tool for given range of block inputs.


<b>Functional Requirements</b>:
1. Given a range of blocks OR a user inputed number of blocks to visit from, query the blockchain.
2. Return the following information:
  - Total ether transfered from block range given.
  - Which addresses sent/received and how much sent/receieved total?
  - Total count of how many addresses are contract addresses.
3. OPTIONAL FEATURE
  - What percentage of transactions were contract transactions?


<b>Format</b>:
Command line interface


<b>Tech Stack</b>:
NodeJs, Javascript


<b>Challenges</b>: How would you solve slow queries over large block ranges?  

In order to arrive at a solution, one must have full scope of the problem. Why is it that slow queries occur over large block ranges to begin with? 

Assuming the following reasons:
1. Newer blocks on the network contain more transactions, and are therefore larger blocks and have larger read/write time.
2. Depending on whether or not your ethereum node is fully synced, and its read/write time.
3. All blocks need to be validated by the network, so if you are syncing while querying, that could be a cause of slower queries.
4. Blocks are sequential and could need to be called or traversed to retreive the query (think of a linked list run time here!



<b>Design Goals</b>:
- User (top priority): Is everything clear and understandable for the user? Is it easy to use?
- Requirements: Are all functional requirements completed?
- Readability: Is code clear, well defined and declared, and commented when needed? Intuitive? 
- Documentation: Is there documentation that explains how to run the code, code architecture, testing?
- Tests: Are there automated tests? Do these test edge cases and functionality?


# How Do I Run Locally?
<b>Prereqs</b>:  
1. NodeJs
2. Local Ethereum Node or Ganache Testnet 

<b>Dependencies</b>:   
In root project directory:  
> npm install 
 

<b>How To Package</b>:
> npm link


<b>Run (packaged)</b>:     
> lets-explore 


<b>Run (unpackaged)</b>:  
In root project directory:     
> ./lets-explore.js 


<b>Tests</b>:
> npm test



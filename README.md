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


If space isnt an issue, I would solve slow queries over large block ranges by caching the most recent block range/transactions.
This would need to be updated based on benchmarked calls but could be implemented as an automated algorithm (a rolling window), therefore allowing most recent blocks/transactions to remain cached. Caching these blocks alleviates long range queries in two ways: 
1. It relieves the chain from consistent requests therefore alieving the system  
2. Quicker response time on the block explorer to deliver recent block/transaction data


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


<b>Run (unpackaged)</b>:  
In root project directory:     
> ./cli.js 

<b>Run (packaged)</b>:     
> lets-explore 


<b>Tests</b>:
> npm test


<b>How To Package</b>:
> npm link


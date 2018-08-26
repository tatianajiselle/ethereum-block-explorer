# ethereum-block-explorer
Block explorer tool for given range of block inputs.


Functional requirements:
1. Given a range of blocks OR a user inputted number of blocks to visit from, query the blockchain.
2. Return the following information:
  - total ether transfered from block range given
  - which addresses sent/received and how much sent/receieved total?
  - total count of how many addresses are contract addresses
3. OPTIONAL SUPPORT PICK A FEATURE
  - not yet chosen


Format:
Command line, GUI, web


Tech Stack:
NodeJs, Javascript, Typescript


Challenges: How would you solve slow queries over large block ranges?


Design goals:
- User (top priority): Is everything clear and understandable for the user? Is it easy to use?
- Requirements: Are all functional requirements completed?
- Readability: Is code clear, well defined and declared, and commented when needed? Intuative? 
- Documentation: Is there documentation that explains how to run the code, code architecture, testing?
- Tests: Are there automated tests? Do these test edge cases and functionality?


# How Do I Run Locally?
Great question! Naviagte to the source directory and run:
> ./cli.js 


# Hode Do I Run Tests?
> npm test
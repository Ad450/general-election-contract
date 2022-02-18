
// // require web3 into the project

// const Web3 = require('web3');

// // get contract JSON from build
// const contractJSON = require ('../../../smart_contracts/build/contracts/GeneralElection.json');

// // create an instance of web3 and give it a provider
// // This provide is the object that does the communication between our 
// // project and the ethereum blockchain

// const web3 = new Web3('HTTP://127.0.0.1:7545');

// // now we have our instance created
// // lets get the smart contract through the web3 instance

// // we need the abi of the contract and the address of the contract 
// // on the network

// const abi  = contractJSON.abi;
// // try to understand how the address it retrieved from the network
// //const address = 

// // now we can interact with our contract by calling our getContract
// const contract  = new web3.eth.Contract(abi);
 


// // getAllVotes

//  export const getAllVotes = async()=>{
//     try {
//       const votes =  await contract.methods.getTotalVoteCast().call();
//       return votes
//     } catch (error) {
//         console.log(error);
//     }
// }

//  // for testing purposes, we default address to first account on ganache
//  export const voteForParty = async(party)=>{
//     try {
//         // get first address(account) in ganache
//         const addresses = await web3.eth.getAccounts();

//         // call voteForParty in the contract and specify the options, address and gas price
//         await contract.methods.voteForParty(party).send({from :addresses[0] ,gas:3000000 });

//     } catch (error) {
//         console.log(error);
//     }
// }

//  // get votes of party
//  export const getPartyVotes = async(party)=>{
  
//     try {       
//        const result = await contract.methods.getPartyVotes(party).call();     
//        return result;
//     } catch (error) {
//         console.log(error);      
//     }
// }

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./electoral_commission.sol";


/// @title GeneralElectiom
/// @author Emmanuel
/// @notice an implementation of EC
/// @dev This contract will simulate a general election
/// Voters will be validated and allowed to vote for 
/// only one participating candidate.
/// Voters will see the total votes of each candidate before 
/// and after casting their votes

contract GeneralElection is EC {

  /*
  @notice initialize all variables once the contract is deployed
  @param [parties] defined in the EC interface
  @param [voter] defined in the EC interface
  @param [ballotBox] defined in the EC interface
   */
  constructor (string[] memory _parties){
    parties = _parties;
    voter = Voter({voterId: msg.sender, hasVoted: false, vote:0});
    ballotBox = BallotBox({totalVotes: 0});
  }

  /* @notice [Voted] will be emitted into the chain */
  event Voted(address from, string message);


  /*
  @notice will be replaced with the actual ballotBox object in any children
  contract
  */
  BallotBox private ballotBox;


    /* 
    @notice for validation , will be replaced with the actual voter object 
    wherever the modifier [validateVoter] will be called
    */
    Voter private voter;


    /*
    @notice gets the total votecast
    @returns [ballotBox.totalVotes], the total votes in the box
    @virtual can be overriden by a children contract
     */
     function getTotalVotes() public view override returns (uint256){
       return ballotBox.totalVotes;
     }

    /*
    @notice gets the total votes of a party
    @param [_party] the party to get its votes
    @returns [votecast[_party]] the number of votes of a party
    @virtual can be overriden by a children contract
    [validateParty] comes from the interface
     */

     function getPartyVotes(string memory _party) public view override returns(uint256){
      // validate all parties
        if(validateParty(_party)){
          return votecast[_party];
        }else{
          revert("invalid party");
        }
     
      }
     

     /*
    @notice vote for a party
    @param [_party] the party to vote for
    @virtual can be overriden by a children contract'
    @external cannot be called within this contract 
     */

     function voteForParty(string memory _party) external override  {
       require(voter.voterId == msg.sender, "invalid credentials");
       if(validateParty(_party)){

       // increase the vote of the party by 1
       votecast[_party] += 1;
      
       emit Voted({from : voter.voterId, message:"vote recorded successfuly"});
       }
     }

 
}
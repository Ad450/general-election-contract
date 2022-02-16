//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// @title EC
/// @author Emmanuel
/// @notice an interface that guides the general election
/// @dev In a real life scenario, this is the electoral commission
/// All contracts that implement this are the activities carried 
/// out by the electoral commission


abstract contract EC{
    /*
    @notice all parties involved in the election will be in this array
     */
     string[] public parties;

    /*
    @notice tracks all parties and their corresponding votes
    */
     mapping (string => uint256) public votecast;


    /*
    @notice the EC keeps tracks (validate) of all voters with this voter type
    @param [voterId] the address of the caller is always the voter
    @param [hasVoted] this is either true or false, whether the voter has voted
    @param [vote] keeps track of the number of times a voter has voted
     */
     struct Voter{
         address voterId;
         bool hasVoted;
         uint vote;
     }
    
    /*
    @notice this keeps track of the total votes in the election process
    @param [totalVotes] the number of votes in the entire election process
     */
     struct BallotBox{
         uint256 totalVotes;
     }

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
     @notice this validates all voters by checking for the address, hasVoted and vote
      */
    modifier validateVoter(){
        require ((!voter.hasVoted)&& voter.vote == 0 && voter.voterId == msg.sender, "invalid credentials");
        _;
    }

    /*
     @notice ensure that the party passed into [voteForParty] and [getPartyVotes] is in the party list
     */
    function validateParty(string memory _party) public view  returns (bool){
        for (uint256 i = 0; i < parties.length; i++) {
          // hash strings in parties and _party before comparing to escape incompartible types comparison
          if (keccak256(abi.encodePacked(parties[i])) == keccak256(abi.encodePacked(_party))) {
              return true;
            }

        }
        return false;
    }

    /*
    @notice gets the total votecast
    @returns [ballotBox.totalVotes], the total votes in the box
    @virtual can be overriden by a children contract
     */
     function getTotalVotes() public view virtual returns (uint256);

    /*
    @notice gets the total votes of a party
    @param [_party] the party to get its votes
    @returns [votecast[_party]] the number of votes of a party
    @virtual can be overriden by a children contract
     */

     function getPartyVotes(string memory _party) public view virtual returns(uint256);

     /*
    @notice vote for a party
    @param [_party] the party to vote for
    @virtual can be overriden by a children contract'
    @external cannot be called within this contract or any children contract
     */

     function voteForParty(string memory _party) external virtual;
}
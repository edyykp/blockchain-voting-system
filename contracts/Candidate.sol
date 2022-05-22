// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voter {
  uint private votes;
  string private name;

  constructor(string memory _name) {
    name = _name;
    votes = 0;
  }

  function addVote() public {
    votes++;
  }

  function getName() public view returns(string memory) {
    return name;
  }
}
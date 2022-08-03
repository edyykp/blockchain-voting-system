// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voting {
  event Voted();

  struct Driver {
    string driverId;
    string givenName;
    string familyName;
    string nationality;
    string permanentNumber;
    string constructorId;
    string constructorName;
    uint256 votes;
  }

  struct Race {
    string year;
    string raceId;
    Driver[] drivers;
    string[] emailsVoted;
  }

  mapping(string => Race) public races;

  constructor() public payable {}

  function getRace(string calldata raceId) public view returns (Race memory) {
    return races[raceId];
  }

  function stringsEquals(string memory s1, string memory s2)
    private
    pure
    returns (bool)
  {
    bytes memory b1 = bytes(s1);
    bytes memory b2 = bytes(s2);
    uint256 l1 = b1.length;

    if (l1 != b2.length) {
      return false;
    }

    for (uint256 i = 0; i < l1; i++) {
      if (b1[i] != b2[i]) return false;
    }
    return true;
  }

  function hasEmailVoted(string memory email, string[] memory emailsVoted)
    private
    pure
    returns (bool)
  {
    for (uint256 i = 0; i < emailsVoted.length; i++) {
      if (stringsEquals(emailsVoted[i], email)) {
        return true;
      }
    }

    return false;
  }

  function driverExistsIncreaseVotes(
    string memory raceId,
    string memory driverId
  ) private returns (bool) {
    for (uint256 i = 0; i < races[raceId].drivers.length; i++) {
      if (stringsEquals(races[raceId].drivers[i].driverId, driverId)) {
        races[raceId].drivers[i].votes++;
        return true;
      }
    }

    return false;
  }

  function vote(
    string calldata year,
    string calldata raceId,
    Driver calldata driver,
    string calldata email
  ) external {
    string memory key = string.concat(year, string.concat('_', raceId));

    if (!hasEmailVoted(email, races[key].emailsVoted)) {
      races[key].year = year;
      races[key].raceId = raceId;
      races[key].emailsVoted.push(email);

      if (!driverExistsIncreaseVotes(key, driver.driverId)) {
        races[key].drivers.push(
          Driver(
            driver.driverId,
            driver.givenName,
            driver.familyName,
            driver.nationality,
            driver.permanentNumber,
            driver.constructorId,
            driver.constructorName,
            1
          )
        );
      }
    }

    emit Voted();
  }
}

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voting {
  uint256 private constant SECONDS_PER_DAY = 24 * 60 * 60;
  int256 private constant OFFSET19700101 = 2440588;
  event Voted();

  struct Driver {
    bytes32 driverId;
    string givenName;
    string familyName;
    string nationality;
    string permanentNumber;
    string constructorId;
    string constructorName;
    uint256 votes;
  }

  struct Race {
    uint256 year;
    string raceId;
    Driver[] drivers;
    bytes32[] emailsVoted;
  }

  mapping(bytes32 => Race) races;
  bool reentrancyLock = false;

  constructor() public payable {}

  function getRace(
    uint256 year,
    string calldata raceId
  ) public view returns (Race memory) {
    uint256 currentYear = _daysToDate(block.timestamp / SECONDS_PER_DAY);

    require(
      year > 2015 && year <= currentYear,
      'This year is not currently supported.'
    );
    require(bytes(raceId).length > 0, 'raceId cannot be empty.');

    return races[keccak256(abi.encodePacked(year, raceId))];
  }

  function _daysToDate(uint256 _days) internal pure returns (uint256 year) {
    int256 __days = int256(_days);

    int256 L = __days + 68569 + OFFSET19700101;
    int256 N = (4 * L) / 146097;
    L = L - (146097 * N + 3) / 4;
    int256 _year = (4000 * (L + 1)) / 1461001;
    L = L - (1461 * _year) / 4 + 31;
    int256 _month = (80 * L) / 2447;
    L = _month / 11;
    _month = _month + 2 - 12 * L;
    _year = 100 * (N - 49) + _year + L;

    year = uint256(_year);

    return year;
  }

  function stringsEquals(bytes32 s1, bytes32 s2) private pure returns (bool) {
    uint256 l1 = s1.length;

    if (l1 != s2.length) {
      return false;
    }

    for (uint256 i = 0; i < l1; i++) {
      if (s1[i] != s2[i]) return false;
    }
    return true;
  }

  function hasEmailVoted(
    bytes32 email,
    bytes32[] memory emailsVoted
  ) private pure returns (bool) {
    for (uint256 i = 0; i < emailsVoted.length; i++) {
      if (stringsEquals(emailsVoted[i], email)) {
        return true;
      }
    }

    return false;
  }

  function driverExistsIncreaseVotes(
    bytes32 raceId,
    bytes32 driverId
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
    uint256 year,
    string calldata raceId,
    Driver calldata driver,
    string calldata email
  ) external {
    require(
      gasleft() >= 200000,
      'Not enough gas to execute the vote function.'
    );
    require(!reentrancyLock, 'Reentrancy detected.');
    reentrancyLock = true;
    uint256 currentYear = _daysToDate(block.timestamp / SECONDS_PER_DAY);

    require(
      year > 2015 && year <= currentYear,
      'This year is not currently supported.'
    );
    require(bytes(raceId).length > 0, 'raceId cannot be empty.');
    require(driver.driverId.length > 0, 'driverId cannot be empty.');
    bytes32 hashedKey = keccak256(abi.encodePacked(year, raceId));
    bytes32 hashedEmail = keccak256(abi.encodePacked(email, hashedKey));
    require(
      hasEmailVoted(hashedEmail, races[hashedKey].emailsVoted) == false,
      'You can only vote once for a race!'
    );
    require(
      races[hashedKey].drivers.length < 22,
      'There are maximum 22 drivers in one race.'
    );
    require(driver.votes + 1 >= driver.votes, 'Integer overflow.');

    races[hashedKey].year = year;
    races[hashedKey].raceId = raceId;
    races[hashedKey].emailsVoted.push(hashedEmail);

    if (!driverExistsIncreaseVotes(hashedKey, driver.driverId)) {
      races[hashedKey].drivers.push(
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

    reentrancyLock = false;
    emit Voted();
  }
}

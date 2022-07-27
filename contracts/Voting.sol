// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voting {
  uint256 private constant SECONDS_PER_DAY = 24 * 60 * 60;
  int256 private constant OFFSET19700101 = 2440588;

  struct Driver {
    string driverId;
    string givenName;
    string familyName;
    string nationality;
    uint256 permanentNumber;
    string constructorId;
    string constructorName;
    uint256 votes;
  }

  struct Race {
    uint256 year;
    string raceId;
    mapping(string => Driver) drivers;
    string[] emailsVoted;
  }

  mapping(uint256 => mapping(string => Race)) private races;

  constructor() {}

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
    uint256 i;

    for (i = 0; i < emailsVoted.length; i++) {
      if (stringsEquals(emailsVoted[i], email)) {
        return true;
      }
    }

    return false;
  }

  function vote(
    uint256 year,
    string memory raceId,
    string memory driverId,
    string memory email
  ) public {
    uint256 currentYear = _daysToDate(block.timestamp / SECONDS_PER_DAY);

    require(
      year > 2015 && year <= currentYear,
      'This year is not currently supported.'
    );
    require(bytes(raceId).length > 0, 'raceId cannot be empty.');
    require(bytes(driverId).length > 0, 'driverId cannot be empty.');

    if (!hasEmailVoted(email, races[year][raceId].emailsVoted)) {
      races[year][raceId].drivers[driverId].votes++;
      races[year][raceId].emailsVoted[
        races[year][raceId].emailsVoted.length - 1
      ] = email;
    }
  }
}

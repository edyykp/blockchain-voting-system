const Voting = artifacts.require("Voting");
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
const MOCK_DRIVER = {
  driverId: '0x1234567891234567891234567891234567891234567891234567891234567890',
  givenName: 'Carlos',
  familyName: 'Sainz',
  nationality: 'Spanish',
  permanentNumber: '55',
  constructorId: 'ferrari',
  constructorName: 'Ferrari',
  votes: 1
};

const MOCK_DRIVER_2 = {
  driverId: '0x1234567891234567891234567891200067891234567891234567891234567890',
  givenName: 'Charles',
  familyName: 'Leclerc',
  nationality: 'French',
  permanentNumber: '51',
  constructorId: 'ferrari',
  constructorName: 'Ferrari',
  votes: 1
};

const MOCK_DRIVER_ARRAY = [ '0x1234567891234567891234567891234567891234567891234567891234567890', 'Carlos', 'Sainz', 'Spanish', '55', 'ferrari', 'Ferrari', '1' ];

contract("Voting", function () {
  let voting;

  beforeEach(async () => {
    voting = await Voting.deployed();
  });

  it('should return a race when given valid input', async () => {
    const year = 2020;
    const raceId = 'testRaceId';
    const email = 'test@email.com';

    const expectedRace = { year: '2020', raceId: 'testRaceId', drivers: [ MOCK_DRIVER_ARRAY ], emailsVoted: [ email ] };

    await voting.vote(year, raceId, MOCK_DRIVER, email);
    const race = await voting.getRace(year, raceId);

    assert.deepEqual(race.year, expectedRace.year, 'The returned year does not match the expected year');
    assert.deepEqual(race.raceId, expectedRace.raceId, 'The returned raceId does not match the expected raceId');
    assert.deepEqual(race.drivers, expectedRace.drivers, 'The returned drivers do not match the expected drivers');
    assert.notDeepEqual(race.emailsVoted, expectedRace.emailsVoted, 'The returned email list does not match the expected email list');
  });

  it('should initialize the vote with 1 if the driver is new', async () => {
    const year = 2021;
    const raceId = 'Bucharest';
    const email = 'johndoe@gmail.com';

    await voting.vote(year, raceId, MOCK_DRIVER_2, email);
    const race = await voting.getRace(year, raceId);

    assert.deepEqual('1', race.drivers[ 0 ].votes, 'The vote was initialized with a value greater than 1');
  });


  it('should increase the vote with 1 if the driver is not new', async () => {
    const year = 2021;
    const raceId = 'Bucharest';
    const email = 'johndoe2@gmail.com';

    await voting.vote(year, raceId, MOCK_DRIVER_2, email);
    const race = await voting.getRace(year, raceId);

    assert.deepEqual('2', race.drivers[ 0 ].votes, 'The vote was increased with only 1 unit.');
  });

  it('should not return a race when given an year too early', async () => {
    const year = 2014;
    const raceId = 'testRaceId';

    try {
      await voting.getRace(year, raceId);
    } catch (error) {
      assert.isTrue(error.message.includes('This year is not currently supported'));
    }
  });

  it('should not return a race when given an year in the future', async () => {
    const year = 2024;
    const raceId = 'testRaceId';

    try {
      await voting.getRace(year, raceId);
    } catch (error) {
      assert.isTrue(error.message.includes('This year is not currently supported'));
    }
  });

  it('should not return a race when given an undefined race id', async () => {
    const year = 2020;
    const raceId = 'undefined';

    try {
      await voting.getRace(year, raceId);
    } catch (error) {
      assert.isTrue(error.message.includes('raceId cannot be empty.'));
    }
  });

  it('should not return a race when given a null race id', async () => {
    const year = 2020;
    const raceId = 'null';

    try {
      await voting.getRace(year, raceId);
    } catch (error) {
      assert.isTrue(error.message.includes('raceId cannot be empty.'));
    }
  });

  it('should not return a race when given an empty race id', async () => {
    const year = 2020;
    const raceId = '';

    try {
      await voting.getRace(year, raceId);
    } catch (error) {
      assert.isTrue(error.message.includes('raceId cannot be empty.'));
    }
  });

  it('should throw an error if not enough gas is provided', async () => {
    try {
      await voting.vote(2020, 'testRaceId', MOCK_DRIVER, 'email@email.com', { gas: 100000 });
    } catch (err) {
      assert.include(err.message, 'Not enough gas to execute the vote function.');
    }
  });

  it('should throw an error if the user has already voted', async () => {
    try {
      await voting.vote(2020, 'raceId', MOCK_DRIVER, 'email@email.com');
      await voting.vote(2020, 'raceId', MOCK_DRIVER, 'email@email.com');
    } catch (err) {
      assert.include(err.message, 'You can only vote once for a race!');
    }
  });

  it('should throw an error if the year is not currently supported', async () => {
    try {
      await voting.vote(2010, 'raceId', MOCK_DRIVER, 'email@email.com');
    } catch (err) {
      assert.include(err.message, 'This year is not currently supported.');
    }
  });

  it('should throw an error if the raceId is empty', async () => {
    try {
      await voting.vote(2020, '', MOCK_DRIVER, 'email@email.com');
    } catch (err) {
      assert.include(err.message, 'raceId cannot be empty.');
    }
  });

  it('should throw an error if the driverId is empty', async () => {
    try {
      await voting.vote(2020, 'raceId', { driverId: '', ...MOCK_DRIVER }, 'emailTest@email.com');
    } catch (err) {
      assert.include(err.message, 'driverId cannot be empty.');
    }
  });

  it('should throw an error when the vote causes an integer overflow', async () => {
    try {
      const OVERFLOW_DRIVER = {
        votes: 2 ** 256 - 1,
        ...MOCK_DRIVER
      };

      await voting.vote(2020, 'raceId', OVERFLOW_DRIVER, 'testing@email.com');
    } catch (err) {
      assert.include(err.message, 'Integer overflow');
    }
  });

  it('should throw an error if the number of drivers exceeds the maximum', async () => {
    try {
      for (let i = 0; i < 10; i++) {
        MOCK_DRIVER.driverId = `${MOCK_DRIVER.driverId.substring(0, MOCK_DRIVER.driverId.length - 1)}${i}`;
        await voting.vote(2020, 'raceId', MOCK_DRIVER, `email${i}@email.com`);
      }
      for (let i = 10; i < 24; i++) {
        MOCK_DRIVER.driverId = `${MOCK_DRIVER.driverId.substring(0, MOCK_DRIVER.driverId.length - 2)}${i}`;
        await voting.vote(2020, 'raceId', MOCK_DRIVER, `email${i}@email.com`);
      }
    } catch (err) {
      assert.include(err.message, 'There are maximum 22 drivers in one race.');
    }
  });
});

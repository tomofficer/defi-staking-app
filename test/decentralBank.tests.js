const { assert } = require('console');

const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('DecentralBank', ([owner, customer]) => {
  let tether, rwd;

  function tokens(number) {
    return web3.utils.toWei(number, 'ether');
  }

  before(async () => {
    //load contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    //transfer all tokens to DecentralBank (1 mil)
    await rwd.transfer(decentralBank.address, tokens('1000000'));

    //transfer 100 mock tether to investor
    await tether.transfer(customer, tokens('100', { from: owner }));
  });

  //all testing code goes here
  describe('Mock Tether Deployment', async () => {
    it('matches name successfully', async () => {
      const name = await tether.name();
      assert.equal(name, 'Mock Tether Token');
    });
  });

  describe('Reward Token Deployment', async () => {
    it('matches name successfully', async () => {
      const name = await rwd.name();
      assert.equal(name, 'Reward Token');
    });
  });

  describe('Decentral Bank Deployment', async () => {
    it('matches name successfully', async () => {
      const name = await decentralBank.name();
      assert.equal(name, 'Decentral Bank');
    });

    it('contract has tokens', async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens('1000000'));
    });

    describe('Yield Farming', async () => {
      it('rewards tokens for staking', async () => {
        let result;

        //check the investor balance
        result = await tether.balanceOf(customer);
        assert.equal(
          result.toString(),
          tokens('100'),
          'customer mock wallet balance before staking'
        );

        //check staking for customer of 100 tokens
        await tether.approve(decentralBank.address, tokens('100'), {
          from: customer,
        });
        await decentralBank.depositTokens(tokens('100'), { from: customer });

        //check updated balance of customer
        result = await tether.balanceOf(customer);
        assert.equal(
          result.toString(),
          tokens('0'),
          'customer mock wallet balance after staking 100 tokens'
        );

        //check updated balance of decentralBank
        result = await tether.balanceOf(decentralBank.address);
        assert.equal(
          result.toString(),
          tokens('100'),
          'decentralBank mock wallet balance after staking from customer'
        );

        //is staking balance
        result = await decentralBank.isStaking(customer);
        assert.equal(
          result.toString(),
          'true',
          'customer is staking status after staking'
        );
      });
    });
  });
});

pragma solidity ^0.5.0;
import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    }

    //staking function
    function depositTokens(uint256 _amount) public {
        //require transaction to be greater than 0
        require(_amount > 0, "amount cannot be 0");

        //transfer tether tokens to given address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        //update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //check if sender has staked
        if (!hasStaked) {
            stakers.push[msg.sender];
        }

        //update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}

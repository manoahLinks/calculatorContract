// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CalculatorContract {

    address public owner;
    uint public stateValue;

    constructor () {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    function setState(uint256 _newValue) public onlyOwner {
        stateValue = _newValue;
    }
    
    function multiplyState(uint256 _multiplier) public {
        stateValue = stateValue * _multiplier;
    }

    function divideState(uint256 _divisor) public {
        require(_divisor != 0, "Division by zero is not allowed");
        stateValue = stateValue / _divisor;
    }
}


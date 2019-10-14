/*
    Copyright 2017-2019 MARKET Protocol

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

pragma solidity 0.5.11;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.3.0/contracts/ownership/Ownable.sol";

contract MarketContractSettlementStrategyExternalStore is Ownable {
    struct State {
        string oraclePricePath; // data.priceUsd
        string oracleUrl;

        uint16 settlementDelay; // should be seconds... note 45 day max

        uint40 expirationTimestamp;
        uint40 settlementTimestamp;

        uint settlementPrice;
    }
    
    mapping(address => State) private states;
    
    // Modifiers

    // External functions
    // ...

    // External functions that are view

    function oraclePricePath(address contractAddress) external view onlyOwner returns (string memory) {
        return states[contractAddress].oracleUrl;
    }

    function oracleUrl(address contractAddress) external view onlyOwner returns (string memory) {
        return states[contractAddress].oracleUrl;
    }

    // External functions that are pure
    // ...

    // Public functions
    // ...

    // Internal functions
    // ...

    // Private functions
    // ...
}
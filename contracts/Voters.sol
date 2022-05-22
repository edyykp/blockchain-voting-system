// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voters {
    uint[] private IDs;

    constructor() {

    }

    function addID(uint _id) public {
        IDs.push(_id);
    }

    function isID(uint _id) public view returns(bool) {
        uint i;

        for(i=0; i<IDs.length; i++) {
            if(IDs[i] == _id) {
                return true;
            }
        }

        return false;
    }

    function clearMemory() public {
        delete IDs;
    }
}
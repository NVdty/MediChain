// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Roles.sol";

contract Apotek {
  using Roles for Roles.Role;

  event ApotekAdded(address indexed _account);
  event ApotekRemoved(address indexed _account);

  Roles.Role private apoteksList;

  constructor() public {
    apoteksList.addRole(msg.sender);
    emit ApotekAdded(msg.sender);
  }

  ///@dev Modifiers for Apotek.
  modifier onlyApotek() {
    require(isApotek(msg.sender));
    _;
  }
  /*-----------------------------*/

  ///@dev Apotek Utility functions.
  function isApotek(address _account) public view returns (bool) {
    return apoteksList.hasRole(_account);
  }

  function addApotek(address _account) public onlyApotek {
    apoteksList.addRole(_account);
    emit ApotekAdded(_account);
  }

  function removeApotek() public {
    apoteksList.removeRole(msg.sender);
    emit ApotekRemoved(msg.sender);
  }
  /*-----------------------------*/

}

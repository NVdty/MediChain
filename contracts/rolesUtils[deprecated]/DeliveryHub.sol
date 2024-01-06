// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Roles.sol";

contract Pengiriman {
  using Roles for Roles.Role;

  event PengirimanAdded(address indexed _account);
  event PengirimanRemoved(address indexed _account);

  Roles.Role private deliveryHubsList;

  constructor() public {
    deliveryHubsList.addRole(msg.sender);
    emit PengirimanAdded(msg.sender);
  }

  ///@dev Modifiers for Pengiriman.
  modifier onlyPengiriman() {
    require(isPengiriman(msg.sender));
    _;
  }
  /*-----------------------------*/

  ///@dev Pengiriman Utility functions.
  function isPengiriman(address _account) public view returns (bool) {
    return deliveryHubsList.hasRole(_account);
  }

  function addPengiriman(address _account) public onlyPengiriman {
    deliveryHubsList.addRole(_account);
    emit PengirimanAdded(_account);
  }

  function removePengiriman() public {
    deliveryHubsList.removeRole(msg.sender);
    emit PengirimanRemoved(msg.sender);
  }
  /*-----------------------------*/

}

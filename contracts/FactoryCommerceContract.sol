// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import '@openzeppelin/contracts/utils/Address.sol';
import '@openzeppelin/contracts/utils/Context.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/// @author Bortoli German
/// @title Factory Commerce Contract
/// @notice Sample commerce contract just for learning purposes
/// @dev Contract under development to enable shop items
/// @custom:security-contact german@borto.li
contract FactoryCommerceContract is Context, ERC721, Ownable {
  using Address for address;

  /// @notice Event fired when the item get created.
  event ShopItemCreated(
    uint256 itemId,
    string title,
    string description,
    string photoUrl,
    uint256 price
  );

  mapping(uint256 => address) public itemToOwner;
  mapping(address => uint256) ownerItemCount;

  /// @notice Constructor of NFT Token.
  // solhint-disable-next-line not-rely-on-time
  constructor() ERC721('CommerceToken', 'GCTK') {}

  /// @notice Shop item struct
  struct ShopItem {
    string title;
    string description;
    string photoUrl;
    uint256 price;
  }

  /// @notice Array of Shop items.
  ShopItem[] public items;

  /// @notice Generate an item and stores into the blockchain.
  /// @param title Title of the item
  /// @param description Brief description of the item
  /// @param photoUrl Photo url
  /// @param price Sell price unit
  function createItem(
    string memory title,
    string memory description,
    string memory photoUrl,
    uint256 price
  ) public {
    items.push(ShopItem(title, description, photoUrl, price));
    uint256 id = items.length - 1;
    itemToOwner[id] = _msgSender();
    ownerItemCount[_msgSender()]++;
    emit ShopItemCreated(id, title, description, photoUrl, price);
  }
}

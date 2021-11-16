import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'

describe('FactoryCommerce', function () {
  let accounts: Signer[]

  beforeEach(async function () {
    accounts = await ethers.getSigners()
  })

  it('Should create 2 shop items', async function () {
    const CommerceContract = await ethers.getContractFactory(
      'FactoryCommerceContract',
    )
    const myCommerce = await CommerceContract.deploy()
    await myCommerce.deployed()

    const item = {
      title: 'Object1',
      description: 'Description for object one',
      photoUrl: 'https://picsum.photos/200/300',
      price: 10,
    }

    const shopItem = await myCommerce.createItem(
      item.title,
      item.description,
      item.photoUrl,
      item.price,
    )
    const shopItem2 = await myCommerce.createItem(
      item.title,
      item.description,
      item.photoUrl,
      item.price,
    )

    shopItem.wait()
    shopItem2.wait()

    await expect(shopItem)
      .to.emit(myCommerce, 'ShopItemCreated')
      .withArgs(0, item.title, item.description, item.photoUrl, item.price)

    await expect(shopItem2)
      .to.emit(myCommerce, 'ShopItemCreated')
      .withArgs(1, item.title, item.description, item.photoUrl, item.price)
  })
})

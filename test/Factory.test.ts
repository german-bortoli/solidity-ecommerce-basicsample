import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'

import {
  FactoryCommerceContract,
  FactoryCommerceContract__factory as factory,
} from '../typechain-types'

describe('FactoryCommerce', async () => {
  let accounts: Signer[]
  let CommerceContract
  let myCommerce: FactoryCommerceContract

  beforeEach(async function () {
    accounts = await ethers.getSigners()
    CommerceContract = (await ethers.getContractFactory(
      'FactoryCommerceContract',
    )) as factory

    const tx = await CommerceContract.deploy()
    myCommerce = await tx.deployed()
  })

  it('Factory test', async () => {
    expect(await myCommerce.name()).to.equal('CommerceToken')
    expect(await myCommerce.symbol()).to.equal('GCTK')
  })

  it('Should create and verify 2 shop items', async () => {
    const item = {
      title: 'Object',
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

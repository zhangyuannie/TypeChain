import { basename } from 'path'
import { FACTORY_POSTFIX } from '../common'

export function generateHardhatHelper(contracts: string[]): string {
  return `

import { ethers } from 'ethers'
import { FactoryOptions, HardhatEthersHelpers as  HardhatEthersHelpersBase} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from "."

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
  ${contracts
    .map(
      (n) =>
        `getContractFactory(name: '${n}', signerOrOptions?: ethers.Signer | FactoryOptions): Promise<Contracts.${
          n + FACTORY_POSTFIX
        }>`,
    )
    .join('\n')}

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
  }
}
  `
}

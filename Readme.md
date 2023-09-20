# Polygon_OZG

- [Polygon_OZG](#polygon_ozg)
  - [Example Lx/Ly Bridge](#example-lxly-bridge)
  - [Setup](#setup)
    - [Frontend](#frontend)
    - [Smart Contract](#smart-contract)
  - [Resources](#resources)

## Example Lx/Ly Bridge

This application is an example of both frontend and smart contract implmentation of lx/ly bridge for ERC20 token bridging.

![screenshot](./docs/Screenshot%202023-09-21%20at%2012.20.33%20AM.png)
`Frontend`
![screenshot2](./docs/Screenshot%202023-09-21%20at%2012.23.38%20AM.png)
`Claim Function Listener`

## Setup

#### Frontend

- Add the Wallet Connect project id to `src/app/providers.tsx`
- [File To Edit](./proto/src/app/providers.tsx)

```sh
cd proto
yarn
yarn dev
```

#### Smart Contract

```sh
cd erc20bridge
npm i
npx hardhat compile
```

**Smart Contract Addresses :**

```json
{
  "ERC20BridgeMainnet": "0x60281F9DE2c0311B5E9A407A658f6Da2F6d026b3",
  "ERC20BridgezkEVM": "0x8A82c434F2701A44258173287aa0497856735386",
  "erc20MainnetToken": "0x6c55287976DAd6AD30F55fdEF2F1268FDA84e0db",
  "erc20zkEVMToken": "0xea4e3eB04d7EEb22B679D7d753AcCf5e54c6C019",
  "deployerAddress": "0x858a9477F74baa24a7F062b74A7f2D064443DF2E",
  "tokenName": "customTokenName",
  "tokenSymbol": "CTN",
  "tokenInitialBalance": "1000000000000000000000000000"
}
```

All addresses are on testnet.

- Bridging from `göerliETH` to `zkEVMTestnet` can be done from the frontend.
- But we need to run a claim listener in order to process the claims when ready.

To run the claim listener :

```sh
npm run monitor:polygonZKEVMTestnet
```

ENV example :

```sh
MNEMONIC="test test test test test test test test test test test junk"
INFURA_PROJECT_ID=""
ETHERSCAN_API_KEY=""
ETHERSCAN_ZKEVM_API_KEY=""
PVTKEY=""
```

## Resources

Problem Statement Link :

[https://pushprotocol.notion.site/Polygon-557f8054f87e4dec8fe14fd55e76becd](https://pushprotocol.notion.site/Polygon-557f8054f87e4dec8fe14fd55e76becd)

More Code Examples :

[https://github.com/0xPolygonHermez/code-examples](https://github.com/0xPolygonHermez/code-examples)

How ZkEVM Bridge Works ? :

[https://wiki.polygon.technology/docs/zkevm/protocol/zkevm-bridge/](https://wiki.polygon.technology/docs/zkevm/protocol/zkevm-bridge/)

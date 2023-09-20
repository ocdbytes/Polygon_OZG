/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { formatEther } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useBalance, useConnect, usePublicClient } from "wagmi";
import TokenBalancesComponent from "./utils/TokenBalancesComponent";
import BridgeComponent from "./utils/BridgeComponent";

export default function Bridger() {
  // =========================================================
  // States :
  const [zkbal, setZkbal] = useState("0");

  // =========================================================
  // Wagmi Functions :
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const zkProvider = usePublicClient({ chainId: 1442 });

  // =========================================================
  // Functions :
  const getZkNativeBalance = async () => {
    const balanceZK = await zkProvider.getBalance({
      address: address as `0x${string}`,
    });
    console.log("ZK Balance : ", formatEther(balanceZK));
    setZkbal(formatEther(balanceZK));
  };

  // =========================================================
  // USE_EFFECT :
  useEffect(() => {
    getZkNativeBalance();
  }, [address]);

  return (
    <div className="p-4 w-full flex flex-col justify-between">
      <div className="p-5 bg-slate-900 rounded-lg">
        <p>Native Balances : </p>
        <p>=============</p>
        <br></br>
        <p>ETH (goerli) : {data?.formatted}</p>
        <p>zkEVM (testnet) : {zkbal}</p>
      </div>
      <div className="p-5 bg-slate-900 rounded-lg mt-3">
        <p>Custom Token (CTN) Balances : </p>
        <p>=======================</p>
        <br></br>
        <TokenBalancesComponent chain_id={5} />
        <TokenBalancesComponent chain_id={1442} />
      </div>
      <BridgeComponent />
    </div>
  );
}

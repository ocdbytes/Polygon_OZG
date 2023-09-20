"use client";

import { CONFIG } from "@/app/config";
import { BigNumberish } from "ethers";
import { formatEther } from "ethers";
import { useEffect } from "react";
import { useContractRead, useAccount } from "wagmi";
import { erc20ABI } from "wagmi";

export default function TokenBalancesComponent({
  chain_id,
}: {
  chain_id: number;
}) {
  // =========================================================
  // Wagmi Functions :
  const { address } = useAccount();

  const { data, isFetching, isRefetching, isSuccess } = useContractRead({
    abi: erc20ABI,
    address:
      chain_id === 5
        ? (CONFIG.erc20MainnetToken as `0x${string}`)
        : (CONFIG.erc20zkEVMToken as `0x${string}`),
    chainId: chain_id,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    enabled: true,
  });

  // =========================================================
  // USE_EFFECT :
  useEffect(() => {
    console.log(
      `Token Balance ${chain_id} : `,
      data,
      isFetching,
      isRefetching,
      isSuccess
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <div>
      <p>
        {chain_id === 5 ? "ETH (goerli)" : "zkEVM (testnet)"} :{" "}
        {data ? formatEther(data as BigNumberish) : "N/A"}
      </p>
    </div>
  );
}

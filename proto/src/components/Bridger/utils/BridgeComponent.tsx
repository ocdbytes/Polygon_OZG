"use client";

import { CONFIG } from "@/app/config";
import { SetStateAction, useState } from "react";
import {
  erc20ABI,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ERC20BridgeNativeChain from "@/app/config/ERC20BridgeNativeChain.json";
import { parseUnits } from "ethers";

export default function BridgeComponent() {
  // =========================================================
  // States :
  const [value, setValue] = useState(0);

  // =========================================================
  // Wagmi Functions :
  const { address } = useAccount();
  const { write, data, error, isLoading, isError, isSuccess } =
    useContractWrite({
      address: CONFIG.ERC20BridgeMainnet as `0x${string}`,
      abi: ERC20BridgeNativeChain.abi,
      functionName: "bridgeToken",
    });

  const {
    write: erc20Write,
    data: erc20Data,
    isLoading: erc20isLoading,
    isSuccess: erc20isSuccess,
  } = useContractWrite({
    address: CONFIG.erc20MainnetToken as `0x${string}`,
    abi: erc20ABI,
    functionName: "approve",
  });

  return (
    <div className="p-5 flex flex-col rounded-lg mt-3 bg-slate-900">
      <p className="mb-2">
        Amount <span className="text-xs">(Tokens to bridge)</span>
      </p>
      <input
        type="number"
        className="p-2 bg-slate-800 rounded-lg"
        onChange={(e) => {
          setValue(e.target.value as unknown as SetStateAction<number>);
        }}
        value={value}
      ></input>
      <button
        className="p-2 bg-slate-700 rounded-lg cursor-pointer mt-2"
        onClick={() => {
          erc20Write?.({
            args: [
              CONFIG.ERC20BridgeMainnet as `0x${string}`,
              parseUnits(value.toString(), 18),
            ],
          });
          write?.({
            args: [address, parseUnits(value.toString(), 18), true],
          });
        }}
      >
        Bridge Tokens (göETH &gt; zkEVMTestnet)
      </button>
      {erc20isLoading && (
        <p className="mt-2 text-slate-500">
          Transaction Sent [⏳] ERC20 Allowance : Loading.....
        </p>
      )}
      {erc20isSuccess && (
        <p className="mt-2 text-slate-500">
          Transaction Success [✅] ERC20 Allowance : {erc20Data?.hash}
        </p>
      )}
      {isLoading && (
        <p className="mt-2 text-slate-500">
          Transaction Sent [⏳] : Loading.....
        </p>
      )}
      {isError && (
        <p className="mt-2 text-red-600">
          Transaction Error [🚨] : {error?.message}
        </p>
      )}
      {isSuccess && (
        <p className="mt-2 text-green-500">
          Transaction Success [✅] : {data?.hash}
        </p>
      )}
    </div>
  );
}

"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <div className="p-4 w-full flex justify-between items-center">
      <p className="text-xl font-bold">Lx/Ly</p>
      <ConnectButton />
    </div>
  );
}

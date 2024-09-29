"use client";

import React from "react";
import {
  ConnectButton,
  ConnectEmbed,
  darkTheme,
  useActiveAccount,
  useActiveWallet,
  useConnect,
  useDisconnect,
} from "thirdweb/react";
import { client } from "../client";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const Page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center mt-20 mb-20">
      <SingleWalletFlow />
      <SocialsFlow />
      <CustomFlow />

      <EmailFlow />
    </div>
  );
};

export default Page;

function SingleWalletFlow() {
  const account = useActiveAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const wallet = useActiveWallet();

  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">Single Wallet Flow</p>
      {account && wallet ? (
        <>
          <button
            className="bg-red-500
            text-white
            px-4
            py-2
            rounded-md"
            onClick={() => disconnect(wallet)}
          >
            Disconnect
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-orange-400  my-3 text-white-400 px-4 py-2 rounded-md"
            onClick={() =>
              connect(async () => {
                const wallet = createWallet("io.metamask");
                await wallet.connect({ client: client });

                return wallet;
              })
            }
          >
            MetaMask
          </button>
        </>
      )}
    </div>
  );
}

function SocialsFlow() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">Customize Embed</p>
    </div>
  );
}

function CustomFlow() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">Custom Flow</p>
    </div>
  );
}

function EmailFlow() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">Phone Passkey</p>
    </div>
  );
}

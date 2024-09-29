"use client";

import React from "react";
import {
  ConnectButton,
  ConnectEmbed,
  darkTheme,
  useActiveAccount,
} from "thirdweb/react"; // Removed MediaRenderer if unused
import { client } from "../client"; // Assuming this is configured correctly
import { createWallet } from "thirdweb/wallets";

const Page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center mt-20 mb-20">
      <DefaultConnectEmbed />
      <CustomWallet />

      <CustomThemeEmbed />
    </div>
  );
};

export default Page;

function DefaultConnectEmbed() {
  const account = useActiveAccount();

  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">
        Default Connect Embed Component
      </p>
      <ConnectEmbed client={client} />
      {account && <ConnectButton client={client} />}
    </div>
  );
}

function CustomWallet() {
  const account = useActiveAccount();

  const wallet = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("app.catecoin"),
  ];

  const reccomendedWallets = [createWallet("io.metamask")];

  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">
        Custom Wallet Connect Embed
      </p>

      <ConnectEmbed
        client={client}
        wallets={wallet}
        recommendedWallets={reccomendedWallets}
      />
      {account && <ConnectButton client={client} />}
    </div>
  );
}

function CustomThemeEmbed() {
  const account = useActiveAccount();

  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">Customize Embed</p>

      <ConnectEmbed
        client={client}
        theme={darkTheme({
          colors: {
            modalBg: "#5a74dd",
            secondaryText: "2c14db",
          },
          fontFamily: "mono",
        })}
        showThirdwebBranding={false}
      />
      {account && <ConnectButton client={client} />}
    </div>
  );
}

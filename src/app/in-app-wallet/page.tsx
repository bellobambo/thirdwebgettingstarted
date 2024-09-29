"use client";

import React from "react";
import {
  ConnectButton,
  ConnectEmbed,
  darkTheme,
  useActiveAccount,
} from "thirdweb/react"; // Removed MediaRenderer if unused
import { client } from "../client"; // Assuming this is configured correctly
import { createWallet, inAppWallet } from "thirdweb/wallets";

const Page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center mt-20 mb-20">
      <AllOptions />
      <EmailOnly />

      <Socials />
      <PhonePasskey />
    </div>
  );
};

export default Page;

function AllOptions() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">
        Default Connect Embed Component
      </p>
      <ConnectButton client={client} wallets={[inAppWallet()]} />
    </div>
  );
}

function EmailOnly() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">
        Custom Wallet Connect Embed
      </p>
      <ConnectButton
        client={client}
        wallets={[
          inAppWallet({
            auth: {
              options: ["google", "email"],
            },
          }),
        ]}
      />
    </div>
  );
}

function Socials() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">Customize Embed</p>
      <ConnectButton
        client={client}
        wallets={[
          inAppWallet({
            auth: {
              options: ["google", "email"],
            },
          }),
        ]}
      />
    </div>
  );
}
function PhonePasskey() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">Phone Passkey</p>
      <ConnectButton
        client={client}
        wallets={[
          inAppWallet({
            auth: {
              options: ["phone", "passkey"],
            },
          }),
        ]}
      />
    </div>
  );
}

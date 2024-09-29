"use client";

import React, { useState } from "react";
import {
  ConnectButton,
  ConnectEmbed,
  darkTheme,
  useActiveAccount,
  useActiveWallet,
  useAutoConnect,
  useConnect,
  useConnectModal,
  useDisconnect,
} from "thirdweb/react";
import { client } from "../client";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { hasStoredPasskey, preAuthenticate } from "thirdweb/wallets/in-app";

const Page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center mt-20 mb-20">
      <SingleWalletFlow />
      <SocialsFlow />
      <EmailFlow />
      <PassKey />
      <ConnectModal />
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
  const account = useActiveAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  const handleLogin = async () => {
    await connect(async () => {
      const wallet = inAppWallet();
      await wallet.connect({
        client: client,
        strategy: "google",
      });
      return wallet;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">Social Login</p>
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
            className="bg-blue-400  my-3 text-white-400 px-4 py-2 rounded-md"
            onClick={handleLogin}
          >
            Google
          </button>
        </>
      )}
    </div>
  );
}

function EmailFlow() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [isVerification, setIsVerification] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const sendVerification = async (email: string) => {
    await preAuthenticate({
      client: client,
      strategy: "email",
      email: email,
    });
    setIsVerification(true);
  };

  const handleLogin = async (email: string, verificationCode: string) => {
    await connect(async () => {
      const wallet = inAppWallet();
      await wallet.connect({
        client: client,
        strategy: "email",
        email: email,
        verificationCode: verificationCode,
      });
      return wallet;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">Email Flow</p>

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
      ) : !isVerification ? (
        <>
          <input
            type="text"
            placeholder="Email"
            className="bg-zinc-800 text-white-400 px-4 py-2 rounded-md mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white-400 px-4 py-2 rounded-md"
            onClick={() => sendVerification(email)}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Verification Code"
            className="bg-zinc-800 text-white-400 px-4 py-2 rounded-md mb-4"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white-400 px-4 py-2 rounded-md"
            onClick={() => {
              handleLogin(email, verificationCode);
              setEmail("");
              setVerificationCode("");
            }}
          >
            Verify
          </button>
        </>
      )}
    </div>
  );
}

function PassKey() {
  const account = useActiveAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const wallet = useActiveWallet();
  const handleLogin = async () => {
    await connect(async () => {
      const wallet = inAppWallet();
      const hassPasskey = await hasStoredPasskey(client);
      await wallet.connect({
        client: client,
        strategy: "passkey",
        type: hassPasskey ? "sign-in" : "sign-up",
      });
      return wallet;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">Custom Flow</p>
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
            onClick={handleLogin}
          >
            Sign In With Passkey
          </button>
        </>
      )}
    </div>
  );
}

function ConnectModal() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  const { connect } = useConnectModal();
  const { disconnect } = useDisconnect();

  const handleLogin = async () => {
    await connect({ client: client, showThirdwebBranding: false });
  };

  // Auto Connect Wallet

  const { data } = useAutoConnect({
    client: client,
    wallets: [createWallet("io.metamask"), inAppWallet()],
    onConnect(wallet) {
      console.log("Auto Connected Wallet", wallet);
    },
  });

  return (
    <div className="flex flex-col items-center">
      <p className="text-zinc-300 text-base mb-4">Custom Modal</p>

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
            onClick={handleLogin}
          >
            Connect Wallet
          </button>
        </>
      )}
    </div>
  );
}

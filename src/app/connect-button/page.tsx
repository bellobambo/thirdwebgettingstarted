"use client";

import React from "react";
import { ConnectButton, darkTheme, MediaRenderer } from "thirdweb/react";
import { client } from "../client";
import { createWallet } from "thirdweb/wallets";

const page = () => {
  return (
    <div className="gird grid-cols-2 justify-center items-center mt-20 md:mb-20">
      <DefaultConnectButton />

      <CustomWallet />

      <ButtonAppearance />

      <CustomThemeButton />
    </div>
  );
};

export default page;

function DefaultConnectButton() {
  return (
    <div className="flex flex-col items-center mb-20 md:mb-20">
      <p className="text-zinc-300 text-base mb-4 md:mb-4">
        Default Connect Button Component
      </p>
      <ConnectButton
        client={client}
        connectModal={{
          size: "wide",
        }}
      />
    </div>
  );
}

function CustomWallet() {
  const recommendedWallets = [createWallet("com.coinbase.wallet")];
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("app.ammer"),
    createWallet("app.core.extension"),
  ];

  return (
    <div className="flex flex-col items-center mb-20 md:mb-20">
      <p className="text-zinc-300 text-base mb-4 md:mb-4">
        Custom Wallet Connect Button
      </p>
      <ConnectButton
        client={client}
        wallets={wallets}
        recommendedWallets={recommendedWallets}
      />
    </div>
  );
}

function ButtonAppearance() {
  return (
    <div className="flex flex-col items-center mb-20 md:mb-20">
      <p className="text-zinc-300 text-base mb-4 md:mb-4">Button Appearance</p>
      <ConnectButton
        client={client}
        connectButton={{
          label: "Sign In",
        }}
        connectModal={{
          title: "Hello",
          size: "wide",
          //   welcomeScreen: {
          //     title: "Okay nice",
          //     subtitle: "This is the subtitle",
          //     img: {
          //       src: "https://placehold.co/400",
          //       height: 200,
          //       width: 200,
          //     },
          //   },
          welcomeScreen: () => <CustomWelcomeScreen />,
        }}
        wallets={[
          createWallet("io.metamask"),
          createWallet("com.coinbase.wallet"),
        ]}
      />
    </div>
  );
}

function CustomWelcomeScreen() {
  return (
    <div>
      <MediaRenderer
        client={client}
        src={"https://placehold.co/400"}
        height={"auto"}
        width={"100%"}
      />
    </div>
  );
}
function CustomThemeButton() {
  return (
    <div className="flex flex-col items-center mb-20 md:mb-20">
      <p className="text-zinc-300 text-base mb-4 md:mb-4">Customize Button</p>
      <ConnectButton
        client={client}
        connectModal={{
          size: "wide",
        }}
        theme={darkTheme({
          colors: {
            primaryText: "#F6F8FF",
            secondaryText: "#2B333D",
            accentText: "#F6F8FF",
            modalOverlayBg: "#DAE8FC",
            modalBg: "#010101",
            accentButtonBg: "#2469DA",
            accentButtonText: "#F6F8FF",
            secondaryButtonBg: "#010101",
            secondaryButtonText: "#F6F8FF",
            secondaryButtonHoverBg: "#2469DA",
            separatorLine: "#2B333D",
            borderColor: "#2B333D",
            primaryButtonBg: "#2469DA",
            primaryButtonText: "#F6F8FF",
            connectedButtonBg: "#010101",
            connectedButtonBgHover: "#2469DA",
          },
          fontFamily: "Roboto",
        })}
      />
    </div>
  );
}

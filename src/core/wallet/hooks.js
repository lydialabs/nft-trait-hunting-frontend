import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { SigningStargateClient } from "@cosmjs/stargate";

import { userAtom } from "../../store/jotai/userAtom";
import { ChainInfo } from "./constants";

const WALLET_ADDRESS = "WALLET_ADDRESS";

export const useConnectKeplr = () => {
  const setUser = useSetAtom(userAtom);

  const connectWallet = async () => {
    console.log("Connecting wallet...");
    try {
      if (window) {
        if (window["keplr"]) {
          if (window.keplr["experimentalSuggestChain"]) {
            await window.keplr.enable("cosmoshub");
            await window.keplr.experimentalSuggestChain(ChainInfo);
            const offlineSigner = await window.getOfflineSigner(
              ChainInfo.chainId
            );

            const cwClient = await SigningStargateClient.connectWithSigner(
              ChainInfo.rpc,
              offlineSigner
            );

            const accounts = await offlineSigner.getAccounts();
            console.log("accounts:", accounts);
            const wallet = accounts[0].address;

            setUser({ wallet, offlineSigner, cwClient });
            localStorage.setItem(WALLET_ADDRESS, wallet);
          } else {
            console.warn(
              "Error accessing experimental features, please update Keplr"
            );
          }
        } else {
          window.open(
            "https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap",
            "_blank"
          );
        }
      } else {
        console.warn("Error parsing window object");
      }
    } catch (e) {
      console.error("Error connecting to wallet", e);
    }
  };

  const disconnectWallet = () => {
    setUser({});
    localStorage.removeItem(WALLET_ADDRESS);
  };

  return { connectWallet, disconnectWallet };
};

export const useKeepWalletConnection = () => {
  const { connectWallet } = useConnectKeplr();

  useEffect(() => {
    const accountStorage = localStorage.getItem(WALLET_ADDRESS);
    if (!accountStorage) return;
    window.onload = connectWallet;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

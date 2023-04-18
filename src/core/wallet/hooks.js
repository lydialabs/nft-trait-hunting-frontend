import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { GasPrice } from "@cosmjs/stargate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

import { userAtom } from "../../store/jotai/userAtom";
import { ChainInfo } from "./constants";

const WALLET_ADDRESS = "WALLET_ADDRESS";

export const useConnectKeplr = () => {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const connectWallet = async (refresh) => {
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

            const config = {
              gasPrice: GasPrice.fromString("0.002uconst"),
            };

            const cwClient = new SigningCosmWasmClient(
              await Tendermint34Client.connect(ChainInfo.rpc),
              offlineSigner,
              config
            );

            const accounts = await offlineSigner.getAccounts();
            console.log("accounts:", accounts);
            const wallet = accounts[0].address;

            setUser({ wallet, offlineSigner, cwClient });
            localStorage.setItem(WALLET_ADDRESS, wallet);
            if (!refresh) navigate("/createOptions");
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
    navigate("/walletGrey");
  };

  return { connectWallet, disconnectWallet };
};

export const useKeepWalletConnection = () => {
  const { connectWallet } = useConnectKeplr();

  useEffect(() => {
    const accountStorage = localStorage.getItem(WALLET_ADDRESS);
    if (!accountStorage) return;
    window.onload = () => connectWallet(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

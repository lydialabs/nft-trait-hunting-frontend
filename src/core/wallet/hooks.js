import { useEffect } from "react";
const WALLET_ADDRESS = "WALLET_ADDRESS";

export const useConnectKeplr = () => {
  useEffect(() => {
    const accountStorage = localStorage.getItem(WALLET_ADDRESS);
    if (!accountStorage) return;
    connectWallet();
  }, []);

  const connectWallet = async () => {
    console.log("Connecting wallet...");
    try {
      if (window) {
        if (window["keplr"]) {
          if (window.keplr["experimentalSuggestChain"]) {
            const chainId = "cosmoshub-4";

            await window.keplr.enable(chainId);
            // await window.keplr.experimentalSuggestChain(ChainInfo);
            const offlineSigner = await window.getOfflineSigner(chainId);

            const accounts = await offlineSigner.getAccounts();
            console.log("accounts:", accounts);

            localStorage.setItem(WALLET_ADDRESS, accounts[0].address);
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

  return connectWallet;
};

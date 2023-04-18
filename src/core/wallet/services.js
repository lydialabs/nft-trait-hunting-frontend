import { useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../../store/jotai/userAtom";
import { CONTRACT_ADDRESS } from "./constants";
import { sleep } from "../../utils";
import { Axios } from "../axios";

const txFee = "auto";

export const useMintNFT = (entrypoint = {}) => {
  const userInfo = useAtomValue(userAtom);
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = async () => {
    setLoading(true);
    try {
      const nftRes = await userInfo?.cwClient?.execute(
        userInfo.wallet,
        CONTRACT_ADDRESS,
        entrypoint,
        txFee,
        ""
      );

      await sleep(60000);
      const nftData = await Axios.get("nft?height=" + nftRes.height);
      setNft(nftData);
    } catch (err) {
      console.log("err:", err);
    }
    setLoading(false);
  };

  return { mintNFT: execute, nft, loading };
};

import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";

import { userAtom } from "../../store/jotai/userAtom";
import { CONTRACT_ADDRESS } from "./constants";
import { sleep } from "../../utils";
import { Axios } from "../axios";

const txFee = "auto";

const checkResult = async (blockHeight, setFunction) => {
  await sleep(5000);
  const nftData = await Axios.get("nft?height=" + blockHeight);
  if (nftData?.data === null) {
    await checkResult(blockHeight, setFunction);
  } else {
    if (nftData?.data?.length > 0 && setFunction) setFunction(nftData?.data[0]);
  }
};

export const useContractFunction = () => {
  const userInfo = useAtomValue(userAtom);
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = async (params = {}) => {
    setLoading(true);
    try {
      const nftRes = await userInfo?.cwClient?.execute(
        userInfo.wallet,
        CONTRACT_ADDRESS,
        params,
        txFee,
        ""
      );

      await checkResult(nftRes.height, setNft);
    } catch (err) {
      console.log("err:", err);
    }
    setLoading(false);
  };

  return { execute, nft, loading };
};

export const useListOfNFT = () => {
  const userInfo = useAtomValue(userAtom);
  const [nfts, setNfts] = useState([]);

  const doFetch = () => {
    Axios.get("nft?wallet=" + userInfo.wallet).then((res) => {
      setNfts(res.data);
    });
  };

  useEffect(() => {
    if (userInfo?.wallet) {
      doFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.wallet]);

  return { nfts, refresh: doFetch };
};

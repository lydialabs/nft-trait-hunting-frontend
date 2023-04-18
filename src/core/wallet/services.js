import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../../store/jotai/userAtom";
import { CONTRACT_ADDRESS } from "./constants";
import { sleep } from "../../utils";
import { Axios } from "../axios";

const txFee = "auto";
const LOOP_LIMIT = 10;
let loopCount = 0;

const checkResult = async (blockHeight, setFunction) => {
  if (loopCount === LOOP_LIMIT) return;
  await sleep(20000);
  const nftData = await Axios.get("nft?height=" + blockHeight);
  if (nftData?.data === null) {
    loopCount++;
    await checkResult(blockHeight);
  } else {
    if (nftData?.data?.length > 0 && setFunction) setFunction(nftData?.data[0]);
    loopCount = 0;
  }
};

export const useMintNFT = () => {
  const userInfo = useAtomValue(userAtom);
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = async () => {
    setLoading(true);
    try {
      const nftRes = await userInfo?.cwClient?.execute(
        userInfo.wallet,
        CONTRACT_ADDRESS,
        { mint: {} },
        txFee,
        ""
      );

      await checkResult(nftRes.height, setNft);
    } catch (err) {
      console.log("err:", err);
    }
    setLoading(false);
  };

  return { mintNFT: execute, nft, loading };
};

export const useMergeNFTs = () => {
  const userInfo = useAtomValue(userAtom);
  const [loading, setLoading] = useState(false);

  const execute = async (token_id_1, token_id_2) => {
    setLoading(true);
    try {
        const nftRes = await userInfo?.cwClient?.execute(
          userInfo.wallet,
          CONTRACT_ADDRESS,
          { combine: { token_id_1, token_id_2, should_return_new_token: true } },
          txFee,
          ""
        );
        await checkResult(nftRes.height);
    } catch (err) {
      console.log("err:", err);
    }
    setLoading(false);
  };

  return { mergeNFTs: execute, loading };
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

import { useAtomValue } from "jotai";
import { userAtom } from "../../store/jotai/userAtom";
import { CONTRACT_ADDRESS } from "./constants";

const txFee = "auto";

export const useMintNFT = (entrypoint) => {
  const userInfo = useAtomValue(userAtom);

  const execute = async () => {
    try {
      return userInfo?.cwClient?.execute(
        userInfo.wallet,
        CONTRACT_ADDRESS,
        entrypoint,
        txFee,
        ""
      );
    } catch (err) {
      console.log("err:", err);
    }
  };

  return execute;
};

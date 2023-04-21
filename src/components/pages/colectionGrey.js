import { memo, useState } from "react";
import { useAtomValue } from "jotai";
import swal from "@sweetalert/with-react";

import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";

import { useListOfNFT, useContractFunction } from "../../core/wallet/services";
import { userAtom } from "../../store/jotai/userAtom";
import { randomBoolean } from "../../utils";
import { TIERS } from "../../core/wallet/constants";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const Colection = function () {
  const [selectedNfts, setSelectedNfts] = useState([]);
  const userInfo = useAtomValue(userAtom);

  const { nfts, refresh } = useListOfNFT();
  const { execute: mergeNFTs, loading } = useContractFunction();

  const onMergeNFTs = async () => {
    try {
      const shouldReturenNewToken = randomBoolean(
        TIERS[selectedNfts?.[0]?.tier].percentage
      );
      await mergeNFTs(
        {
          combine: {
            token_id_1: selectedNfts?.[0]?.token_id,
            token_id_2: selectedNfts?.[1]?.token_id,
            should_return_new_token: shouldReturenNewToken,
          },
        },
        nfts
      );

      const alert = shouldReturenNewToken
        ? ["Congratulations!", "You got a new NFT", "success"]
        : ["Opps!", "Merging failed", "error"];

      swal(...alert, {
        button: false,
        timer: 3000,
      });
      setSelectedNfts([]);
      refresh();
    } catch (err) {
      console.error("err:", err);
    }
  };

  return (
    <div className="greyscheme">
      <StyledHeader theme={theme} />

      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(/img/background/5.jpg)`,
        }}
      >
        <div className="mainbreadcumb"></div>
      </section>

      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                <div className="d_profile_img">
                  <img src="/img/author/author-11.jpg" alt="" />
                  <i className="fa fa-check"></i>
                </div>

                <div className="profile_name">
                  <h4>
                    {userInfo?.name}
                    <div className="clearfix"></div>
                    <span id="wallet" className="profile_wallet"></span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container no-top">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="items_filter mb-5"
              style={{ position: "relative", marginTop: 0 }}
            >
              <button
                onClick={onMergeNFTs}
                disabled={selectedNfts?.length < 2 || loading}
                className="btn-main"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "178.04px",
                }}
              >
                {loading ? (
                  <span aria-hidden="true" className="icon_loading"></span>
                ) : (
                  "Merge Swords"
                )}
              </button>
            </div>
          </div>
        </div>
        <ColumnNewRedux
          shuffle
          showLoadMore={false}
          nfts={nfts}
          selectedNfts={selectedNfts}
          setSelectedNfts={setSelectedNfts}
          loading={loading}
        />
      </section>

      <Footer />
    </div>
  );
};
export default memo(Colection);

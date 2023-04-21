import { memo, useState } from "react";
import swal from "@sweetalert/with-react";

import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";

import { useListOfNFT, useContractFunction } from "../../core/wallet/services";
import { randomBoolean } from "../../utils";
import { TIERS } from "../../core/wallet/constants";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const Colection = function () {
  const [selectedNfts, setSelectedNfts] = useState([]);

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
      <section className="container" style={{ paddingTop: "150px" }}>
        <div className="row">
          <div className="col-lg-7">
            <div className="items_filter mb-5" style={{ marginTop: 0 }}>
              <h5>Merge Swords</h5>
              <p className="p-info pb-3" style={{ fontSize: "16px" }}>
                Using generative AI, two swords are merged to create the next
                tier sword, which inherits traits of existing two swords. The
                success rate is 50% for mergin common swords and 30% for rare
                swords.
              </p>
              <button
                onClick={onMergeNFTs}
                disabled={selectedNfts?.length < 2 || loading}
                className="btn-main"
                style={{
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

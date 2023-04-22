import { memo, useState } from "react";
import styled from "styled-components";
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

const Icon = styled("div")`
  color: ${(props) => (props.fail ? "#c32530" : "#0b8443")};
  font-size: 60px;
  line-height: 15px;
  font-weight: 900;
  border-radius: 10px;
  border: ${(props) =>
    props.fail ? "8px solid #c32530" : "8px solid #0b8443"};
  display: inline-block;
  padding: 20px 5px;
  margin: 20px 0;
  text-transform: uppercase;
  font-family: "Courier";
  -webkit-mask-image: url("/img/background/grunge.png");
  -webkit-mask-size: 944px 604px;
  mix-blend-mode: multiply;
  opacity: 0.8;
  transform: rotate(-10deg);
`;

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
        ? { title: "Congratulations!", content: <Icon>success</Icon> }
        : { title: "Oops!", content: <Icon fail>fail</Icon> };

      swal({ ...alert, timer: 5000 });
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
        className="container"
        style={{ paddingTop: "150px", minHeight: "calc(100vh - 118px)" }}
      >
        <div className="row">
          <div className="col-lg-7">
            <div className="items_filter mb-5" style={{ marginTop: 0 }}>
              <h5>Merge Swords</h5>
              <p className="p-info pb-3" style={{ fontSize: "16px" }}>
                Using generative AI, two swords are merged to create the next
                tier sword, which inherits traits of existing two swords. The
                success rate is 50% for merging common swords and 30% for rare
                swords.
              </p>
              <button
                onClick={onMergeNFTs}
                disabled={selectedNfts?.length < 2 || loading}
                className="btn-main"
                style={{
                  width: "178.04px",
                  height: "37px",
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

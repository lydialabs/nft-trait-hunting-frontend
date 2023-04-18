import React, { memo } from "react";
import { useAtomValue } from "jotai";

import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";

import { useListOfNFT, useMergeNFTs } from "../../core/wallet/services";
import { userAtom } from "../../store/jotai/userAtom";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const Colection = function () {
  const [selectedNfts, setSelectedNfts] = React.useState([]);
  const userInfo = useAtomValue(userAtom);

  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  const { nfts, refresh } = useListOfNFT();
  const { mergeNFTs, loading } = useMergeNFTs();

  const onMergeNFTs = async () => {
    await mergeNFTs(selectedNfts?.[0]?.token_id, selectedNfts?.[1]?.token_id);
    setSelectedNfts([]);
    refresh();
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
              className="items_filter"
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
                  width: "158.04px",
                }}
              >
                {loading ? (
                  <span aria-hidden="true" className="icon_loading"></span>
                ) : (
                  "Merge NFTs"
                )}
              </button>
              <ul className="de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>
                    New ({nfts?.length || 0})
                  </span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Favorite (0)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id="zero1" className="onStep fadeIn">
            <ColumnNewRedux
              shuffle
              showLoadMore={false}
              nfts={nfts}
              selectedNfts={selectedNfts}
              setSelectedNfts={setSelectedNfts}
            />
          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnNewRedux shuffle showLoadMore={false} />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
export default memo(Colection);

import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";
import * as selectors from "../../store/selectors";
import { fetchHotCollections } from "../../store/actions/thunks";
import api from "../../core/api";

import { useListOfNFT } from "../../core/wallet/services";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const Colection = function ({ collectionId = 1 }) {
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

  const nfts = useListOfNFT();
  console.log("🚀 ~ file: colectionGrey.js:18 ~ Colection ~ nfts:", nfts);

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
                    Peter
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
            <div className="items_filter">
              <ul className="de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>New</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Favorite</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id="zero1" className="onStep fadeIn">
            <ColumnNewRedux shuffle showLoadMore={false} nfts={nfts}/>
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

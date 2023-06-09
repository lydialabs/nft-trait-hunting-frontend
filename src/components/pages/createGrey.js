import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";

import Footer from "../components/footer";

import { useContractFunction } from "../../core/wallet/services";
import { userAtom } from "../../store/jotai/userAtom";

// import { createGlobalStyle } from 'styled-components';

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREYLOGIN"; //LIGHT, GREY, RETRO

const Createpage = () => {
  const { execute: mintNFT, nft, loading } = useContractFunction();
  const useInfo = useAtomValue(userAtom);

  return (
    <div className="greyscheme">
      <StyledHeader theme={theme} />
      <section className="jumbotron breadcumb no-bg">
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Mint a Sword</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5 center">
            <h5>Free Swords</h5>
            <p className="p-info pb-3">
              You can mint unlimited number of free swords, however, you will
              only be able to mint swords of the "common" tier. If you want to
              upgrade your swords to rare or legendary, use the "Merge" feature
              from the homepage.
            </p>
            <button
              className="btn-main"
              onClick={() => mintNFT({ mint: {} })}
              disabled={loading || !useInfo?.wallet}
            >
              {useInfo?.wallet ? "Mint a Sword" : "Connect Wallet"}
            </button>

            {loading && (
              <p className="p-info pt-3">
                Processing! This may take a while to finish.
              </p>
            )}
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <div className="nft__item m-0">
              <div className="nft__item_wrap" style={{ cursor: "initial" }}>
                <span>
                  {loading ? (
                    <span aria-hidden="true" className="icon_loading"></span>
                  ) : nft ? (
                    <Link to="/colectionGrey">
                      <img
                        src={nft.image}
                        id="get_file_2"
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  ) : (
                    "No preview"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Createpage;

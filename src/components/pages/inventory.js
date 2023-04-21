import { memo } from "react";
import { useAtomValue } from "jotai";
import swal from "@sweetalert/with-react";

import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";

import { useListOfNFT } from "../../core/wallet/services";
import { userAtom } from "../../store/jotai/userAtom";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const Colection = function () {
  const userInfo = useAtomValue(userAtom);

  const { nfts } = useListOfNFT();

  const onClick = (sword) => {
    swal({
      title: "Preview",
      content: (
        <img src={sword?.image} alt="preview" style={{ width: "100%" }} />
      ),
    });
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
        <ColumnNewRedux showLoadMore={false} nfts={nfts} onClick={onClick} />
      </section>

      <Footer />
    </div>
  );
};
export default memo(Colection);

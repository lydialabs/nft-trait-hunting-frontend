import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { StyledHeader } from "../Styles";

const Createpage = () => {
  return (
    <div className="greyscheme">
      <StyledHeader theme="GREY" />

      <section
        className="jumbotron breadcumb no-bg"
        style={{ backgroundColor: "rgba(255, 255, 255, .01)" }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">NFT Craft</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <p>
              Choose "Mint" if you want to mint an NFT
              or "Combine" if you want to combine your NFTs.
            </p>
            <Link to="/createGrey" className="opt-create">
              <img src="./img/misc/grey-coll-single.png" alt="" />
              <h3 style={{ marginTop: "25px" }}>Mint</h3>
            </Link>
            <Link to="/create3" className="opt-create">
              <img src="./img/misc/grey-coll-multiple.png" alt="" />
              <h3>Combine</h3>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Createpage;

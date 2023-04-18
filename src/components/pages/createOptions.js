import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { StyledHeader } from "../Styles";

import { useMintNFT } from "../../core/wallet/services";

const Createpage = () => {
  const mintNFT = useMintNFT({ mint: {} });

  const onMintNFT = async () => {
    const result = await mintNFT();
    console.log("🚀 ~ file: createOptions.js:12 ~ onMintNFT ~ result:", result);
  };

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
                <h1 className="text-center">Create Collectible</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <p>
              Choose "Single" if you want your collectible to be one of a kind
              or "Multiple" if you want to sell one collectible times
            </p>
            <Link className="opt-create" onClick={onMintNFT}>
              <img src="./img/misc/grey-coll-single.png" alt="" />
              <h3 style={{ marginTop: "25px" }}>Single</h3>
            </Link>
            <Link to="/create3" className="opt-create">
              <img src="./img/misc/grey-coll-multiple.png" alt="" />
              <h3>Multiple</h3>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Createpage;

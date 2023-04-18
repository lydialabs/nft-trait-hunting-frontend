import Footer from "../components/footer";
import { useMintNFT } from "../../core/wallet/services";

// import { createGlobalStyle } from 'styled-components';

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREYLOGIN"; //LIGHT, GREY, RETRO

const Createpage = () => {
  const { mintNFT, nft, loading } = useMintNFT({ mint: {} });

  return (
    <div className="greyscheme">
      <StyledHeader theme={theme} />
      <section className="jumbotron breadcumb no-bg">
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">Create</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5 center">
            {/* <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Upload file</h5>

                <div className="d-create-file">
                  <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                  {this.state.files.map((x) => (
                    <p key="{index}">
                      PNG, JPG, GIF, WEBP or MP4. Max 200mb.{x.name}
                    </p>
                  ))}
                  <div className="browse">
                    <input
                      type="button"
                      id="get_file"
                      className="btn-main"
                      value="Browse"
                    />
                    <input
                      id="upload_file"
                      type="file"
                      multiple
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="spacer-single"></div>

                <h5>Title</h5>
                <input
                  type="text"
                  name="item_title"
                  id="item_title"
                  className="form-control"
                  placeholder="e.g. 'Crypto Funk"
                />

                <div className="spacer-10"></div>

                <h5>Description</h5>
                <textarea
                  data-autoresize
                  name="item_desc"
                  id="item_desc"
                  className="form-control"
                  placeholder="e.g. 'This is very limited item'"
                ></textarea>

                <div className="spacer-10"></div>

                <h5>Price</h5>
                <input
                  type="text"
                  name="item_price"
                  id="item_price"
                  className="form-control"
                  placeholder="enter price for one item (ETH)"
                />

                <div className="spacer-10"></div>

                <h5>Royalties</h5>
                <input
                  type="text"
                  name="item_royalties"
                  id="item_royalties"
                  className="form-control"
                  placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"
                />

                <div className="spacer-10"></div>

                <input
                  type="button"
                  id="submit"
                  className="btn-main"
                  value="Create Item"
                />
              </div>
            </form> */}
            <h5>Mint your NFT NOW.</h5>
            <p className="p-info pb-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <button className="btn-main" onClick={mintNFT} disabled={loading}>
              Create NFT
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
              {/* <div className="de_countdown">
                <Clock deadline="December, 30, 2021" />
              </div> */}
              {/* <div className="author_list_pp">
                <span>
                  <img
                    className="lazy"
                    src="./img/author/author-1.jpg"
                    alt=""
                  />
                  <i className="fa fa-check"></i>
                </span>
              </div> */}
              <div className="nft__item_wrap">
                <span>
                  {nft ? (
                    <img
                      src={nft.image}
                      id="get_file_2"
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  ) : loading ? (
                    <span aria-hidden="true" className="icon_loading"></span>
                  ) : (
                    "No preview"
                  )}
                </span>
              </div>
              {/* <div className="nft__item_info">
                <span>
                  <h4>Pinky Ocean</h4>
                </span>
                <div className="nft__item_price">
                  0.08 ETH<span>1/20</span>
                </div>
                <div className="nft__item_action">
                  <span>Place a bid</span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>50</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Createpage;

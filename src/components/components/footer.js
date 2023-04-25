import React from "react";

const footer = () => (
  <footer className="footer-light">
    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div className="de-flex-col">
                <span onClick={() => window.open("", "_self")}>
                  <img alt="" className="f-logo d-1" src="./img/logo.png" />
                  <img
                    alt=""
                    className="f-logo d-3"
                    src="./img/logo-2-light.png"
                  />
                  <img
                    alt=""
                    className="f-logo d-4"
                    src="/logo192.png"
                    style={{ width: "40px", borderRadius: "50%" }}
                  />
                  <span className="copy">
                    &copy; Copyright 2023 - Ascension Arena by Lydia Labs
                  </span>
                </span>
              </div>
              <div className="de-flex-col">
                <div className="social-icons">
                  <a
                    className="btn-website"
                    href="https://lydialabs.xyz/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span onClick={() => window.open("", "_self")}>
                      <i className="fa fa-globe fa-lg"></i>
                    </span>
                  </a>

                  <a
                    className="btn-twitter"
                    href="https://twitter.com/lydia_labs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span onClick={() => window.open("", "_self")}>
                      <i className="fa fa-twitter fa-lg"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default footer;

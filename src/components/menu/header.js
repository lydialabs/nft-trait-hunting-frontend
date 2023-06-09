/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAtomValue } from "jotai";
import BigNumber from "bignumber.js";

import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import { Link, useNavigate, useMatch, useResolvedPath } from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";

import { userAtom } from "../../store/jotai/userAtom";
import { useConnectKeplr } from "../../core/wallet/hooks";
import { formatAddress } from "../../utils";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return <Link {...props} className={match ? "active" : "non-active"} />;
};

// const navlinks = ["Home", "Explore", "Activity"];
const navlinks = [""];

const Header = function ({ className }) {
  const navigate = useNavigate();
  const useInfo = useAtomValue(userAtom);
  const { disconnectWallet } = useConnectKeplr();

  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };

  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });

  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const [shownot, btn_icon_not] = useState(false);
  const closePop = () => {
    btn_icon_pop(false);
  };
  const closeNot = () => {
    btn_icon_not(false);
  };
  const refpop = useOnclickOutside(() => {
    closePop();
  });
  const refpopnot = useOnclickOutside(() => {
    closeNot();
  });

  const formatBalance = (value, decimals) => {
    const TEN = new BigNumber(10);
    return new BigNumber(value).div(TEN.pow(decimals)).dp(6).toFormat();
  };

  const handleLogout = () => {
    disconnectWallet();
    navigate("/");
  };

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");
      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
      if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <header className={`navbar white ${className}`} id="myHeader">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to="/">
                <img
                  src="/img/logo.png"
                  className="img-fluid d-block"
                  alt="#"
                />
                <img src="/img/logo-2.png" className="img-fluid d-3" alt="#" />
                <img
                  src="/logo192.png"
                  className="img-fluid d-4"
                  alt="#"
                  style={{ width: "50px", borderRadius: "50%" }}
                />
                <img
                  src="/img/logo-light.png"
                  className="img-fluid d-none"
                  alt="#"
                />
              </NavLink>
            </div>
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  {navlinks.map((link) => (
                    <div className="navbar-item" key={link}>
                      <div ref={ref}>
                        <div
                          className="dropdown-custom dropdown-toggle btn"
                          onClick={handleBtnClick}
                        >
                          {link}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                {navlinks.map((link) => (
                  <div className="navbar-item" key={link}>
                    <div ref={ref}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onMouseEnter={handleBtnClick}
                        onMouseLeave={closeMenu}
                      >
                        {link}
                        {/* <span className="lines"></span> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className="mainside">
            {!useInfo?.wallet ? (
              <div className="connect-wal">
                <NavLink to="/walletGrey" id="btn">
                  Connect Wallet
                </NavLink>
              </div>
            ) : (
              <div className="logout">
                <NavLink to="/createOptions" id="btn">
                  Create
                </NavLink>
                <div
                  id="de-click-menu-profile"
                  className="de-menu-profile"
                  onClick={() => btn_icon_pop(!showpop)}
                  ref={refpop}
                >
                  <img src="/img/author/profile-image.png" alt="" />
                  {showpop && (
                    <div className="popshow">
                      <div className="d-name">
                        <h4 style={{ color: "#8364e2" }}>{useInfo?.name}</h4>
                      </div>
                      <div className="d-balance">
                        <h4>Balance</h4>
                        {formatBalance(useInfo?.balance, 6)} ARCH
                      </div>
                      <div className="d-walet">
                        <h4>My Wallet</h4>
                        <span
                          id="wallet"
                          className="d-wallet-address"
                          style={{ marginRight: "10px" }}
                        >
                          {formatAddress(useInfo?.wallet)}
                        </span>
                        <CopyToClipboard text={useInfo?.wallet}>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </CopyToClipboard>
                      </div>
                      <div className="d-line"></div>
                      <ul className="de-submenu-profile">
                        <li>
                          <Link to="inventory" style={{ margin: 0 }}>
                            <span>
                              <i className="fa fa-user"></i> My Inventory
                            </span>
                          </Link>
                        </li>

                        <li onClick={handleLogout}>
                          <span>
                            <i className="fa fa-sign-out"></i> Disconnect Wallet
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;

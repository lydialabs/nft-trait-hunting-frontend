import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTopBtn from "./menu/ScrollToTop";
import Header from "./menu/header";
import Colectiongrey from "./pages/colectionGrey";
import Inventory from "./pages/inventory";
import WalletGrey from "./pages/walletGrey";
import Creategrey from "./pages/createGrey";
import Createoption from "./pages/createOptions";

import { createGlobalStyle } from "styled-components";
import { useKeepWalletConnection } from "../core/wallet/hooks";

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

const App = () => {
  useKeepWalletConnection();

  return (
    <div className="wraper">
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Createoption />} />
        <Route element={<Creategrey />} path="/createGrey" />
        <Route element={<Createoption />} path="/createOptions" />
        <Route element={<WalletGrey />} path="/walletGrey" />
        <Route element={<Colectiongrey />} path="/colectionGrey" />
        <Route element={<Inventory />} path="/inventory" />
      </Routes>
      <ScrollToTopBtn />
    </div>
  );
};
export default App;

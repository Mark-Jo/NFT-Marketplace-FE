import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import Sell from "./pages/Sell";
import NFTDetail from "./pages/NFTDetail";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import Connect from "./pages/Connect";
import Auth from "./pages/Auth";
import Setting from "./components/Setting";



ReactDOM.render(

  <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/sell/:networkType/:tokenId" element={<Sell />} />
        <Route path="/detail/:networkType/:tokenId" element={<NFTDetail />} />
          <Route path="/wallet" element={<Connect />} />
          <Route path="/setting" element={<Setting />} />



      </Routes>
    </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

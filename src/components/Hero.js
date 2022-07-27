import React from "react";
import "../styles/Hero.css";
import Caver from "caver-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Hero = () => {
  let navigate = useNavigate();
  const goExplore = () => {
    navigate("/explore");
  };
  const goCreate = () => {
    navigate("/create");
  };

  return (
    <div id="hero">
      {/* <img id='hero-background' src={list[0].src}/> */}

   {/*   <Header />*/}

      <h1 id="header-text-first"> Megazone Cloud </h1>
      <h1 id="header-text-second"> NFT Marketplace</h1>
      <h5 id="header-subtext" style={{fontFamily:'Roboto Mono',fontSize:30,fontWeight:"bold"}}>Create & trade NFT's in the dark</h5>

      <div id="hero-buttons">

        {/*  <button id="explore" onClick={sendKaikas}>
              Test
          </button>*/}

        <button id="explore" onClick={goExplore}>
          Explore
        </button>

        <button id="create" onClick={goCreate}>Create</button>
      </div>

    </div>
  );
};

export default Hero;

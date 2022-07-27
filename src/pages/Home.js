import React from "react";
import Hero from "../components/Hero";
import "../styles/Home.css";
import HotDropsList from "../components/HotDropsList";



const Home = () => {



  return (
    <div id="home">

      <Hero />
      <p id="card-list-header-text" style={{marginTop:-30}}> Hot Drops </p>
      <div id="list-container">
        <HotDropsList style={{marginTop:-30}}/>
      </div>
    </div>
  );
};

export default Home;

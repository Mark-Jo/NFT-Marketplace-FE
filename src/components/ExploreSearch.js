import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import '../styles/base/TextInput.css';

const ExploreSearch = ({option, changeOption}) => {
    return (
    <div id = "search-bar">
        <div className="search-wrapper">
            <div
                className="search-container"
                style={{
                    // width:`${width}`,
                    // height:`${height}`,
                    background: `radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.05) 0%,
                    rgba(48,118,234,0.2) 0%,
                    rgba(255, 255, 255, 0.05) 70%
                )`,
                }}
            >
                <input id="search" placeholder="Explore NFTs" onChange={changeOption} value={option}/>
                <AiOutlineSearch size="30" color="rgba(48,118,234,1)" />
            </div>
        </div>
    </div>
    );
};

export default ExploreSearch;
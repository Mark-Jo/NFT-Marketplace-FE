import React, {useEffect} from "react";
import "../styles/Hero.css";
import Search from "./Search";

const PageHeader = ({pageText}) => {
    return (
        <div id="mypage">
            <h1 style={{marginTop:150,marginBottom:50}} id="header-text-first" align={"center"}>{pageText}</h1>


        </div>
    );
};

export default PageHeader;
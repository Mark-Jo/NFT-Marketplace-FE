import React, { useEffect, useState } from "react";
import "../styles/NFTCard.css";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ColorExtractor } from 'react-color-extractor'
import Card from "./base/Card";
import Button from "./base/Button";
import { Colors } from "../constants/Colors";



import { useARStatus } from "../hooks/isARStatus";



const NFTCard = ({ username, nftName, price, nftSrc, collectionName, networkType, gradient, onClick }) => {
  const [colors, setColors] = useState([]);

  const isARSupport = useARStatus(nftSrc);

  useEffect(() => {
    /*console.log(isARSupport);*/
  }, [])


  const getColors = colors => {
    setColors(c => [...c, ...colors]);
    //console.log(colors);
  }
  const [visible, setVisible] = useState("none");

  useEffect(() => {
      if(price!=='null') setVisible("block");
      /*console.log(visible);*/
  })
    const iconImage = () => {
        if (networkType === 'ETH') {
            return <FaEthereum style={{width: 18, height: 18, marginRight: 10, marginBottom: -5}}/>
        } else {
            return <img src={'https://static.opensea.io/tokens/KLAY.png'}
                        style={{width: 20, height: 20, marginRight: 10, marginBottom: -10}}/>
        }
    }

  return (
    <Card
      blurColor={colors[0]}
      onClick={onClick}

      child={<>
        {isARSupport ? <model-viewer ar-scale="auto" ar ar-modes="webxr scene-viewer quick-look" id="reveal" loading="eager" camera-controls auto-rotate src={nftSrc} > </model-viewer> : <><ColorExtractor getColors={getColors}>
          <img className="nft-image" src={nftSrc} />
        </ColorExtractor></>}
        <div className="wrapper">
          <div className="info-container">
            <p className="owner">{collectionName}</p>
            <p className="name" style={{width:160}}>{nftName}</p>
          </div>

          <div className="price-container" style={{display: visible}}>
              {/*<p className="price-label"><img src={'https://static.opensea.io/tokens/KLAY.png'} style={{width:20,height:20,marginBottom:-8}}/></p>*/}
            <p className="price-label">{iconImage()}</p>
            <p className="price">
               {price}
            </p>
          </div>
        </div>
        <div className="buttons">
          {/* <button className="buy-now">Buy Now</button> */}
          {/*<Button color={Colors.buttons.primary} textContent="Buy Now" onClick={onClick} />*/}
        </div>
      </>}>

    </Card>
  );
};

export default NFTCard;


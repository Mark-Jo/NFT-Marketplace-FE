import React, { useState, useEffect } from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

const HotDropsList = ({type="horizontal" }) => {
  const [hotCollection, setHotCollection] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get('/api/NFT/Ethereum/hotdrops')
        .then(res => {
          setHotCollection(res.data);
            console.log(res.data);
        });

  }, []);
    // console.log(hotCollection);
  return (

    <div id="card-list" style={{flexDirection:type==="horizontal" ? "row" : "column"}}>
      {hotCollection.map((item) => (
        <NFTCard nftSrc={`${item.imgUrl}`} key={item.tokenId} onClick={() => {
            navigate(`/detail/${item.networkType}/${item.tokenId}`);}}
        nftName={`${item.name}`}
        price={`${item.salesPrice}`}
        collectionName={`${item.collectionName}`}
       networkType={`${item.networkType}`}
        ></NFTCard>
      ))}
    </div>
  );
};

export default HotDropsList;

import React, { useState, useEffect } from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
const CardList = ({type="horizontal", data }) => {
    //console.log(data);
  const [nftCollection, setNftCollection] = useState([]);
  // const [cookies, setCookies] = useCookies(["accessToken"]);
  // const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
   axios.get('/api/NFT/Ethereum/collection')
      .then((res) => {
          setNftCollection(res.data);
          if (res.data.networkType === 'ETH') {
              return
          }
      })
  }, []);
  console.log(nftCollection.networkType);

  return (
      <div id="card-list" style={{flexDirection:type==="horizontal" ? "row" : "column"}}>
          {nftCollection.filter((val) => {
              if(data ===""){
                  return val;
              } else if(val.name.toLowerCase().includes(data.toLowerCase())){
                  return val;
              }
              return val;
          })
              .map((item) => (
            <NFTCard nftSrc={`${item.imgUrl}`} key={item.tokenId} onClick={() => {
                navigate(`/detail/${item.networkType}/${item.tokenId}`);}}
                     nftName={`${item.name}`}
                     price={`${item.salesPrice}`}
                     networkType={`${item.networkType}`}
                     collectionName={item.collectionName}
            ></NFTCard>
        ))}
      </div>
  );
};

export default CardList;

import React, { useState, useEffect } from "react";
import "../styles/CardList.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import NFTCard from "./NFTCard";
import {useCookies} from "react-cookie";
import Swal from "sweetalert2";

const MyPageList = ({type="horizontal", data }) => {
    const navigate = useNavigate();
    const [myNft, setMyNft] = useState([]);
    const [cookies, setCookies] = useCookies(["accessToken"]);
    const [walletAddress, setWalletAddress] = useState("");
    useEffect( () => {
         axios.get('/api/Auth/userInfo')
             .then((res) => {
                 console.log(res.data);
                 setWalletAddress(res.data.walletAddress);
                 axios.get('/api/NFT/Ethereum/mypage?owner=' + res.data.walletAddress)
                     .then((res) => {
                         console.log(res.data);
                         setMyNft(res.data);
                     })
                     .catch((error) => {
                         console.log(error.response.status);
                     });
             })
             .catch((error) => {
                 console.log(error.response.status);
                 if (error.response.status === '404') {
                     Swal.fire({
                         icon: 'error',
                         title: 'Please Connect your wallet',
                         confirmButtonColor: '#16d016',
                         background: '#1c1b24',
                     }).then((result) => {
                         if (result.isConfirmed) {
                             navigate('/wallet');
                         }
                     });
                 };
             })
             ;
            /*axios.get("/api/NFT/Ethereum/mypage?owner=" + userName)
                .then((res) => {
                    setMyNft(res.data);
                }).catch((err) => {
        console.log('Mypage Err!' + err)*/
    }, []);

    return (
        <div id="card-list" style={{flexDirection:type==="horizontal" ? "row" : "column"}}>
            {myNft.filter((val) => {
                if(data == "") {
                    return val;
                } else if (val.name.toLowerCase().includes(data.toLowerCase())){
                    return val;
                }
            })
                .map((item) => (
                <NFTCard nftSrc={`${item.imgUrl}`} key={item.tokenId} onClick={() => {
                    navigate(`/detail/${item.networkType}/${item.tokenId}`);}}
                         nftName={`${item.name}`}
                         // price={`${item.salesPrice}`}
                        price={!item.salesPrice?'':`${item.salesPrice}`}
                         collectionName={`${item.collectionName}`}
                         networkType={`${item.networkType}`}
                ></NFTCard>
            ))}
        </div>
    );
};

export default MyPageList;

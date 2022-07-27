import React, {useState, useEffect} from "react";
import "../styles/Mint.css";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";

const Test = () => {

    const [cookies, setCookies] = useCookies(["accessToken"]);
    const networkType = 'ETH';
    const tokenId = '33';
    const [account, setAccount] = useState("");
    const [walletType, setWalletType] = useState("");

    // console.log(window.klaytn.selectedAddress);
    // const walletAddress = window.klaytn.selectedAddress;
    // console.log(walletAddress);

    const navigate = useNavigate();
    useEffect(()=>{
        if (networkType === 'ETH'){
            axios.get( '/api/NFT/Ethereum/dbdata?tokenId='+tokenId,
                { headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
                }).then((response) => {
                    //console.log(response.data);
                }
            ).catch((response) => {console.log('Error!'+response) });
        } else if (networkType === 'KLAY') {
            axios.get( '/api/NFT/Klaytn/dbdata?tokenId='+tokenId,
                { headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
                }).then((response) => {
                    //console.log(response.data);
                }
            ).catch((response) => {console.log('Error!'+response) });
        } else {
            console.log('Network Type Error!');
        }
        if (cookies.accessToken !== undefined) {
            axios.get('/api/Auth/userInfo')
                .then((res) => {
                    console.log(res.data);
                    setAccount(res.data.walletAddress);
                    setWalletType(res.data.walletType);
                });
        } else {
            navigate('/wallet');
        }
    }, [])


    return (
        <div>
        <div id="hero-buttons">
            <button onClick={() => {

            }}>
                wallet connect
            </button>
        </div>
        </div>
    );
};

export default Test;
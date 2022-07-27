import React, { useState, useEffect } from "react";
import "../styles/Mint.css";
import {Link, useNavigate} from "react-router-dom";
import kaikasImg from "../assets/kaikas.png"
import axios from "axios";
import Swal from "sweetalert2";
import {useCookies} from "react-cookie";




const ConnectWallet = () => {

    const [account, setAccount] = useState(null);
    const [refreshToken, setRefreshToken, removeRefreshToken] = useCookies(['refreshToken']);
    const [accessToken, setAccessToken, removeAccessToken] = useCookies(['accessToken']);
    const navigate = useNavigate();

    function handleRemoveAT() {
        removeAccessToken("accessToken");
        removeRefreshToken("refreshToken");
    }

    return (
        <div id="hero">
            <h1 id="header-text-first" style={{marginBottom:100}}>Connect your wallet</h1>
            <h5 style={{marginTop:1}} id="header-subtext"></h5>
            <div className="search-wrapper">
                <button className="connect-wallet" onClick={ async() => {
                    if (window.ethereum) {
                        handleRemoveAT();
                        //  window.ethereum.request({
                        //     method: "eth_requestAccounts",
                        // })
                        await window.ethereum.enable()
                             .then((res) => {
                            setAccount(res[0]);
                            console.log(res[0]);
                             axios.post('/api/Auth/signup',
                                {
                                    walletAddress: res[0],
                                    walletType: "ETH",
                                    userName: "Undefined",
                                    userId: "Undefined",
                                })
                                .then((res) => {
                                    console.log(res.data);
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfully Login.',
                                        confirmButtonColor:'#16d016',
                                        background:'#1c1b24',
                                    }).then((result)=>{
                                        if(result.isConfirmed){
                                            window.location.replace('/explore');
                                        }
                                    });
                                }).catch(async(err) => {
                                    console.log(err);
                                })
                        });
                        // const walletAddress = accounts[0].toString();

                    } else {
                        alert('메타마스크를 설치해주세요!');
                        window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn');
                    }
                }}>
                    <div >
                        <img id="wallet-img" src={'https://opensea.io/static/images/logos/metamask-fox.svg'}  />
                        <p id="wallet-name">MetaMask</p>
                    </div>
                </button>
                <button className="connect-wallet" onClick={async() => {
                    if(window.klaytn) {
                        handleRemoveAT();
                         await window.klaytn.enable()
                             .then((res) => {
                            console.log(res[0]);
                            setAccount(res[0]);
                            axios.post('/api/Auth/signup',
                                {
                                    walletAddress: res[0],
                                    walletType: "KLAY",
                                    userName: "Undefined",
                                    userId: "Undefined",
                                })
                                .then((res) => {
                                    console.log(res.data);
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfully Login.',
                                        confirmButtonColor:'#16d016',
                                        background:'#1c1b24',
                                    }).then((result)=>{
                                        if(result.isConfirmed){
                                            window.location.replace('/explore');
                                        }
                                    });
                                }).catch(async(err) => {
                                    console.log(err);
                                })
                        });

                    } else {
                        alert('카이카스를 설치해주세요!');
                        window.open('https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=ko');
                    }

                }}>
                    <div >
                        <img id="wallet-img" src={kaikasImg}  />
                        <p id="wallet-name">Kaikas</p>
                    </div>
                </button>
                {/*<button className="wallet-phantom" >
                    <div >
                        <img id="wallet-img" src={'https://opensea.io/static/images/logos/phantom.svg'}  />
                        <p id="wallet-name">Phantom</p>
                    </div>
                </button>
                <button className="remove-cookie" onClick={handleRemoveAT}>
                    <div >
                        <p id="wallet-name">remove</p>
                    </div>
                </button>*/}
            </div>

            <h5 style={{marginTop:1}} id="header-subtext"></h5>
        </div>
    );
};

export default ConnectWallet;
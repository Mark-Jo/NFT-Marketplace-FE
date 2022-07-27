import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios';
import {useCookies} from "react-cookie";
import {AiFillQuestionCircle, AiOutlineVideoCamera} from "react-icons/ai";

axios.defaults.withCredentials = true;

const Header = () => {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["accessToken"]);
    const [walletAddress, setWalletAddress] = useState("");
    const [visible, setVisible] = useState(false);
      let kaikasCount=0;
    if(window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
            Swal.fire({
                icon: 'success',
                title: 'New Wallet Detected. Please Login with New Wallet',
                confirmButtonColor: '#16d016',
                background: '#1c1b24',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.assign('/wallet');
                }
            }).catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: '메타마스크를 설치해주세요!',
                    confirmButtonColor: '#16d016',
                    background: '#1c1b24',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.assign('/https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko');
                    }
                });
            });
        })
    } else {
        /*Swal.fire({
            icon: 'error',
            title: '메타마스크를 설치해주세요!',
            confirmButtonColor: '#16d016',
            background: '#1c1b24',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.assign('/https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko');
            }
        });*/

    }
    if(window.klaytn) {
        window.klaytn.on('accountsChanged', async function (accounts) {
            if (kaikasCount === 0) {
                kaikasCount = 1;
            } else if (kaikasCount === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'New Wallet Detected. Please Login with New Wallet',
                    confirmButtonColor: '#16d016',
                    background: '#1c1b24',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.assign('/wallet');
                    }
                }).catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: '카이카스를 설치해주세요!',
                        confirmButtonColor: '#16d016',
                        background: '#1c1b24',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.assign('https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=ko');
                        }
                    });
                });

            }
        });
    } else {
        /*Swal.fire({
            icon: 'error',
            title: '카이카스를 설치해주세요!',
            confirmButtonColor: '#16d016',
            background: '#1c1b24',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.assign('https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=ko');
            }
        });*/
    }
/*
    const isLogIn = async() => {
        if (cookies.accessToken !== undefined) {
            axios.get('/api/Auth/userInfo')
                .then(async (res) => {
                    // setWalletAddress(res.data.walletAddress);
                    await setVisible(true);
                    console.log(visible);
                })
                .catch((err) => {
                    console.log(err);
                    navigate('/wallet');
                });
        } else {
            navigate('/wallet');
        }
    }
    */
    useEffect( () => {
        async function fetchData(){
           /* if (cookies.accessToken) {*/
                console.log(cookies.accessToken);
                axios.get('/api/Auth/userInfo')
                    .then((res) => {
                        console.log(res.data);
                        setWalletAddress(res.data.walletAddress);
                        setVisible(true);
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
                    });
            /*} else {
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
            }*/
        }
        fetchData();
    }, []);

    console.log(visible);
    // location.reload();

    return (
        <div id="header">
            <Link to='/' id='logo'>MZC MARKET</Link>

            <div id="link-containers">

                <Link to='/explore' style={{textDecoration: 'none'}}>EXPLORE</Link>
                <Link to='/create' style={{textDecoration: 'none', display:visible ? "inline": "none"}}>CREATE</Link>
                <Link to='/my-page' style={{textDecoration: 'none', display:visible ? "inline": "none"}}>MY PAGE</Link>
                <Link to='/setting' style={{textDecoration: 'none', display:visible ? "inline": "none"}}>SETTING</Link>
                <button title={"Guide Docs"} style={{marginLeft:20,color:"white",background:"transparent",borderRadius:30,outline:0}} onClick={async () => {
                    window.open("https://docs.google.com/document/d/e/2PACX-1vQV93thF0LhDrHaZneA1sS-jfCKaodB2lXC9MY71QBg6vf1llq0Bl_Eu2H5VKq9lZALoDuCIfeOOIAc/pub",
                    'MZC Market Docs',,
                        'MZC Market Docs','width=1200,height=800,location=no,status=no,scrollbars=yes');
                }}><AiFillQuestionCircle style={{width:30,height:30}}/></button>
                <button title={"Demo Video"} style={{marginLeft:20,color:"white",background:"transparent",borderRadius:30,marginRight:-10,outline:0}}onClick={async () => {
                    window.open("https://nft-bucket-mzc.s3.ap-northeast-2.amazonaws.com/MZC%2BMarketplace.mp4",
                        'MZC Market Docs','width=1200,height=800,location=no,status=no,scrollbars=yes');
                }}><AiOutlineVideoCamera style={{width:30,height:30}}/></button>
                <button id="connect-wallet" onClick={async () => {
                    navigate('/wallet');
                }}>wallet</button>


            </div>
        </div>
    );
}

export default Header;

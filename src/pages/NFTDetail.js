import React, {useState, useEffect, createRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useLocation} from "react-router";
import Card from "../components/base/Card";
import "../styles/NFTDetail.css";
import {ColorExtractor} from "react-color-extractor";
import Button from "../components/base/Button";
import {useMobile} from "../hooks/isMobile";
import axios from "axios";
import Swal from "sweetalert2";
import Caver from 'caver-js';
import DataGrid from "../components/base/DataGrid";
import '../../node_modules/react-bootstrap/Table';
import {useCookies} from "react-cookie";
import Tr from '../components/base/Tr';
import {FaEthereum} from "react-icons/fa";

const contractAddress = '0x6484a351b58C65331787cFbFfC0a8C968F72F287';
const operator = '0xAb1108E0a9F5606852de667180a16D1F77C5653C';
const NFTDetail = () => {
    const isMobile = useMobile();
    const [colors, setColors] = useState([]);
    const [account, setAccount] = useState('');
    let {tokenId} = useParams();
    let {networkType} = useParams();
    const [nft, setNft] = useState([]);
    const [visible, setVisible] = useState("none");
    const [sell, setSell] = useState("none");
    const [buy, setBuy] = useState("none");
    const [cancel, setCancel] = useState("none");
    const [userName, setUserName] = useState("");
    const [walletType, setWalletType] = useState("");
    const [tokenHistory, setTokenHistory] = useState([]);
    const [cookies, setCookies] = useCookies(["accessToken"]);
    const [icon, setIcon] = useState("");
    const [info, setInfo] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        function fetchData() {
            // if (cookies.accessToken !== undefined) {
                axios.get('/api/Auth/userInfo')
                    .then((res) => {
                        setAccount(res.data.walletAddress);
                        setUserName(res.data.userName);
                        setWalletType(res.data.walletType);
                        if (networkType === 'ETH') {
                            axios.get('/api/NFT/Ethereum/dbdata?tokenId=' + tokenId)
                                .then(response => {
                                    // console.log("acc" + accounts);
                                    // console.log("network" + response.data.networkType);
                                    if (response.data.onSales === true) {
                                        if (response.data.salesTokenType === res.data.walletType && response.data.owner !== res.data.walletAddress) {
                                            setBuy("block");
                                            setVisible("block");
                                            setSell('none');
                                            setCancel('none');
                                        } else if (response.data.owner === res.data.walletAddress) {
                                            setBuy("none");
                                            setVisible("block");
                                            setSell('none');
                                            setCancel('block');
                                        } else {
                                            setBuy("none");
                                            setVisible("block");
                                            setSell('none');
                                            setCancel('none');
                                        }
                                    } else {
                                        setSell("block");
                                    }
                                    var tempDate = new Date(response.data.salesDueDate);
                                    response.data.salesDueDate = tempDate.toLocaleString('ko');
                                    setNft(response.data);
                                }).catch((err) => {
                                console.log("Detail page Err!:" + err)
                            });

                            axios.get('/api/NFT/Ethereum/tokenhistory?tokenId=' + tokenId)
                                .then((response) => {
                                    console.log(response.data);
                                    setTokenHistory(response.data);
                                }).catch((err) => {
                                console.log(err);
                            });
                        } else if (networkType === 'KLAY') {
                            axios.get('/api/NFT/Klaytn/dbdata?tokenId=' + tokenId)
                                .then(response => {
                                    if (response.data.onSales === true) {
                                        if (response.data.salesTokenType === res.data.walletType && response.data.owner !== res.data.walletAddress) {
                                            setBuy("block");
                                            setVisible("block");
                                            setSell('none');
                                            setCancel('none');
                                        } else if (response.data.salesTokenType === res.data.walletType && response.data.owner === res.data.walletAddress) {
                                            setBuy("none");
                                            setVisible("block");
                                            setSell('none');
                                            setCancel('block');
                                        } else {
                                            setBuy("none");
                                            setVisible("block");
                                            setSell('none');
                                            setCancel('none');
                                        }
                                    } else {
                                        setBuy("none");
                                        setVisible("none");
                                        setSell('block');
                                        setCancel('none');
                                    }
                                    var tempDate = new Date(response.data.salesDueDate);
                                    response.data.salesDueDate = tempDate.toLocaleString('ko');
                                    setNft(response.data);

                                    axios.get('/api/NFT/Klaytn/tokenhistory?tokenId=' + tokenId)
                                        .then((res) => {
                                            console.log(res.data);
                                            setTokenHistory(res.data);
                                        }).catch((err) => {
                                        console.log(err);
                                    })
                                    //console.log(response.data.onSales);
                                }).catch((err) => {
                                console.log("Detail page Err!:" + err)
                            });

                        }
                    })
                    .catch((err) => {
                        if (networkType === 'ETH') {
                            axios.get('/api/NFT/Ethereum/dbdata?tokenId=' + tokenId)
                                .then(response => {
                                    var tempDate = new Date(response.data.salesDueDate);
                                    response.data.salesDueDate = tempDate.toLocaleString('ko');
                                    setNft(response.data);
                                }).catch((err) => {
                                console.log("Detail page Err!:" + err)
                            });

                            axios.get('/api/NFT/Ethereum/tokenhistory?tokenId=' + tokenId)
                                .then((response) => {
                                    console.log(response.data);
                                    setTokenHistory(response.data);
                                }).catch((err) => {
                                console.log(err);
                            });
                        } else if (networkType === 'KLAY') {
                            axios.get('/api/NFT/Klaytn/dbdata?tokenId=' + tokenId)
                                .then(response => {
                                    var tempDate = new Date(response.data.salesDueDate);
                                    response.data.salesDueDate = tempDate.toLocaleString('ko');
                                    setNft(response.data);
                                    axios.get('/api/NFT/Klaytn/tokenhistory?tokenId=' + tokenId)
                                        .then((res) => {
                                            console.log(res.data);
                                            setTokenHistory(res.data);
                                        }).catch((err) => {
                                        console.log(err);
                                    })
                                    //console.log(response.data.onSales);
                                }).catch((err) => {
                                console.log("Detail page Err!:" + err);
                            });

                        }
                    });

        }

        fetchData();
    }, []);

    const getColors = (colors) => {
        setColors((c) => [...c, ...colors]);
    };
    const {state} = useLocation();

    useEffect(() => {
        setColors([]);
    }, [state]);

    const doBuy = async () => {
        let open=true;
        Swal.fire({
            title: 'Buying Process is Running',
            text: "Please wait for complete NFT Purchase",
            confirmButtonColor:'#16d016',
            background:'#1c1b24',
            color:'#ffffff',
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                clearInterval(open)
            }
        });
        if (networkType === 'ETH') {
            await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from:account,
                        to: nft.owner,
                        value: (nft.salesPrice * 10 ** 18).toString(16),
                        gas: Number(500000).toString(16),
                        /*gasPrice: (20 * 10 ** 9).toString(16),*/
                    },
                ],
            }).then(async(response) => {
                console.log(response);
                 await axios.post('/api/FT/Ethereum/txhashsave',
                    {
                        fromAddr: account,
                        toAddr: nft.owner,
                        txHash: response,
                        amount: nft.salesPrice,
                    }).then(async(response) => {
                     await axios.post('/api/NFT/Ethereum/transfer',
                        {
                            fromAddr: nft.owner,
                            toAddr: account,
                            tokenId: tokenId,
                            amount: 1,
                        }).then((response) => {
                            console.log(response.data);
                            open = false;
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfully Purchased.',
                                confirmButtonColor: '#16d016',
                                background: '#1c1b24',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate('/my-page');
                                }
                            });
                        }
                    ).catch((response) => {
                        console.log('Error!' + response)
                    });
                }).catch((response) => {
                    console.log('Error!' + response)
                });
            }).catch((response) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Buying NFT Failed.',
                    confirmButtonColor: '#16d016',
                    background: '#1c1b24',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/my-page');
                    }
                });
                console.log('Error!' + response)
            });

        } else if (networkType === 'KLAY') {
            const caver = new Caver(window.klaytn)
            await caver.klay.sendTransaction({
                type: 'VALUE_TRANSFER',
                from: account,
                to: nft.owner,
                value: caver.utils.toPeb(nft.salesPrice, 'KLAY'),
                gas: 80000000
            }).then(async (response) => {
                console.log(response);
                await axios.post('/api/FT/Klaytn/txhashsave',
                    {
                        fromAddr: account,
                        toAddr: nft.owner,
                        txHash: response.transactionHash,
                        amount: nft.salesPrice,
                    }).then(async(response) => {
                    await axios.post('/api/NFT/Klaytn/transfer',
                        {
                            fromAddr: nft.owner,
                            toAddr: account,
                            tokenId: tokenId,
                            amount: 1,
                        }).then((response) => {
                            console.log(response.data);
                            open = false;
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfully Purchased.',
                                confirmButtonColor: '#16d016',
                                background: '#1c1b24',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate('/my-page');
                                }
                            });
                        }
                    ).catch((response) => {
                        console.log('Error!' + response)
                    });
                }).catch((response) => {
                    console.log('Error!' + response)
                });

            }).catch((res) => {
                console.log('Error!'+ res);
            })

        }
    }

    const iconImage = () => {
        if (networkType === 'ETH') {
            return <FaEthereum style={{width: 23, height: 23, marginRight: 10}}/>
        } else {
            return <img src={'https://static.opensea.io/tokens/KLAY.png'}
                        style={{width: 25, height: 25, marginRight: 10, marginBottom: -3}}/>
        }
    }
    // console.log(Object.entries(tokenHistory));
    return (
        <div>
            {/*     <Header />*/}
            <div id="nft-detail-card-wrapper">
                <Card
                    width={isMobile ? "100%" : "65vw"}
                    height={isMobile ? "700px" : "60vh"}
                    blurColor={colors[0]}
                    child={
                        //Detail Content
                        <div id="detail-content">
                            {/*{isARSupport ? <model-viewer ar-scale="auto" ar ar-modes="webxr scene-viewer quick-look" id="arDetail" loading="eager" camera-controls auto-rotate src={state.item.src} > </model-viewer>*/}
                            : <> <ColorExtractor getColors={getColors}>
                            <img id="detail-image" src={nft.imgUrl}/>
                        </ColorExtractor></>

                            <div id="detail-info" style={{}}>
                                <div id='detail-info-container'>
                                    <p id="collection"> {nft.collectionName} </p>
                                    <p id="name"> {nft.name} </p>
                                    <p id="collection"
                                       style={{marginTop: 40, marginBottom: -30, color: "whitesmoke"}}> Owner: </p>
                                    <p id="description"> {nft.owner}  </p>
                                    <p id="collection" style={{
                                        display: visible,
                                        marginTop: 20,
                                        marginBottom: -30,
                                        color: "whitesmoke"
                                    }}> Sales End:</p>
                                    <p id="description" style={{display: visible}}> {nft.salesDueDate}</p>
                                    <p id="collection"
                                       style={{marginTop: 20, marginBottom: -30, color: "whitesmoke"}}> Description:</p>
                                    <p id="description"> {nft.description} </p>

                                </div>
                                <div id="detail-controls2" style={{display: sell}}>
                                    <Button
                                        width={isMobile ? "70%" : "70%"}
                                        height="50px"
                                        child={
                                            <div id="button-child">
                                                <p id="price">Sell</p>
                                            </div>
                                        }
                                        onClick={() => {
                                            navigate(`/sell/${networkType}/${tokenId}`,
                                            );
                                        }
                                        }
                                    ></Button>

                                </div>
                                <div id="detail-controls2" style={{display: cancel}}>
                                    <Button
                                        width={isMobile ? "70%" : "70%"}

                                        height="50px"
                                        child={
                                            <div id="button-child">
                                                <p id="price">Cancel Listing</p>
                                            </div>
                                        }
                                        onClick={async () => {
                                            if(networkType === 'ETH') {
                                                await axios.post('/api/NFT/Ethereum/withdraw',
                                                    {
                                                        tokenId: tokenId,
                                                    },
                                                    {
                                                        headers: {
                                                            'Content-type': 'application/json',
                                                            'Accept': 'application/json'
                                                        }
                                                    }).then((response) => {

                                                    }
                                                ).catch((response) => {
                                                    console.log('Error!' + response)
                                                });
                                            } else {
                                                await axios.post('/api/NFT/Klaytn/withdraw',
                                                    {
                                                        tokenId: tokenId,
                                                    },
                                                    {
                                                        headers: {
                                                            'Content-type': 'application/json',
                                                            'Accept': 'application/json'
                                                        }
                                                    }).then((response) => {

                                                    }
                                                ).catch((response) => {
                                                    console.log('Error!' + response)
                                                });
                                            }

                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Successfully Listing Canceled.',
                                                confirmButtonColor: '#16d016',
                                                background: '#1c1b24',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    navigate('/my-page');
                                                }
                                            });

                                        }}></Button>

                                </div>
                                <div id="detail-controls01" style={{display: buy}}>
                                    <Button
                                        width={isMobile ? "70%" : "70%"}
                                        height="50px"
                                        child={
                                            <div id="button-child">
                                                {/*<img src={'https://static.opensea.io/tokens/KLAY.png'} style={{width:30,height:30,marginRight:10,marginBottom:0}}/>*/}
                                                {/*<img src={iconImage()} style={{width:30,height:30,marginRight:10,marginBottom:0}}/>*/}
                                                {/*<FaEthereum size="28px"/>*/}
                                                <p className="price-icon">{iconImage()}</p>
                                                <p id="price">{nft.salesPrice}</p>

                                            </div>
                                        }
                                        onClick={doBuy}
                                    ></Button>
                                </div>
                            </div>

                        </div>
                    }
                    history={
                        <div id="history-table" style={{}}>
                            {tokenHistory.map((item) => (
                                <DataGrid
                                    key={`${item.tokenId}`}
                                    event={`${item.event}`}
                                    price={`${item.amount}`}
                                    to={`${item.toAddr}`}
                                    from={`${item.fromAddr}`}
                                    date={`${item.createdAt}`}
                                >
                                </DataGrid>
                            ))}
                        </div>
                        /*<div>
                            <table className="tokenhistory-table">
                                <thead className="tokenhistory-thead">
                                <tr className="tokenhistory-tr">
                                    <th className="thead-text">Event</th>
                                    <th className="thead-text">Price</th>
                                    <th className="thead-text">From</th>
                                    <th className="thead-text">To</th>
                                    <th className="thead-text">Date</th>
                                </tr>
                                </thead>
                                <Tr Info={info} />
                            </table>
                        </div>*/
                    }

                />

            </div>

        </div>
    );
};

export default NFTDetail;

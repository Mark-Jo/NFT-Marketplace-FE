import React, { useState, useEffect } from "react";
import "../styles/List.css";
import {useNavigate, useParams} from "react-router-dom";
import { ko} from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import axios from "axios";
import ImageBox from "./base/ImageBox";
import Caver from 'caver-js'
import Swal from "sweetalert2";
import {useLocation} from "react-router";
import {useCookies} from "react-cookie";
import Web3 from "web3";
import ethABI  from '../../src/assets/abi/ethABI.json';


const kovanNetwork = 'https://kovan.infura.io/v3/e96fe621da8c4861a7985933e5312970';
const klayContractAddress = '0x6484a351b58C65331787cFbFfC0a8C968F72F287';
const klayOperator = '0xAb1108E0a9F5606852de667180a16D1F77C5653C';
const ethContractAddress = '0xC83393fCf17a5575cD9D8702493536aaE803916D';
const ethOperator = '0x6a2db060C153F3d11A4EBB855CEA4a00f32b5a56';

const List = ({route}) => {
    // const [userName, setUserName] = useState("");
    const [account, setAccount] = useState(null);
    const [walletType, setWalletType] = useState("");
    // const [networkType, setNetworkType] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    // const userName = location.state.userName;
    const { tokenId } = useParams();
    const { networkType } = useParams();
    const [cookies, setCookies] = useCookies(["accessToken"]);

    useEffect(()=>{
        if (networkType === 'ETH'){
            axios.get( '/api/NFT/Ethereum/dbdata?tokenId='+tokenId,
                { headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
                }).then((response) => {
                    //console.log(response.data);
                    setImgUrl(response.data.imgUrl);
                    setCollection(response.data.collectionName);
                    setName(response.data.name);
                }
            ).catch((response) => {console.log('Error!'+response) });
        } else if (networkType === 'KLAY') {
            axios.get( '/api/NFT/Klaytn/dbdata?tokenId='+tokenId,
                { headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
                }).then((response) => {
                    //console.log(response.data);
                    setImgUrl(response.data.imgUrl);
                    setCollection(response.data.collectionName);
                    setName(response.data.name);
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

    console.log(networkType);

    const Listing = async () => {
        if (networkType === 'ETH'){
            let open=true;
            let denied=false;
            const accounts=await window.ethereum.request({ method: 'eth_requestAccounts' });
            const from=accounts[0];
            const web3=new Web3(window.ethereum);

            const nftContract=new web3.eth.Contract(ethABI.abi,ethContractAddress);
            const approved=await nftContract.methods.isApprovedForAll(from,ethOperator).call((err, result) => { console.log(result) });

            if(approved === false) {
                Swal.fire({
                    title: 'Approval for \nMZC MARKET operation',
                    text: "Transaction fee is only charged once at initial listing",
                    confirmButtonColor:'#16d016',
                    background:'#1c1b24',
                    color:'#ffffff',
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    willClose: () => {
                        clearInterval(open)
                    }
                })
                const data = web3.eth.abi.encodeFunctionCall(
                    {
                        "constant": false,
                        "inputs": [
                            {
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "name": "approved",
                                "type": "bool"
                            }
                        ],
                        "name": "setApprovalForAll",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    [ethOperator, true]
                )

                const txdata = {
                    // from:window.klaytn.selectedAddress,
                    from: account,
                    to: ethContractAddress,
                    gas: 80000,
                    data,
                };
                const signed = await web3.eth.sendTransaction(txdata).catch((err)=>{open=false;denied=true;});
                console.log(signed);
                open=false;

            }
            if(denied===false){
                await axios.put( '/api/NFT/Ethereum/list?tokenId='+tokenId,
                    {
                        salesStartAt:startDate,
                        salesDueDate:endDate,
                        salesTokenType:"ETH",
                        salesPrice:price,
                    },
                    { headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
                    }).then((response) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully Listed.',
                            confirmButtonColor:'#16d016',
                            background:'#1c1b24',
                        }).then((result)=>{
                            if(result.isConfirmed){
                                navigate('/explore')
                            }
                        });
                    }
                ).catch((response) => {console.log('Error!'+response) });
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Listing Failed.',
                    confirmButtonColor:'#16d016',
                    background:'#1c1b24',
                }).then((result)=>{
                    if(result.isConfirmed){
                        navigate('/my-page');
                    }
                });
            }
        } else if (networkType === 'KLAY'){
            const from=await window.klaytn.selectedAddress;
            const caver = new Caver(window.klaytn);
            const kip17 = new caver.kct.kip17(klayContractAddress);
            // for approve test(true to false)
            /*const data = caver.klay.abi.encodeFunctionCall(
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "name": "approved",
                            "type": "bool"
                        }
                    ],
                    "name": "setApprovalForAll",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                [klayOperator, false]
            )

            const txdata = {
                from:window.klaytn.selectedAddress,
                // from: account,
                to: klayContractAddress,
                gas: 80000,
                data,
            }


            const signed = await caver.klay.sendTransaction(txdata).catch((err)=>{open=false;denied=true;});*/
            const Approved=await kip17.isApprovedForAll(from,klayOperator);



            let open=true;
            let denied=false;

            if(Approved===false){
                Swal.fire({
                    title: 'Approval for \nMZC MARKET operation',
                    text: "Transaction fee is only charged once at initial listing",
                    confirmButtonColor:'#16d016',
                    background:'#1c1b24',
                    color:'#ffffff',
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    willClose: () => {
                        clearInterval(open)
                    }
                })

                const data = caver.klay.abi.encodeFunctionCall(
                    {
                        "constant": false,
                        "inputs": [
                            {
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "name": "approved",
                                "type": "bool"
                            }
                        ],
                        "name": "setApprovalForAll",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    [klayOperator, true]
                )

                const txdata = {
                    from:window.klaytn.selectedAddress,
                    // from: account,
                    to: klayContractAddress,
                    gas: 80000,
                    data,
                }


                const signed = await caver.klay.sendTransaction(txdata).catch((err)=>{open=false;denied=true;});
                console.log(signed);
                open=false;
            }
            if(denied===false){
                await axios.put( '/api/NFT/Klaytn/list?tokenId='+tokenId,
                    {
                        salesStartAt:startDate,
                        salesDueDate:endDate,
                        salesTokenType:"KLAY",
                        salesPrice:price,
                    },
                    { headers: { 'Content-type': 'application/json', 'Accept': 'application/json' }
                    }).then((response) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully Listed.',
                            confirmButtonColor:'#16d016',
                            background:'#1c1b24',
                        }).then((result)=>{
                            if(result.isConfirmed){
                                navigate('/explore')
                            }
                        });
                    }
                ).catch((response) => {console.log('Error!'+response) });
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Listing Failed.',
                    confirmButtonColor:'#16d016',
                    background:'#1c1b24',
                }).then((result)=>{
                    if(result.isConfirmed){
                        console.log('/my-page');
                        navigate('/my-page');
                    }
                });
            }
        }
    };
    const [net, setNet] = React.useState('');
    const [imgUrl, setImgUrl] = React.useState('');
    const [name, setName] = React.useState('');
    const [collectionName, setCollection] = React.useState('');
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState()
    const [price, setPrice] = React.useState('');


    return (
        <div id="hero">
            {/* <img id='hero-background' src={list[0].src}/> */}

            {/*   <Header />*/}

            <h1 id="header-text-first"> Sell My NFT </h1>

            <h5 id="header-subtext"> {name} / #{collectionName}</h5>
            <ImageBox name={name} collectionName={collectionName} src={imgUrl}/>
            <DateRangePicker
                id={'nice-dates-popover'}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                minimumDate={new Date()}
                minimumLength={1}
                format='yyyy년 MMM dd일 '
                locale={ko}

            >
                {({ startDateInputProps, endDateInputProps, focus }) => (

                    <div className='search-wrapper2'>
                        <div
                            className="search-container"
                            style={{
                                background: `radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.05) 0%,
                    rgba(48,118,234,0.2) 0%,
                    rgba(255, 255, 255, 0.05) 70%
                )`,
                            }}
                        >
                            <input
                                id="search"
                                className={'input' + (focus === START_DATE ? ' -focused' : '')}
                                {...startDateInputProps}
                                placeholder='Start date'

                            /></div>
                        <br/>
                        <div
                            className="search-container"
                            style={{
                                background: `radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.05) 0%,
                    rgba(48,118,234,0.2) 0%,
                    rgba(255, 255, 255, 0.05) 70%
                )`,
                            }}
                        >
                            <input
                                id={"search"}
                                className={'input' + (focus === END_DATE ? ' -focused' : '')}
                                {...endDateInputProps}
                                placeholder='End date'
                            />
                        </div></div>
                )}
            </DateRangePicker>
            <div style={{marginTop:17}} className="search-wrapper">
                <div
                    className="search-container"
                    style={{
                        background: `radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.05) 0%,
                    rgba(48,118,234,0.2) 0%,
                    rgba(255, 255, 255, 0.05) 70%
                )`,
                    }}
                >
                    <input id="search" label={"URL"}placeholder={'NFT Price'} type={'type'} name={'name'} onChange={(e)=>{
                        setPrice(e.target.value);
                    }}/>
                </div>
            </div>
            <div id="hero-buttons">
                <button id="explore" onClick={Listing}>
                    Complete
                </button>

            </div>

        </div>

    );
};

export default List;

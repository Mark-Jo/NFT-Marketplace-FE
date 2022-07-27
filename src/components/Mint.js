import React, { useState, useEffect } from "react";
import "../styles/Mint.css";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import uploadIcon from '../assets/upload-icon.png'
import {useCookies} from "react-cookie";


const Mint = () => {
    // const walletAddress = useParams().walletAddress;
    // console.log(walletAddress);
    const [collection, setCollection] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [name, setName] = useState("");
    const [url, setUrl] = useState(uploadIcon);
    // const [url2, setUrl2] = useState('');
    const [desc, setDesc] = useState("");
    const [selectedFile,setSelectedFile]=useState("");
    const [walletType, setWalletType] = useState("");
    const [cookies, setCookies] = useCookies(["accessToken"]);
    const navigate = useNavigate();


    const handleFileOnChange =  async (event) => {
        event.preventDefault();
        let reader = new FileReader();
        setSelectedFile(event.target.files[0]);
        const file = event.target.files[0];
        reader.onloadend = () => {

            setUrl(reader.result.toString());
        }
        reader.readAsDataURL(file);
    };
    const convertToBase64 = (file) => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
        })
    }

    useEffect((res) => {
        if (cookies.accessToken !== undefined) {
             axios.get('/api/Auth/userInfo')
                .then(async(res) => {
                    setWalletAddress(res.data.walletAddress);
                    await axios.get('/api/Auth/isSignedUp?walletAddress=' + res.data.walletAddress)
                        .then((res) => {
                            setWalletType(res.data.walletType);
                        });
                });
        } else {
            navigate('/wallet');
        }
    }, []);

    console.log(walletType);
    console.log(walletAddress);
   /* const upload= async ()=>{

        const formData=new FormData();
        formData.append('file',selectedFile);
        await axios.post("/api/metadata/upload", formData).then(res => {
            //alert(res.data);
            console.log(res.data);
            setUrl2(res.data.toString());
            //alert('성공')
        }).catch(err => {
            alert('데이터 업로드 실패')
        })
    }*/


    return (
        <div id="hero">
            <h1 id="header-text-first" style={{marginBottom:100}}> Create My NFT </h1>
            {/*<ImageBox src={url} />*/}

            {/*<button onClick={upload}>업로드</button>//for upload test*/}
            <label  role={'button'} style={{cursor:'pointer',textAlign:"center",alignItems:'center',display:"inline-block"}} id="image-box-outside">
                <input type='file'
                       accept='image/jpg,impge/png,image/jpeg,image/gif,image/*'
                       name='profile_img'
                       style={{display:'none'}}
                       onChange={handleFileOnChange}>
                </input>
                {{url}&&<img  style={{minHeight:490}} src={url}id="image-box"/> }

            </label>

            <h5 style={{marginTop:1}} id="header-subtext"></h5>
            <div className="search-wrapper">
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
                    <input id="search" placeholder={'NFT Collection Name'} type={'type'} name={'name'} onChange={(e)=>{
                        setCollection(e.target.value);
                    }}/>
                </div>
            </div>

            <h5 style={{marginTop:1}} id="header-subtext"></h5>
            <div className="search-wrapper">
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
                    <input id="search" placeholder={"NFT Name"} type={'type'} name={'name'} onChange={(e)=>{
                        setName(e.target.value);
                    }}/>
                </div>
            </div>

            <h5 style={{marginTop:1}} id="header-subtext"></h5>
            <div style={{}} className="search-wrapper">
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
                    <input id="search" placeholder={'Description'} type={'type'} name={'name'} onChange={(e)=>{
                        setDesc(e.target.value);
                    }}/>
                </div>
            </div>


            <div id="hero-buttons">
                <button style={{marginTop:-20,marginBottom:40}} id="explore" onClick={async()=>{
                    let open=true;
                    Swal.fire({
                        title: 'Minting Proceeding',
                        text: "Please wait for complete NFT Minting",
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
                    const formData=new FormData();
                    formData.append('file',selectedFile);
                    let imgUrl=null;
                    await axios.post("/api/metadata/upload", formData).then(res => {
                        //alert(res.data);
                        console.log(res.data);
                        imgUrl=res.data;
                        //alert('성공')
                    }).catch(err => {
                        alert('데이터 업로드 실패')
                    });

                    if(walletType === 'KLAY') {
                        await axios.post( '/api/NFT/Klaytn/mint',
                            {
                                collectionName: collection,
                                name:name,
                                imgUrl,
                                owner:walletAddress,
                                description:desc
                            }).then((response) => {
                                console.log(response.data);
                                open = false;
                                Swal.fire({
                                    icon: 'success',
                                    imageUrl:url,
                                    title: 'Successfully minted.',
                                    confirmButtonColor:'#16d016',
                                    background:'#1c1b24',
                                }).then((result)=>{
                                    if(result.isConfirmed){
                                        navigate('/my-page');
                                    }

                                });
                            }
                        ).catch((err) => {
                            console.log('Error!'+err)
                            Swal.fire({
                                icon: 'warning',
                                imageUrl:url,
                                title: 'Fail Minting',
                                confirmButtonColor:'#16d016',
                                background:'#1c1b24',
                            }).then((result)=>{
                                if(result.isConfirmed){
                                    navigate('/my-page');
                                }

                            });
                        });
                    } else if (walletType === 'ETH') {
                        await axios.post( '/api/NFT/Ethereum/mint',
                            {
                                collectionName: collection,
                                name:name,
                                imgUrl,
                                owner:walletAddress,
                                description:desc
                            }).then((response) => {
                                console.log(response.data);
                                open = false;
                                Swal.fire({
                                    icon: 'success',
                                    imageUrl:url,
                                    title: 'Successfully minted.',
                                    confirmButtonColor:'#16d016',
                                    background:'#1c1b24',
                                }).then((result)=>{
                                    if(result.isConfirmed){
                                        navigate('/my-page');
                                    }

                                });
                            }
                        ).catch((err) => {
                            console.log('Error!'+err)
                            Swal.fire({
                                icon: 'warning',
                                imageUrl:url,
                                title: 'Fail Minting',
                                confirmButtonColor:'#16d016',
                                background:'#1c1b24',
                            }).then((result)=>{
                                if(result.isConfirmed){
                                    navigate('/my-page');
                                }

                            });
                        });
                    }
                    }}>
                    Complete
                </button>
            </div>
        </div>
    );
};

export default Mint;

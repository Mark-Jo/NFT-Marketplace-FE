import React, {useState, useEffect} from "react";
import "../styles/Mint.css";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
axios.defaults.withCredentials = true;

const Setting = () => {

    const [cookies, setCookies] = useCookies(["accessToken"]);
    const [walletAddress, setWalletAddress] = useState("");

    // Email, Name
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");

    // new Email, Name
    const [newUserId, setNewUserId] = useState("");
    const [newUserName, setNewUserName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.accessToken !== undefined) {
            axios.get('/api/Auth/userInfo')
                .then((res) => {
                    console.log(res.data);
                    setWalletAddress(res.data.walletAddress);
                    axios.get('/api/Auth/isSignedUp?walletAddress=' + res.data.walletAddress)
                        .then((res) => {
                            console.log(res.data);
                            setUserName(res.data.userName);
                            setUserId(res.data.userId);
                        })
                });
        } else {
            navigate('/wallet');
        }

    }, []);


    return (
        <div id="hero">
            <h1 id="header-text-first" style={{marginBottom: 100}}>Setting</h1>
            <h5 style={{marginTop: 1}} id="header-subtext"></h5>
            <div className="search-wrapper">
                <div className="input-name">E-Mail</div>
                <div className="search-container">
                    <input
                        id="search"
                        placeholder={userId}
                        type={'text'}
                        name={'userId'}
                        // onKeyUp={ActiveIsPassed}
                        onChange={(e) => {
                            setNewUserId(e.target.value);

                        }}/>
                </div>
            </div>


            <h5 style={{marginTop: 1}} id="header-subtext"></h5>
            <div className="search-wrapper">
                <div className="input-name">Wallet Address</div>
                <div className="search-container">
                    <input
                        id="wallet-address"
                        value={walletAddress}
                        type={'text'}
                        name={'walletAddress'}
                        readOnly={true}
                        />
                </div>
            </div>
            <div className="validation">
                <h5 style={{marginTop: 10}}
                    id="validation-text"
                    className={'success'}
                ></h5>
            </div>

            <h5 style={{marginTop: 1}} id="header-subtext"></h5>
            <div className="search-wrapper">
                <div className="input-name">User Name</div>
                <div className="search-container">
                    <input
                        id="search"
                        placeholder={userName}
                        type={'text'}
                        name={'userName'}
                        // onKeyUp={ActiveIsPassed}
                        onChange={(e) => {
                            setNewUserName(e.target.value);
                        }}/>
                </div>
            </div>

            <h5 style={{marginTop: 1}} id="header-subtext"></h5>
            <div id="hero-buttons">
                <button
                    style={{marginTop: -20, marginBottom: 40}}
                    id="signup"
                    // className={active ? 'activeSignUpBtn' : 'SignUpBtn'}
                    className="activeSignUpBtn"
                    // disabled={!active}
                    onClick={ async() => {
                        await axios.put('/api/Auth/updateUserInfo?walletAddress=' + walletAddress,
                            {
                                userId: newUserId,
                                userName: newUserName,
                            }
                            // {headers: {'Content-type': 'application/json', 'Accept': 'application/json'}}
                        ).then((response) => {
                                console.log(response.data);
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Successfully Saved.',
                                    confirmButtonColor: '#16d016',
                                    background: '#1c1b24',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        navigate('/explore');
                                    }
                                });
                            }
                        ).catch((err) => {
                            console.log('Error!' + err);
                            Swal.fire({
                                icon: 'error',
                                title: err.response,
                                confirmButtonColor: '#16d016',
                                background: '#1c1b24',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate('/connect');
                                }
                            });
                        });
                    }}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default Setting;
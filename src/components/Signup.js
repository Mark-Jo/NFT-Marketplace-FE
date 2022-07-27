import React, {useState, useEffect} from "react";
import "../styles/Mint.css";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router-dom";


const Signup = () => {


    // 버튼 활성화
    const [active, setActive] = useState(false);

    // Email, PW, Name
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userPw, setUserPw] = useState("");
    // const [walletAddress, setWalletAddress] = useState("");


    // 오류메세지 상태저장
    const [idMessage, setIdMessage] = useState('');
    const [nameMessage, setNameMessage] = useState('');

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isName, setIsName] = useState(false);

    // 유효성 조건
    const isValidEmail = userId.includes('@') && userId.includes('.') && userId.length > 8;
    const isValidUserName = userName.length > 3 && userName.length < 20;

    // 버튼 활성화
    const ActiveIsPassed = () => {
        return isId && isName
            ? setActive(true) : setActive(false);
    };

    // console.log(window.klaytn.selectedAddress);
    // const walletAddress = window.klaytn.selectedAddress;
    // console.log(walletAddress);

    const navigate = useNavigate();


    return (
        <div id="hero">
            <h1 id="header-text-first" style={{marginBottom: 100}}> Sign Up</h1>
            <h5 style={{marginTop: 1}} id="header-subtext"></h5>
            <div className="search-wrapper">
                <div className="search-container">
                    <input
                        id="search"
                        placeholder={'E-mail'}
                        type={'text'}
                        name={'userId'}
                        onKeyUp={ActiveIsPassed}
                        onChange={(e) => {
                            setUserId(e.target.value);
                            if (!isValidEmail) {
                                setIdMessage('이메일 형식을 체크해 주세요.');
                                setIsId(false);
                            } else {
                                setIdMessage('올바른 이메일 형식입니다.');
                                setIsId(true);
                            }
                        }}/>
                </div>
            </div>
            <div className="validation">
                <h5
                    style={{marginTop: 10}}
                    id="validation-text"
                    className={`${isId ? 'success' : 'error'}`}
                >{idMessage}</h5>
            </div>

            <h5 style={{marginTop: 1}} id="header-subtext"></h5>
            <div className="search-wrapper">
                <div className="search-container">
                    {/*<input*/}
                    {/*    id="search"*/}
                    {/*    value={walletAddress}*/}
                    {/*    type={'text'}*/}
                    {/*    name={'walletAddress'}*/}
                    {/*    readOnly={true}*/}
                    {/*    />*/}
                    <input
                        id="search"
                        placeholder={'Password'}
                        type={'password'}
                        name={'passWord'}
                        onKeyUp={ActiveIsPassed}
                        onChange={(e) => {
                            setUserPw(e.target.value);
                        }}/>
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
                <div className="search-container">
                    <input
                        id="search"
                        placeholder={"Nickname"}
                        type={'text'}
                        name={'userName'}
                        onKeyUp={ActiveIsPassed}
                        onChange={(e) => {
                            setUserName(e.target.value);
                            if (!isValidUserName) {
                                setNameMessage('닉네임은 4자리 이상 10자리 이하입니다.');
                                setIsName(false);
                            } else {
                                setNameMessage('올바른 이름 형식입니다.');
                                setIsName(true);
                            }
                        }}/>
                </div>
            </div>
            <div className="validation">
                <h5 style={{marginTop: 10}}
                    id="validation-text"
                    className={`${isName ? 'success' : 'error'}`}
                >{nameMessage}</h5>
            </div>

            <h5 style={{marginTop: 1}} id="header-subtext"></h5>
            <div id="hero-buttons">
                <button
                    style={{marginTop: -20, marginBottom: 40}}
                    id="signup"
                    className={active ? 'activeSignUpBtn' : 'SignUpBtn'}
                    disabled={!active}
                    onClick={async() => {
                        await axios.post('api/Auth/signup',
                            {
                                userId: userId,
                                userName: userName,
                                userPw: userPw,
                            },
                            {
                                headers: {'Content-type': 'application/json', 'Accept': 'application/json'}
                            }).then((response) => {
                                console.log(response.data);
                                // const {accessToken} = response.data;
                                // axios.defaults.headers.common['authorization'] = accessToken;
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Successfully Sign Up.',
                                    confirmButtonColor: '#16d016',
                                    background: '#1c1b24',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        navigate('/login');
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
                                    navigate('/signup');
                                }
                            });
                        });
                    }}>
                    Complete
                </button>
            </div>
        </div>
    );
};

export default Signup;
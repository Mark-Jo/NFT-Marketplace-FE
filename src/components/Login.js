import React, { useState, useEffect } from "react";
import "../styles/Mint.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Cookies } from 'react-cookie';
axios.defaults.withCredentials = true;
const cookies = new Cookies();


const setRefreshToken = (accessToken) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 7);

    return cookies.set('accessToken', accessToken, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(expireDate),
    })
}

const getCookieToken = () => {
    return cookies.get('accessToken');
}

const removeCookieToken = () => {
    return cookies.remove('refresh_token', { sameSite: 'strict', path: '/' })
}

const Login = () => {
    const navigate = useNavigate();

    // 버튼 활성화
    const [active, setActive] = useState(false);

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);

    const ActiveIsPassed = () => {
        return isId && isPw
            ? setActive(true) : setActive(false);
    };


    return (
        <div id="hero">
            <h1 id="header-text-first" style={{marginBottom:100}}>Login</h1>
            <h5 style={{marginTop:1}} id="header-subtext"></h5>
            <div className="search-wrapper">
                <div className="search-container">
                    <input
                        id="search"
                        placeholder={'E-mail'}
                        type={'text'}
                        name={'userId'}
                        onKeyUp={ActiveIsPassed}
                        onChange={(e)=>{
                            setId(e.target.value);
                            if (id != null) {
                                setIsId(true);
                            } else {
                                setIsId(false);
                            }
                        }}/>
                </div>
            </div>

            <h5 style={{marginTop:1}} id="header-subtext"></h5>
            <div className="search-wrapper">
                <div className="search-container">
                    <input
                        id="search"
                        placeholder={'Password'}
                        type={'password'}
                        name={'userPw'}
                        onKeyUp={ActiveIsPassed}
                        onChange={(e)=>{
                            setPw(e.target.value);
                            if (pw != null) {
                                setIsPw(true);
                            } else {
                                setIsPw(false);
                            }
                        }}/>
                </div>
            </div>

            <h5 style={{marginTop:1}} id="header-subtext"></h5>
            <div id="hero-buttons">
                <button
                    style={{marginTop:-20,marginBottom:40}}
                    id="signup"
                    className={active? 'activeSignUpBtn' : 'SignUpBtn'}
                    disabled={!active}
                    onClick={() => {
                         axios.post('/api/Auth/login',
                            {
                                userId: id,
                                userPw: pw,
                            },
                            { headers: { 'Content-type': 'application/json', 'Accept': 'application/json'}
                            }).then((response) => {
                            console.log(response.data);
                            setName(response.data.name);
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfully Login.',
                                confirmButtonColor:'#16d016',
                                background:'#1c1b24',
                            }).then((result) => {
                                if(result.isConfirmed){
                                    navigate(`/my-page/${response.data.name}`);

                                }
                            })
                        })
                    }
                    }
                >
                    Login
                </button>
                <button
                    style={{marginTop:-20,marginBottom:40, marginLeft:50}}
                    id="signup"
                    className={'activeSignUpBtn'}
                    onClick={() => {
                        navigate('/signup');
                    }}
                >
                    Sign Up</button>
            </div>
        </div>
    );
};

export default Login;
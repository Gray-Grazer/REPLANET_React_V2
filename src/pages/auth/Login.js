import React, { useState, useRef, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AuthContext from "../../component/auth/AuthContext";
import '../../assets/css/user.css';
import Swal from "sweetalert2";
//import { KakaoLoginAPI } from "../../apis/KaKaoLoginAPI";

const Login = () => {
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);

    const submitHandler = event => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);
        authCtx.login(enteredEmail, enteredPassword, navigate);
        setIsLoading(false);

    }

    const handleKeyPress = (e) => {
        if(e.key == 'Enter'){
            submitHandler(e);
        }
    }

    const KakaoLoginHandler = () => {

        console.log("반갑다 나 카카오다.");

        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&scope=account_email&prompt=login`;

        window.location.href = KAKAO_AUTH_URL;

    }




    function toSignup(e) { window.location.href = "/signup" };
    function toFind(e) { window.location.href = "/find" };

    return (

        <div className="container-first container-centered">
            <style>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
            </style>
            <h2>로그인이 필요한 서비스입니다.</h2>
            <div id="container-user">
                <div className="items-container ic1">
                    <div className="tabs pb-2">
                        <div className="tab_item ti2 active">일반 로그인</div>
                        <div className="tab_item ti2" onClick={KakaoLoginHandler}><i className="fa-solid fa-comment"></i> kakao 로그인</div>
                    </div>
                    <div className="">

                        <div className="items-container ic1">

                                <input className="input" type="email" id="email" ref={emailInputRef} placeholder="이메일 주소를 입력해 주세요." required />
                                <input className="input"
                                    type="password"
                                    id="password"
                                    ref={passwordInputRef}
                                    placeholder="비밀번호를 입력해 주세요."
                                    required
                                    onKeyPress={handleKeyPress}
                                />

                            <button className="button button-primary" onClick={submitHandler}>로그인</button>
                            {isLoading && <p>Loading</p>}
                            <button className="button button-primary-outline" onClick={toSignup}>회원가입</button>
                        </div>

                        <div className="items-container ic2 text-center pt-2">
                            {/*<div className="login-option" style={{cursor:'pointer'}} onClick={KakaoLoginHandler}>Kakao로 가입하기</div>*/}
                            <NavLink to="/findId" className="login-option">계정 찾기</NavLink>
                            <NavLink to="/findpw" className="login-option">비밀번호 찾기</NavLink>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}


export default Login;

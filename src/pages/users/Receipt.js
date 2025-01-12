import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/userexchange.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getPrivacyStatusAPI, provideInfoAPI } from "../../apis/PointAPI";
import { decodeJwt } from "../../utils/TokenUtils";


function DonationReceipt(){

    const token = window.localStorage.getItem('token');
    // console.log("토큰 확인 : ", decodeJwt(token));
    const memberCode = decodeJwt(token)?.memberCode || 0;
    const memberName = decodeJwt(token)?.memberName || "";
    // console.log("기부금영수증 멤버코드 확인 : ", memberCode);
    // console.log("이름 확인 : ", memberName);

    const privacyStatus = useSelector(state => state.modalReducer);
    console.log("privacyStatus 확인 : ", privacyStatus);

    useEffect(
        () => {
            dispatch(getPrivacyStatusAPI(memberCode))
        },[]
    )

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [front, setFront] = useState('');
    const [last, setLast] = useState('');
    const [check, setCheck] = useState(false);
    const [nameMsg, setNameMsg] = useState("");
    const [privacyMsg, setPrivacyMsg] = useState("");
    const handleName = (e) => {
        const inputValue = e.target.value;
        const isValidInput = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(inputValue);
        if(isValidInput && inputValue.length <= 10) {
            setName(inputValue);
        } else {
            setName(prevState => prevState.slice(0, -1));
            setNameMsg("이름을 10자 이하의 한글로 입력해 주세요.");
        }
    }
    const handleFrontChange = (e) => {
        const inputValue = e.target.value;
        const isValidInput = /^\d+$/.test(inputValue);
        if (isValidInput && inputValue.length <= 6) {
            setFront(inputValue);
        } else {
            setFront(prevState => prevState.slice(0, -1));
            setPrivacyMsg("주민등록번호를 숫자로 입력해 주세요.");
        }
    };
    const handleLastChange = (e) => {
        const inputValue = e.target.value;
        const isValidInput = /^\d+$/.test(inputValue);
        if (isValidInput && inputValue.length <= 7) {
            setLast(inputValue);
        } else {
            setLast(prevState => prevState.slice(0, -1));
            setPrivacyMsg("주민등록번호를 숫자로 입력해 주세요.");
        }
    };
    const checkBox = () => {
        setCheck(!check);
    }
    const infoAgreement = (value) => {
        if(value == '동의'){
            console.log("적힌 이름 확인 : ", name);
            if(name == null || name == "" || name.length > 10){
                Swal.fire({
                    icon: "warning",
                    iconColor: '#1D7151',
                    title: "이름을 올바르게 입력해주세요.",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            } else if(name != memberName){
                Swal.fire({
                    icon: "warning",
                    iconColor: '#1D7151',
                    title: "이름이 일치하지 않습니다.",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            } else if(front?.length != 6 || last?.length != 7 || front == null || last == null){
                Swal.fire({
                    icon: "warning",
                    iconColor: '#1D7151',
                    title: "주민등록번호를 입력해주세요.",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            } else if(!check){
                Swal.fire({
                    icon: "warning",
                    iconColor: '#1D7151',
                    title: "정보 제공에 동의하셔야 등록하실 수 있습니다.",
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            } else {
                const body = {
                    memberCode : memberCode,
                    check : check ? 'Y' : 'N',
                    idNumber : front + last
                };
                dispatch(provideInfoAPI({
                    body: body
                }));
            }
        } else if(value == '철회'){
            const body = {
                memberCode : memberCode,
                check : 'N'
            };
            dispatch(provideInfoAPI({
                body: body
            }));
        }
    }

    return(

        <div className="mypage-main">
            <h1 className="text-primary">기부금 영수증 안내</h1>
            <br/>
            <div className="receiptinfo bg-primary">
                <h4>Replanet과 함께 해주심에 항상 감사드립니다!</h4>
                <br/>
                <h6>회원님의 연말정산, 종합소득세 신고를 위한 기부금 영수증은 국세청 홈택스 연말정산 간소화 서비스를 통해 발급 받으실 수 있습니다.</h6>
                <h6>리플래닛을 통한 기부의 경우, 개인정보 제공에 동의하셔야 홈택스에서 조회가 가능합니다.</h6>
                <br/>
                <h6 onClick={()=>window.open('http://www.hometax.go.kr')} className="externalLink text-white">국세청 홈택스 바로가기</h6>
            </div>
            <br/>
            <div className="receiptinfo">
                <h5>소득세법에 따른 개인정보 수집 안내</h5>
                <br/>
                <h6>&lt;수집 정보 : 이름, 주민등록번호&gt;</h6>
                <h6>개인정보를 입력하지 않을 경우 기부금 영수증 발급이 제한될 수 있습니다.</h6>
                <h6>수집한 개인정보는 기부금 영수증 발행과 기부내역의 신고에 사용되며 관련 법령에 따라 5년간 보관됩니다.</h6>
                <br/>
                <h6 style={{color: "#DB524E"}}>[근거법령 : 소득세법 제 160조의3, 소득세법 시행령 제 113조 제1항, 제208조의3, 소득세법 시행규칙 제58조]</h6>
            </div>
            <br/>
            <div className="receiptinfo">
                {privacyStatus == 'N'?
                <>
                    <input className="input mb-1" type="text" value={name} onChange={handleName} placeholder="이름" style={{width: "33%"}}/>
                    <div className="regexMsg">{nameMsg}</div>
                    <div>
                    <input className="input" type="text" value={front} onChange={handleFrontChange} placeholder="주민등록번호 앞자리" style={{width: "33%"}}/>&nbsp;-&nbsp;
                    <input className="input" type="password" value={last} onChange={handleLastChange} placeholder="주민등록번호 뒷자리" style={{width: "33%"}}/>
                    </div>
                    <div className="regexMsg">{privacyMsg}</div>
                    <br/>
                    <input type="checkbox" onChange={checkBox}/><span> 개인정보 제공에 동의합니다.</span>
                    <hr></hr>
                    <button className="button button-primary" onClick={() =>infoAgreement('동의')}>정보 제공 등록</button>
                </> :
                <>
                    <h5>개인 정보 제공에 동의하셨습니다.</h5><br/>
                    <button className="button button-primary" onClick={() =>infoAgreement('철회')}>동의 철회하기</button>
                </>}
            </div>
            <br/>
            <h6>궁금하신 점은 고객센터로 문의 바랍니다.</h6>
        </div>
    );
}

export default DonationReceipt;

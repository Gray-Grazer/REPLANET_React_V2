import '../../assets/css/reset.css';
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/mypage.css';
 
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetMemberByTokenAPI, callGetTotalDonationByTokenAPI } from '../../apis/MemberAPI';
import { jwtDecode } from 'jwt-decode';
import { GetCampaignByOrgAPI } from '../../apis/CampaignListAPI';

function MyPageOrg() {

    let token = localStorage.getItem('token');
    let decodedToken = token ? jwtDecode(token) : null;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const result = useSelector(state => state.memberReducer);
    const orgResult = useSelector((state) => state.campaignReducer.campaignlist);
    let orgCode = decodedToken && decodedToken.memberCode;
    const org = orgResult && orgResult.results.campaignList;

    const memberName = org && org[0]? org[0].organization.member?.memberName : '로딩중...';
    const totalCampaign = org? org.length : '0';
    const totalDonation = result.totalDonation !== undefined && result.totalDonation !== null? result.totalDonation : '로딩중...';
    // 기부처 정보 조회하는걸로 수정해야함
console.log(orgResult,'리잘');
    const navigateToOrgCamList = () => {
        navigate('list');
    }

    const navigateToOrgRevList = () => {
        navigate('review');
    }

    const navigateEditOrgInfo = () => {
        navigate('confirmPwd');
    }

    const navigateRequestWithdraw = () => {
        navigate('withdraw');
    }
    
    useEffect(
        () => {
            dispatch(GetCampaignByOrgAPI({orgCode},"ing"));

            // dispatch(callGetMemberByTokenAPI())
            // .catch(error => {
            //     console.error('MyPage() API 호출 에러: ', error);
            // })
        },
        [dispatch]
    );

    return(
        <>
            <div className="header-admin">
                <div className="header-admin-menu bg-primary"><h4>{memberName}님</h4></div>
                <div className="header-admin-menu">
                    <h5>등록한 캠페인 수</h5>
                    <h3 className="text-primary">{totalCampaign}개</h3>
                    {/* 기부처의 등록한 캠페인 수 구해야함 */}
                </div>
                <div className="header-admin-menu">
                    <h5>종료된 캠페인 수</h5>
                    <h4 className="text-primary">0개</h4>
                    {/* 기부처의 받은 기부금 총액 총합 구해야함 */}
                </div>
            </div>
            <div className='container'>
                <div className='campaign-button-container'>
                    <div className="campaign-button-area" style={{marginBottom: "10px"}}>
                        <button className='button button-primary-outline' onClick={navigateToOrgCamList}>
                            캠페인 관리
                            {/* 캠페인 리스트가 나와서 누르면 해당 캠페인으로 갈 수 있게 */}
                        </button>
                        <button className='button button-primary-outline' onClick={navigateToOrgRevList}>
                            리뷰 관리
                            {/* 리뷰 리스트가 나와서 누르면 해당 리뷰로 갈 수 있게 */}
                        </button>
                        <button className="button button-primary-outline" onClick={navigateEditOrgInfo}>
                            정보 수정
                            {/* 기부처 정보 수정 */}
                        </button>
                        <button className="button button-primary-outline" onClick={navigateRequestWithdraw}>
                            탈퇴 요청
                            {/* 운영자에게 탈퇴 요청 할 수 있는 form? */}
                        </button>
                    </div>
                    <div>
                        <Outlet/>
                        
                    </div>

                </div>
            </div>
        </>
    );
}

export default MyPageOrg;

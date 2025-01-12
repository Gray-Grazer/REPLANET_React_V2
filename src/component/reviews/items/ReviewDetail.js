import { useDispatch, useSelector } from "react-redux";
import reviewReducer from "../../../modules/ReviewModule";
import { callGetMemberByTokenAPI } from "../../../apis/MemberAPI";

export function ReviewDetail({code}) {
    const result = useSelector(state => state.reviewReducer);
    const review = result.review;
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(callGetSpecificReviewAPI(code));
        },
        []
    );

    useEffect(
      () => {
          console.log('MyPage() useEffect 실행');
          dispatch(callGetMemberByTokenAPI())
          .catch(error => {
              console.error('MyPage() API 호출 에러: ', error);
          })
      },
      [dispatch]
  );

    return (
        review && (
            <>
        <div class="container-first">


        <h1 className="py-3 container">{review.reviewTitle}</h1>
        
        
        <div className="items-container ic3 g-gap2 campaign-list-container">
            
              <div className="item" style=" grid-column: 1 / 3;">
                  
                      <div className="item-thumb rounded-3 mb-1">
                          <img src="../../assets/images/campaign/1.jpg" className="w-100"/>
                      </div>
                      
              </div>

              <div className="item" style="display: block">
                <div className="text-right">
                  <h2>모금액 총 {review.currentBudget}</h2>
                    <h3>6,004,345명의 참여로<br/>
                    따뜻한 손길을 내어줄 수 있었습니다.</h3>
              </div>
              
                <hr/>
              
              <div class="item p-2 border">
                <h5>{review.orgName}</h5>
                <p>
                  {review.orgDescription}
                </p>
              </div>
              
                <ul>
                  <li> - 봉사활동에 참여하면 리플래닛이 기부합니다</li>
                  <li> - 기부금은 100% 재단에 전달됩니다</li>
                </ul>


          </div>
    </div>
        
  {/* conteny body */}
    <div>

                    <p>{review.description}</p>
    </div>


    <div class="title-bar p-3" 
    data-responsive-toggle="example-menu" 
    data-hide-for="medium"  style=" grid-column: 1 / 3;"> 
   <button class="menu-icon button button-primary w-20" 
           type="button" data-toggle>댓글
   </button> 
   
</div> 
<div id="example-menu" class=""> 
   <div class="dropdown-box" data-dropdown-menu>
    <div class="bg-light comments">

       <div class="comment">
          <div>
            <h5>닉네임</h5>
            <h6>dfsfsdsffdadsadda</h6>
            <h6>2023.11.15 | 수정 | 삭제</h6>
          </div>
       </div>

       <div class="comment">
          <div>
            <h5>닉네임</h5>
            <h6>dfsfsdsffdadsadda</h6>
            <h6>2023.11.15 | 수정 | 삭제</h6>
          </div>
       </div>

       <div class="comment">
          <div>
            <h5>닉네임</h5>
            <h6>dfsfsdsffdadsadda</h6>
            <h6>2023.11.15 | 수정 | 삭제</h6>
          </div>
        </div>

      <div class="comment-form" >
        <form>
          <h6>닉네임</h6>
            <div class="comment-input">
              <textarea type="text" class="w-90" placeholder="응원의 한마디를 부탁드립니다❤️"></textarea>
              <input class="button-primary rounded ml-1" type="button" value="댓글 등록" />
            </div>
        </form>
      </div>
    </div>
    </div>
    </div></div>
    </>
    )
    );

}
import { createActions,handleActions } from "redux-actions";
import { GET_CAMPAIGN } from "./CampaignModule";

// initial state value
const initialState = {};

// declare action type
export const GET_REVIEWS = 'review/GET_REVIEWS';
export const GET_REVIEW = 'review/GET_REVIEW';
export const POST_REVIEW = 'review/POST_REVIEW';
export const GET_SEARCH_RESULT = 'review/GET_SEARCH_RESULT';
export const GET_COMPLETED_CAMPAIGNS = 'review/GET_COMPLETED_CAMPAIGNS';
export const GET_THUMBNAIL_PATH = 'review/GET_THUMBNAIL_PATH';
export const PUT_REVIEW = 'review/PUT_REVIEW';
export const DELETE_REVIEW = 'review/DELETE_REVIEW';
export const POST_REVIEW_COMMENT = "review/POST_REVIEW_COMMENT";
export const GET_REVIEW_COMMENTS = "review/GET_REVIEW_COMMENTS";
export const DELETE_REVIEW_COMMENT = "review/DELETE_REVIEW_COMMENT";
export const PUT_COMMENT = "review/PUT_COMMENT";
export const PUT_MONITORED_COMMENT = "review/PUT_MONITORED_COMMENT";
export const GET_REVIEW_NEEDED_CAMPAIGN = "review/GET_REVIEW_NEEDED_CAMPAIGN";
export const GET_CAMPAIGN_FOR_REVIEW = "review/GET_CAMPAIGN";
export const GET_ORG_REVIEWS = "review/GET_ORG_REVIEWS";
export const GET_REVIEW_NEEDED_ORG_CAMPAIGN = "review/GET_REVIEW_NEEDED_ORG_CAMPAIGN";


 //declare action function
export const { review: {getReviews,getReview, getCampaign, postReview, getSearchResult, getCompletedCampaigns, getThumbnailPath, putReview, deleteReview, postReviewComment, getReviewComments, deleteReviewComment, putComment, putMonitoredComment, getReviewNeededCampaign, getOrgReviews, getReviewNeededOrgCampaign } } = createActions({
    [GET_REVIEWS] : (res) => ({ reviewList: res }),
    [GET_REVIEW] : (res) => ({ review : res }),
    [GET_CAMPAIGN_FOR_REVIEW] : (res) => ({ campaign : res }),
    [POST_REVIEW] : (res) => ({ regist: res }),
    [GET_SEARCH_RESULT] : (res) => ({ reviewList: res}),
    [GET_COMPLETED_CAMPAIGNS] : (res) => ({ completedCampaignList: res}),
    [GET_THUMBNAIL_PATH] : (res) => ({ thumbnail : res}),
    [PUT_REVIEW] : (res) => ({ update: res }),
    [DELETE_REVIEW] : (res) => ({ delete: res }),
    [POST_REVIEW_COMMENT] : (res) => ({ reviewComment: res }),
    [GET_REVIEW_COMMENTS] : (res) => ({ comments: res }),
    [DELETE_REVIEW_COMMENT] : (res) => ({ deleteComment : res}),
    [PUT_COMMENT] : (res) => ({ modifyComment : res }),
    [PUT_MONITORED_COMMENT] : (res) => ({ monitoredComment : res }),
    [GET_REVIEW_NEEDED_CAMPAIGN] : (res) => ({ getReviewNeededCampaign : res}),
    [GET_ORG_REVIEWS] : (res) => ({ orgReviewList: res }),
    [GET_REVIEW_NEEDED_ORG_CAMPAIGN] : (res) => ({ orgReviewNeededCampaign: res })
});

// declare reducer function
const reviewReducer = handleActions(

    {
        [GET_REVIEWS] : (state, {payload}) => {
        console.log('(Review reducer: GET_REVIEWS) 들어옴');

        return payload;
        },
        [GET_REVIEW] : (state, { payload }) => {
            console.log('(Review reducer: GET_REVIEW) 들어옴 : ', payload);
            return payload;
        },
        [GET_CAMPAIGN_FOR_REVIEW] : (state, {payload}) => {
            console.log('(Review reducer: GET_CAMPAIGN) 들어옴 : ', payload);
            return payload;
        },
        [POST_REVIEW] : (state, {payload}) => {
            console.log('(Review reducer: POST_REVIEW) 들어옴');
            return payload;
        },
        [GET_SEARCH_RESULT] : (state, {payload}) => {
            console.log('Review reducer: GET_SEARCH_RESULT 들어옴');
            return payload;
        },
        [GET_COMPLETED_CAMPAIGNS] : (state, {payload}) => {
            console.log('Review reducer: GET_COMPLETED_CAMPAIGNS 들어옴');
            return payload;
        },
        [GET_THUMBNAIL_PATH] : (state, {payload}) => {
            console.log('Review reducer: GET_THUMBNAIL_PATH 들어옴');
            console.log(payload)
            return payload;
        },
        [PUT_REVIEW] : (state, {payload}) => {
            console.log('Review reducer: PUT_REVIEW 들어옴');
            return payload;
        },
        [DELETE_REVIEW] : (state, {payload}) => {
            console.log('Review reducer: DELETE_REVIEW 들어옴');
            return payload;
        },
        [POST_REVIEW_COMMENT] : (state, {payload}) => {
            console.log('Review reducer: POST_REVIEW_COMMENT 들어옴 : ', payload);
            return payload;
        },
        [GET_REVIEW_COMMENTS] : (state, {payload}) => {
            console.log('Review reducer: GET_REVIEW_COMMENTS 들어옴 : ', payload);
            return payload;
        },
        [DELETE_REVIEW_COMMENT] : (state, {payload}) => {
            console.log('Review reducer: DELETE_REVIEW_CODE 들어옴 : ', payload);
            return payload;
        },
        [PUT_COMMENT] : (state, {payload}) => {
            console.log('Review reducer: PUT_COMMENT_CODE 들어옴 : ', payload);
            return payload;
        },
        [PUT_MONITORED_COMMENT] : (state, {payload}) => {
            console.log('Review reducer: PUT_MONITORED_COMMENT 들어옴 : ', payload);
            return payload;
        },
        [GET_REVIEW_NEEDED_CAMPAIGN] : (state, {payload}) => {
            console.log('Review reducer: GET_REVIEW_NEEDED_CAMPAIGN 들어옴 : ', payload);
            return payload;
        },
        [GET_ORG_REVIEWS] : (state, {payload}) => {
            console.log("Review reducer: GET_ORG_REVIEW 들어옴 : ", payload);
            return payload;
        },
        [GET_REVIEW_NEEDED_ORG_CAMPAIGN] : (state, {payload}) => {
            console.log("Review reducer: GET_REVIEW_NEEDED_ORG_CAMPAIGN 들어옴 : ", payload);
            return payload;
        }

    },
    initialState
);

export default reviewReducer;
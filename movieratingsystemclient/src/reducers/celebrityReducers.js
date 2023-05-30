import {
    ALL_CELEBRITY_REQUEST,
    ALL_CELEBRITY_SUCCESS,
    ALL_CELEBRITY_FAIL,
    ALL_CELEBRITY_ROLE_OF_A_MOVIE_REQUEST,
    ALL_CELEBRITY_ROLE_OF_A_MOVIE_SUCCESS,
    ALL_CELEBRITY_ROLE_OF_A_MOVIE_FAIL,
    CLEAR_ERRORS,
} from "./../constants/celebrityConstants";

export const celebrityReducer = (state = {celebrities : []},action)=>{
    switch(action.type){
        case ALL_CELEBRITY_REQUEST:
            return {
                ...state,
                loading: true,
                celebrities:[]
            }
        case ALL_CELEBRITY_SUCCESS:
            return {
                ...state,
                loading: false,
                celebrities: action.payload
            }
        case ALL_CELEBRITY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ALL_CELEBRITY_ROLE_OF_A_MOVIE_REQUEST:
            return {
                ...state,
                loadingCRM: true,
                celebrities:[]
            }
        case ALL_CELEBRITY_ROLE_OF_A_MOVIE_SUCCESS:
            return {
                ...state,
                loadingCRM: false,
                celebrities: action.payload
            }
        case ALL_CELEBRITY_ROLE_OF_A_MOVIE_FAIL:
            return {
                ...state,
                loadingCRM: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};
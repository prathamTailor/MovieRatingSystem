import {
    ALL_ROLE_REQUEST,
    ALL_ROLE_SUCCESS,
    ALL_ROLE_FAIL,
    CLEAR_ERRORS,
} from "./../constants/roleConstants";

export const roleReducer = (state = {roles : []},action)=>{
    switch(action.type){
        case ALL_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
                roles:[]
            }
        case ALL_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                roles: action.payload
            }
        case ALL_ROLE_FAIL:
            return {
                ...state,
                loading: false,
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
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_ADMIN_REQUEST,
    LOAD_ADMIN_SUCCESS,
    LOAD_ADMIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ADMIN_LOGOUT_SUCCESS,
    ADMIN_LOGOUT_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    GET_ADMIN_REQUEST,
    GET_ADMIN_SUCCESS,
    GET_ADMIN_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    CLEAR_ERRORS
} from "./../constants/userConstants"

export const userReducer = (state = {user : {} },action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
        case LOAD_ADMIN_REQUEST:
        case ADMIN_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            }
        case GET_USER_REQUEST:
        case GET_ADMIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading:false,
                user: action.payload,
            }
        case ADMIN_LOGIN_SUCCESS:
        case LOAD_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                admin: action.payload,
            } 
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                userDetail: action.payload,
            }
        case GET_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                adminDetail: action.payload,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
            }
        case ADMIN_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                admin: null,
                isAuthenticated: false,
            }
        case LOGOUT_FAIL:
        case ADMIN_LOGOUT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case ADMIN_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                admin: null,
                error: action.payload,
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }
        case LOAD_ADMIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                admin: null,
                error: action.payload,
            }
        case GET_USER_FAIL:
        case GET_ADMIN_FAIL:
            return {
                ...state,
                loading: false,
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


export const profileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case UPDATE_PROFILE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_PROFILE_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
};
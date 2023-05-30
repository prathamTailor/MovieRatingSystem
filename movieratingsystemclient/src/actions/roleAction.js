import axios from "axios";
import {
    ALL_ROLE_REQUEST,
    ALL_ROLE_SUCCESS,
    ALL_ROLE_FAIL,
    CLEAR_ERRORS,
} from "./../constants/roleConstants";

// Get All Roles
export const getRoles = () => async (dispatch) => {
    try{

        dispatch({type: ALL_ROLE_REQUEST});

        const {data} = await axios.get("/api/Roles");

        dispatch({
            type: ALL_ROLE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: ALL_ROLE_FAIL,
            payload: error.response.data.title,
        })
    }
}

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}
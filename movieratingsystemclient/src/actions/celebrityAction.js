import axios from "axios";
import {
    ALL_CELEBRITY_REQUEST,
    ALL_CELEBRITY_SUCCESS,
    ALL_CELEBRITY_FAIL,
    ALL_CELEBRITY_ROLE_OF_A_MOVIE_REQUEST,
    ALL_CELEBRITY_ROLE_OF_A_MOVIE_SUCCESS,
    ALL_CELEBRITY_ROLE_OF_A_MOVIE_FAIL,
    CLEAR_ERRORS,
} from "./../constants/celebrityConstants";

// Get All Celebrities
export const getCelebrities = () => async (dispatch) => {
    try{

        dispatch({type: ALL_CELEBRITY_REQUEST});

        const {data} = await axios.get("/api/Celebrities");

        dispatch({
            type: ALL_CELEBRITY_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: ALL_CELEBRITY_FAIL,
            payload: error.response.data,
        })
    }
}

// Get all celebrities and their role of a movie
export const getCelebritiesAndRolesOfMovie = (id) => async (dispatch) => {
    try{

        dispatch({type: ALL_CELEBRITY_ROLE_OF_A_MOVIE_REQUEST});

        const {data} = await axios.get(`/api/MovieCelebrityRoles/MovieId/${id}`);

        dispatch({
            type: ALL_CELEBRITY_ROLE_OF_A_MOVIE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: ALL_CELEBRITY_ROLE_OF_A_MOVIE_FAIL,
            payload: error.response.data,
        })
    }
}

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}
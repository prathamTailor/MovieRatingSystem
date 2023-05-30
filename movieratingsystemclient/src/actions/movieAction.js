import axios from "axios";
import {
    ALL_MOVIE_FAIL,
    ALL_MOVIE_SUCCESS,
    ALL_MOVIE_REQUEST,
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    MOVIE_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    NEW_MOVIE_REQUEST,
    NEW_MOVIE_SUCCESS,
    NEW_MOVIE_FAIL,
    NEW_ROLE_REQUEST,
    NEW_ROLE_SUCCESS,
    NEW_ROLE_FAIL,
    ALL_REVIEW_OF_MOVIE_REQUEST,
    ALL_REVIEW_OF_MOVIE_SUCCESS,
    ALL_REVIEW_OF_MOVIE_FAIL,
    ADD_MOVIE_CELEBRITY_REQUEST,
    ADD_MOVIE_CELEBRITY_SUCCESS,
    ADD_MOVIE_CELEBRITY_FAIL,
    ADD_CELEBRITY_ROLE_REQUEST,
    ADD_CELEBRITY_ROLE_SUCCESS,
    ADD_CELEBRITY_ROLE_FAIL,
    ADD_MOVIE_ROLE_REQUEST,
    ADD_MOVIE_ROLE_SUCCESS,
    ADD_MOVIE_ROLE_FAIL,
    ADD_MOVIE_CELEBRITY_ROLE_REQUEST,
    ADD_MOVIE_CELEBRITY_ROLE_SUCCESS,
    ADD_MOVIE_CELEBRITY_ROLE_FAIL,
    CLEAR_ERRORS,
    ASSIGN_CELEBRITY_ROLE_REQUEST
} from "./../constants/movieConstants"

// Get All Movies
export const getMovie = () => async (dispatch) => {
    try{

        dispatch({type: ALL_MOVIE_REQUEST});

        const {data} = await axios.get("/api/Movies");

        dispatch({
            type: ALL_MOVIE_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: ALL_MOVIE_FAIL,
            payload: error.response.data.title,
        })
    }
}

// Get a movie
export const getMovieDetail = (id) => async (dispatch) => {
    try{

        dispatch({type: MOVIE_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/Movies/${id}`);

        dispatch({
            type: MOVIE_DETAILS_SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: MOVIE_DETAILS_FAIL,
            payload: error.response.data.title,
        })
    }
}

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(`/api/Reviews`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.title,
      });
    }
};

// Add new Movie
export const newMovie = (movieData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_MOVIE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/Movies`, movieData, config);

    dispatch({
      type: NEW_MOVIE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_MOVIE_FAIL,
      payload: error.response.data.title,
    });
  }
};

// Add new Role
export const newRole = (roleData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ROLE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/Roles`, roleData, config);

    dispatch({
      type: NEW_ROLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_ROLE_FAIL,
      payload: error.response.data.title,
    });
  }
};

// Add new Celebrity
export const newCelebrity = (celebrityData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ROLE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/Celebrities`, celebrityData, config);

    dispatch({
      type: NEW_ROLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_ROLE_FAIL,
      payload: error.response.data.title,
    });
  }
};

// Get All Reviews of a movie
export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_OF_MOVIE_REQUEST });
  
      const { data } = await axios.get(`/api/Reviews/movie/${id}`);
  
      dispatch({
        type: ALL_REVIEW_OF_MOVIE_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: ALL_REVIEW_OF_MOVIE_FAIL,
        payload: error.response.data.title,
      });
    }
  };


// Add Clebrity and Role
export const addCelebrityRole = (celebrityRoleData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CELEBRITY_ROLE_REQUEST});

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/CelebrityRoles`, celebrityRoleData, config);

    dispatch({
      type: ADD_CELEBRITY_ROLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ADD_CELEBRITY_ROLE_FAIL,
      payload: error.response.data.title,
    });
  }
};

// Add Movie and Clebrity
export const addMovieCelebrity = (movieCelebrityData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_MOVIE_CELEBRITY_REQUEST});

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/MovieCelebrities`, movieCelebrityData, config);

    dispatch({
      type: ADD_MOVIE_CELEBRITY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ADD_MOVIE_CELEBRITY_FAIL,
      payload: error.response.data.title,
    });
  }
};

// Add Movie and Clebrity
export const addMovieRole = (movieRoleData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_MOVIE_ROLE_REQUEST});

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/MovieRoles`, movieRoleData, config);

    dispatch({
      type: ADD_MOVIE_ROLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ADD_MOVIE_ROLE_FAIL,
      payload: error.response.data.title,
    });
  }
};

// Add Movie Celebrity Role
export const addMovieCelebrityRole = (movieCelebrityRoleData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_MOVIE_CELEBRITY_ROLE_REQUEST});

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/MovieCelebrityRoles`, movieCelebrityRoleData, config);

    dispatch({
      type: ADD_MOVIE_CELEBRITY_ROLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ADD_MOVIE_CELEBRITY_ROLE_FAIL,
      payload: error.response.data.title,
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}
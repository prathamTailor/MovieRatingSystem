import {
    ALL_MOVIE_REQUEST,
    ALL_MOVIE_SUCCESS,
    ALL_MOVIE_FAIL,
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
    NEW_CELEBRITY_REQUEST,
    NEW_CELEBRITY_SUCCESS,
    NEW_CELEBRITY_FAIL,
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
    CLEAR_ERRORS,
    ADD_MOVIE_CELEBRITY_ROLE_REQUEST,
    ADD_MOVIE_CELEBRITY_ROLE_SUCCESS,
    ADD_MOVIE_CELEBRITY_ROLE_FAIL
} from "./../constants/movieConstants";

export const movieReducer = (state = {movies : []},action)=>{
    switch(action.type){
        case ALL_MOVIE_REQUEST:
            return {
                ...state,
                loading: true,
                movies:[]
            }
        case ALL_MOVIE_SUCCESS:
            return {
                ...state,
                loading: false,
                movies: action.payload
            }
        case ALL_MOVIE_FAIL:
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

export const movieDetailsReducer = (state = {movie : {}},action)=>{
    switch(action.type){
        case MOVIE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                movie: {}
            }
        case MOVIE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                movie: action.payload
            }
        case MOVIE_DETAILS_FAIL:
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
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

export const newMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_MOVIE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const newRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_ROLE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_ROLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const newCelebrityReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_CELEBRITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CELEBRITY_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_CELEBRITY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const movieReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_OF_MOVIE_REQUEST:
      return {
        ...state,
        loadingMR: true,
      };
    case ALL_REVIEW_OF_MOVIE_SUCCESS:
      return {
        loadingMR: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_OF_MOVIE_FAIL:
      return {
        ...state,
        loadingMR: false,
        error: action.payload,
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

export const assignCelebrityRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CELEBRITY_ROLE_REQUEST:
    case ADD_MOVIE_CELEBRITY_REQUEST:
    case ADD_MOVIE_ROLE_REQUEST:
    case ADD_MOVIE_CELEBRITY_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CELEBRITY_ROLE_SUCCESS:
    case ADD_MOVIE_CELEBRITY_SUCCESS:
    case ADD_MOVIE_ROLE_SUCCESS:
    case ADD_MOVIE_CELEBRITY_ROLE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case ADD_CELEBRITY_ROLE_FAIL:
    case ADD_MOVIE_CELEBRITY_FAIL:
    case ADD_MOVIE_ROLE_FAIL:
    case ADD_MOVIE_CELEBRITY_ROLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { movieReducer , movieDetailsReducer, newReviewReducer, movieReviewsReducer , newMovieReducer, newRoleReducer,newCelebrityReducer, assignCelebrityRoleReducer} from "./reducers/movieReducers";
import { profileReducer, userReducer } from "./reducers/userReducers";
import {celebrityReducer} from "./reducers/celebrityReducers";
import {roleReducer} from "./reducers/roleReducers";

const reducer = combineReducers({
    movies: movieReducer,
    celebrities: celebrityReducer,
    roles: roleReducer,
    movieDetails: movieDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    newReview: newReviewReducer,
    movieReviews: movieReviewsReducer,
    newMovie: newMovieReducer,
    newRole: newRoleReducer,
    newCelebrity: newCelebrityReducer,
    assignCelebrityRole: assignCelebrityRoleReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
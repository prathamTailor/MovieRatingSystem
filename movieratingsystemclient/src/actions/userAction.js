import axios from "axios";
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
  CLEAR_ERRORS,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOGOUT_FAIL
} from "./../constants/userConstants"

// Login
export const login = (userName, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/Auth/Login`,
      {
        userName,
        password
      },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
  }
};

// Login Admin
export const adminLogin = (adminName, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/AdminAuth/Login`,
      {
        adminName,
        password
      },
      config
    );

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_LOGIN_FAIL, payload: error.response.data });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    // const config = { headers: { "Content-Type": "multipart/form-data" } };
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/Auth/Register`,
      userData,
      config
    );

    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data });
  }
};

// Load User
export const loadUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
      
      const { data } = await axios.get(`/api/Auth/me`);
      
      dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.title });
    }
};

// Load Admin
export const loadAdmin = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_ADMIN_REQUEST });
    
    const { data } = await axios.get(`/api/AdminAuth/me`);
    
    dispatch({ type: LOAD_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_ADMIN_FAIL, payload: error.response.data.title });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/Auth/logout`);
    dispatch({ type: LOGOUT_SUCCESS});
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.title });
  }
};

// Logout Admin
export const logoutAdmin = () => async (dispatch) => {
  try {
    await axios.get(`/api/AdminAuth/logout`);
    dispatch({ type: ADMIN_LOGOUT_SUCCESS});
  } catch (error) {
    dispatch({ type: ADMIN_LOGOUT_FAIL, payload: error.response.data.title });
  }
};

// Get user
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    
    const { data } = await axios.get(`/api/Auth/${id}`);
    
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAIL, payload: error.response.data.title });
  }
};

// Get admin
export const getAdmin = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_REQUEST });
    
    const { data } = await axios.get(`/api/AdminAuth/${id}`);
    
    dispatch({ type: GET_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ADMIN_FAIL, payload: error.response.data.title });
  }
};

// Update Profile
export const updateProfile = (userData,id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    // const config = { headers: { "Content-Type": "multipart/form-data" } };
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/Auth/${id}`, {id,userData}, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: true });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
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
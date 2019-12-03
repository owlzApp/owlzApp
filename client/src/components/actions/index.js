import keys from "../../config/keys";
import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
  EDIT_USER,
  SEND_RESERVATION,
  GET_RESERVATION,
  EDIT_RESERVATION,
  DELETE_RESERVATION,
  RESERVATION_ERROR
} from "./types";
import * as JWT from "jwt-decode";

// Signup with Passport JWT
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${keys.siteUrl}/signup`, formProps);
    localStorage.setItem("token", response.data.token);
    // then when you have the token decode it.
    let token = localStorage.token;
    if (token) {
      // Decode token
      token = JWT(token);
      // let token to variable data
      let data = token;
      data = {
        id: data.sub,
        email: data.email
      };
      const response = await axios.get(`/api/user/${data.id}`);
      dispatch({ type: AUTH_USER, payload: response.data });
    } else {
      token = null;
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

// Signin with Passport JWT
export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${keys.siteUrl}/signin`, formProps);
    localStorage.setItem("token", response.data.token);
    // then when you have the token decode it.
    let token = localStorage.token;
    if (token) {
      // Decode token
      token = JWT(token);
      // let token to variable data
      let data = token;
      data = {
        id: data.sub,
        email: data.email
      };
      const response = await axios.get(`/api/user/${data.id}`);
      dispatch({ type: AUTH_USER, payload: response.data });
    } else {
      token = null;
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

// Signout User by Auth or Passport JWT
export const signout = () => async dispatch => {
  // Signout for Auth(Google, insta, linkedin, facebook)
  await axios.get("/api/logout");
  dispatch({ type: AUTH_USER, payload: "" });
  localStorage.removeItem("token");
  dispatch({ type: AUTH_ERROR, payload: "" });
};

// Fetch the user by Passport JWT
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  let token = localStorage.token;
  if (token) {
    // Decode token
    token = JWT(token);
    // let token to variable data
    let data = token;
    data = {
      id: data.sub,
      email: data.email
    };
    const response = await axios.get(`/api/user/${data.id}`);
    dispatch({ type: AUTH_USER, payload: response.data });
  } else {
    token = null;
    dispatch({ type: AUTH_USER, payload: res.data });
  }
};

// Edit User
export const editUser = (id, formValues, callback) => async dispatch => {
  try {
    dispatch({ type: AUTH_ERROR, payload: "" });
    const response = await axios.post(`/api/user/${id}`, formValues);
    dispatch({ type: EDIT_USER, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

// Edit delete
export const deleteUser = (id, callback) => async dispatch => {
  await axios.delete(`/api/user/${id}`);
  dispatch({ type: EDIT_USER, payload: "" });
  localStorage.removeItem("token");
  callback(); /* history callback */
};

////////////////////////////////////////////// Reserevation /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Send Reservation
export const sendReservation = (finalForm, callback) => async dispatch => {
  try {
    console.log(finalForm);
    const response = await axios.post(`/api/send`, finalForm);
    dispatch({ type: SEND_RESERVATION, payload: response.data });
    callback();
  } catch (e) {
    dispatch({
      type: RESERVATION_ERROR,
      payload: "Cannot send the reservation please check all your input"
    });
  }
};

// Get all reservation
export const getAllReservation = () => async dispatch => {
  try {
    const response = await axios.get(`/api/allReservation`);
    dispatch({ type: GET_RESERVATION, payload: response.data });
  } catch (e) {
    dispatch({
      type: RESERVATION_ERROR,
      payload: "Cannot log reservation"
    });
  }
};

// Get all reservation
export const confirmBook = form => async dispatch => {
  try {
    const response = await axios.post(`/api/reservation`, form);
    dispatch({ type: EDIT_RESERVATION, payload: response.data });
  } catch (e) {
    dispatch({
      type: RESERVATION_ERROR,
      payload: "Cannot book reservation"
    });
  }
};

// Delete reservation
export const deleteReservation = id => async dispatch => {
  try {
    const response = await axios.delete(`/api/reservation/${id}`);
    dispatch({ type: DELETE_RESERVATION, payload: response.data });
  } catch (e) {
    dispatch({
      type: RESERVATION_ERROR,
      payload: "Cannot book reservation"
    });
  }
};

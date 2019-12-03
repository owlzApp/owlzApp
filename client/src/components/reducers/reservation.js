import {
  SEND_RESERVATION,
  GET_RESERVATION,
  EDIT_RESERVATION,
  DELETE_RESERVATION,
  RESERVATION_ERROR
} from "../actions/types";
const INITIAL_STATE = {
  reservationSend: "",
  allReservation: "",
  errorMessage: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_RESERVATION:
      return { ...state, reservationSend: action.payload || false };
    case GET_RESERVATION:
      return { ...state, allReservation: action.payload || false };
    case EDIT_RESERVATION:
      return { ...state };
    case DELETE_RESERVATION:
      return { ...state };
    case RESERVATION_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

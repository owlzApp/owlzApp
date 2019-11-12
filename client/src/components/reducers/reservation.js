import { SEND_RESERVATION, RESERVATION_ERROR } from '../actions/types';
const INITIAL_STATE = {
  reservation: '',
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_RESERVATION:
      return { ...state, authenticated: action.payload || false };
    case RESERVATION_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

import { AnyAction, Reducer } from "redux";
import {
  SET_SESSION,
  GET_USER_DATA,
  SET_LOADING,
  SET_ERROR,
  CLEAR_SESSION,
} from "../actions/constants";

export interface Profile {
  email: string;
  firstName: string;
  lastName: string;
  patronimic: string;
}

export interface Session {
  token: string | null;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
  profile: Profile | null;
}

const initialState: Session = {
  token: null,
  loggedIn: false,
  loading: false,
  error: null,
  profile: null,
};

export const SessionReducer: Reducer<Session> = (
  state: Session = initialState,
  action: AnyAction //TODO refactor
) => {
  switch (action.type) {
    case SET_SESSION: {
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload, loggedIn: true, loading: false };
    }
    case SET_LOADING: {
      console.log("set loading");
      return { ...state, error: null, loading: true };
    }
    case SET_ERROR: {
      console.log("error", action);
      return { ...state, error: action.payload, loading: false };
    }
    case GET_USER_DATA: {
      return { ...state, ...action.payload, loading: false };
    }
    case CLEAR_SESSION: {
      localStorage.removeItem("token");
      return initialState;
    }
    default: {
      return state;
    }
  }
};

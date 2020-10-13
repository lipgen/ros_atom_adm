import { ThunkDispatch as Dispatch, ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { createAction, ActionType } from "typesafe-actions";
import { Session, Profile } from "../reducers/session";
import api from "../../api";

import {
  GET_USER_DATA,
  SET_SESSION,
  CLEAR_SESSION,
  SET_LOADING,
  SET_ERROR,
} from "./constants";

export const setSession = createAction(SET_SESSION)<Session>();
export const setLoading = createAction(SET_LOADING);
export const setError = createAction(SET_ERROR)<string>();
export const clearSession = createAction(CLEAR_SESSION);
export const getUserData = createAction(GET_USER_DATA)<Profile>();

// export type SessionAction =
//   | ReturnType<typeof setSession>
//   | ReturnType<typeof clearSession>
//   | ReturnType<typeof getUserData>
//   | ReturnType<typeof setLoading>
//   | ReturnType<typeof setError>;

export function authenticate(email: string, password: string) {
  return async (dispatch: Dispatch<Session, void, Action>) => {
    console.log("dispatched", email, password);
    return await api
      .get("/auth")
      .then((response) => {
        return dispatch(setSession(response.data));
      })
      .catch((error) => {
        console.log(error);
        return dispatch(setError(error.toString()));
      });
  };
}

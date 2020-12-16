import { ThunkDispatch as Dispatch } from "redux-thunk";
import { Action } from "redux";
import { createAction } from "typesafe-actions";
import { Session, Profile } from "../reducers/session";
//import api from "../../api";

import {
  GET_USER_DATA,
  SET_SESSION,
  CLEAR_SESSION,
  SET_LOADING,
  SET_ERROR,
} from "./constants";

export const setSession = createAction(SET_SESSION)<Session>();
export const setLoading = createAction(SET_LOADING)();
export const setError = createAction(SET_ERROR)<string>();
export const clearSession = createAction(CLEAR_SESSION)();
export const getUserData = createAction(GET_USER_DATA)<Profile>();

// export type SessionAction =
//   | ReturnType<typeof setSession>
//   | ReturnType<typeof clearSession>
//   | ReturnType<typeof getUserData>
//   | ReturnType<typeof setLoading>
//   | ReturnType<typeof setError>;

const hardcodedResponse = {
  //TODO change to call api
  token: "token",
  loggedIn: false,
  loading: false,
  error: null,
  profile: {
    email: "user@mail.com",
    firstName: "А.",
    lastName: "А.",
    patronimic: "Пользователь",
  },
};

const hardcodedAuth = {
  //TODO change to call api
  email: "user@mail.com",
  password: "1234",
};

export function authenticate(email: string, password: string) {
  return (dispatch: Dispatch<Session, void, Action>) => {
    console.log("dispatched", email, password);
    dispatch(setLoading());
    if (email.trim()) {
      if (password.trim()) {
        if (
          email === hardcodedAuth.email &&
          password === hardcodedAuth.password
        ) {
          return dispatch(setSession(hardcodedResponse));
        } else {
          return dispatch(setError("Неправильный логин или пароль"));
        }
      } else {
        return dispatch(setError("Введите пароль"));
      }
    } else {
      return dispatch(setError("Введите логин"));
    }
  };
}

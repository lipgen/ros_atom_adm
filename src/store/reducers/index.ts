import { combineReducers } from "redux";
import { SessionReducer } from "./session";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history: any) =>
  combineReducers({
    session: SessionReducer,
    router: connectRouter(history),
  });

export default createRootReducer;
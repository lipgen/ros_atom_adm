import {
    createStore,
    applyMiddleware,
    compose,
} from "redux";
import thunk from "redux-thunk";
import createRootReducer from './reducers';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from'connected-react-router';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory()

export type AppState = ReturnType<typeof createRootReducer>;

export const store = createStore(
    createRootReducer(history),
    undefined,
    composeEnhancers(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history)),
    )
);
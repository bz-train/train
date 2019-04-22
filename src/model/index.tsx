import {applyMiddleware, combineReducers, createStore} from "redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {createLogger} from "redux-logger";
import createBrowserHistory from "history/createBrowserHistory";
import reducer from "./reducer/index";

const loggerMiddleware = createLogger();
const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    reducer,
    {},
    applyMiddleware(middleware,loggerMiddleware)
)

export {store,history};

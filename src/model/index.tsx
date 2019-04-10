import {applyMiddleware, createStore} from "redux";
import {routerMiddleware} from "react-router-redux";
import {createLogger} from "redux-logger";
import createBrowserHistory from "history/createBrowserHistory";
import reducer from "./reducer/index";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./effect/index";
const loggerMiddleware = createLogger();
const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    {},
    applyMiddleware(middleware,sagaMiddleware,loggerMiddleware)
)

console.log("rootSaga>>>>>",rootSaga);
sagaMiddleware.run(rootSaga);

export {store,history};

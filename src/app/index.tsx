/**
 * Created by chenlei on 2018/5/28.
 */
import React, { Component } from "react"
import createBrowserHistory from 'history/createBrowserHistory'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {ConnectedRouter,routerReducer, routerMiddleware,push} from 'react-router-redux'
import {createLogger} from 'redux-logger'
import {Redirect} from 'react-router'
import {renderRoutes} from "./router";
import Bundle from './Bundle'
import {hot} from 'react-hot-loader'
import './index.scss'

const loggerMiddleware = createLogger()
const history = createBrowserHistory();
const middleware = routerMiddleware(history)

function reducer(state = 0, action: any) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }
}

const store = createStore(
    combineReducers({
        reducer,
        router: routerReducer
    }),
    applyMiddleware(middleware,loggerMiddleware)
)

console.log('store>>>>>', store);

store.subscribe(() =>
    console.log(store.getState())
);

store.dispatch({type: 'INCREMENT'});

const routes: any[] = [
    {   path: '/',
        exact: true,
        lazyComponent: './login/index'
    },
    {
        path: '/login',
        lazyComponent: './login/index',
    },
    {
        path: '/register',
        lazyComponent: './register/index',
    },
    {
        path: '/home',
        lazyComponent: './home/index',
    }
]

export class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div className="o-c-ass">
                        {renderRoutes(routes)}
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default hot(module)(App)

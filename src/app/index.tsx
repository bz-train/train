/**
 * Created by chenlei on 2018/5/28.
 */
import React, { Component } from "react"
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {renderRoutes} from "./router";
import {hot} from 'react-hot-loader'
import './index.scss'
import {store,history} from '../model'

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
        console.log("store>>>>",store);
        return (
            // 传递store里面的state  Provider  --它包裹下的组件都可以拿到state
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

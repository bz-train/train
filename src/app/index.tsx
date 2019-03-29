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
import { renderRoutes } from 'react-router-config'
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


const Root = (props: any) => {
    console.log("props>>>",props);
    let key=props.location.pathname;
    const routes = props.route.routes;
    let name=localStorage.getItem('name');
    routes.forEach((item: any) => {
        if(item.auth){
            if(name) {
                item.component =  () => {
                    const path=`${item.lazyComponent}`
                    return <Bundle  {...props}  goUrl={path} />
                }
            }
            else {
                item.component = () => {
                    return <Redirect from="/home" to="/" />
                }
            }
        }else {
            if(name) {
                item.component = () => {
                    return <Redirect from="/login" to="/home" />
                }
            }else {
                item.component =  () => {
                    const path=`${item.lazyComponent}`
                    return <Bundle  {...props} goUrl={path} />
                }
            }
        }
    });

    return (
        <div className="o-c-ass">
            {renderRoutes(routes)}
        </div>
    )
}

const routes: any[] = [
    {
        component: Root,
        routes: [
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
                auth: true,
                lazyComponent: './home/index',
            }
        ]
    }
]

export class App extends Component {
    render() {
        console.log("this.props",this.props);
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    {renderRoutes(routes)}
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default hot(module)(App)

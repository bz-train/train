import {combineReducers} from "redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import content from './content'
import role from './role'
import control from './scopeControl'

// 合并reducer
const reducer = combineReducers({
    content,
    role,
    control,
    router: routerReducer
});

export default  reducer;

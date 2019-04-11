import {combineReducers} from "redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import content from './content'
import role from './role'
import userx from './userx'

//分离redux后,combineReducers合成一个reducer函数
const reducer = combineReducers({
    content,
    role,
    router: routerReducer,
    userx
});

export default reducer;

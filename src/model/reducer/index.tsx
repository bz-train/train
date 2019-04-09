import {combineReducers} from "redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import content from './content'
import role from './role'

const reducer = combineReducers({
    content,
    role,
    router: routerReducer
});

export default  reducer;

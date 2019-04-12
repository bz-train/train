import {combineReducers} from "redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import content from './content'
import role from './role'
import add from './addrole';
const reducer = combineReducers({
    content,
    role,
    add,
    router: routerReducer
});

export default  reducer;

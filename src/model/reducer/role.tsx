import { ADD_CONNENT } from '../action/content'

//添加内容列表
function Content(state = {}, action:any) {
    switch (action.type) {
        case ADD_CONNENT:
            return Object.assign({}, state, {
                content: action.content
            })
        default:
            return state
    }
}

export default Content;

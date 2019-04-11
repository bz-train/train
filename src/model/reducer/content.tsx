import { ADD_CONNENT } from '../action/content'

const initState = {
    title:'hello word'
}

//添加内容列表
function Content(state = initState, action:any) {
    switch (action.type) {
        case ADD_CONNENT:
         //Object.assign(a,b,c) ：将b,c对象复制到a对象里去
            return Object.assign({}, state, {
                title: action.title
            })
        default:
            return state
    }
}

export default Content;


import { ADD_CONNENT } from '../action/content'


const initState = {
    title:'hello word'
}

//添加内容列表
function Content(state = initState, action:any) {
    switch (action.type) {
        case ADD_CONNENT:
            return Object.assign({}, state, {
                // 改变state的title值
                title: action.title
            })
        default:
            return state
    }
}

export default Content;

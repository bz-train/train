//添加内容列表
export const ADD_CONNENT = 'ADD_CONNENT'
export function addContent(title:String) {
    return {
        type: ADD_CONNENT,
        title
    }
}

//获取内容列表
export const GET_CONNENT = 'GET_CONNENT'
export function getContent(callback:Function) {
    return {
        type: GET_CONNENT,
        callback
    }
}


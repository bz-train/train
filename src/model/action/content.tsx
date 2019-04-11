export const ADD_CONNENT = 'ADD_CONNENT';

//添加内容列表     ----相当于action
export function addContent(title:String) {
    return {
        type: ADD_CONNENT,
        title
    }
}


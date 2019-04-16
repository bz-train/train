export const ADD_CONNENT = 'ADD_CONNENT'
//添加内容列表
export function addContent(title:String) {
    return {
        type: ADD_CONNENT,
        title
    }
}

export const add = '加';
//添加到role里
export function addToRole(title:any){
   return {
       type: add,
       title
   }
}

//添加到user里面 action
export const ADD_USER = 'ADD_USER'
export function addToUser(data:any){
    return {
        type: ADD_USER,
        data
    }
}

//删除user里的一行数据
export const REMOVE_USER = 'REMOVE_USER'
export function removeUser(index:any){
    return {
        type:REMOVE_USER,
        index
    }
}

//禁用功能
export const DISABLE_USER = 'DISABLE_USER'
export function disableUser(disable:any) {
    return {
        type:DISABLE_USER,
        disable
    }
}

//正常(不禁用)功能
export const ABLE_USER = 'ABLE_USER'
export function ableUser(disable:any) {
    return {
        type:ABLE_USER,
        disable
    }
}

//搜索功能
export const SEARCH_USER = 'SEARCH_USER'
export function searchUser(username:any,name:any,select:any){
    return {
        type : SEARCH_USER,
        username,
        name,
        select
    }
}





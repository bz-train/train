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
/* account,
confirm,
telnumber,
time */
export const adduser = 'add_user'
export function addToUser(data:any){
    return {
        type: adduser,
        data
    }
}


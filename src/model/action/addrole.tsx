//新增功能
export const ADD_ADDROLE = 'ADD_ADDROLE';
export const addAddRole =(value:any) =>{
    return {
        type: ADD_ADDROLE,
        value
    }
};

//禁用功能
export const USE_FORBID = 'USE_FORBID';
export const forbidData = (status:any) =>{
    return {
        type : USE_FORBID,
        status
    }
};
//正常功能
export const USE_ALLOW = 'USE_ALLOW';
export const allowData = (status:any)=>{
    return{
        type:USE_ALLOW,
        status
    }
};

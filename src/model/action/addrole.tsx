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
export const forbidData = (index:any) =>{
    return {
        type : USE_FORBID,
        index
    }
};
//正常功能
export const USE_ALLOW = 'USE_ALLOW';
export const allowData = (index:any)=>{
    return{
        type:USE_ALLOW,
        index
    }
};
//删除功能
export const DEL_ROWDATA="DEL_ROWDATA";
export const delRowData = (index:any)=>{
    return{
        type:DEL_ROWDATA,
        index
    }
};

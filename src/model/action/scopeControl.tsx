// 这里写action

// 删除
export const DEL_TABLE_DATA = 'DEL_TABLE_DATA';
export const  delDispatch = (id: Number) => {
    return {
        type: DEL_TABLE_DATA,
        id
    }
};

// 增加
export const ADD_FORM_DATA = 'ADD_FORM_DATA';
export const addData = (data: any) => {
    return {
        type: ADD_FORM_DATA,
        data
    }
};

// 编辑
export const EDIT_TABLE_DATA = 'EDIT_TABLE_DATA';
export const editData = (data: any) => {
    return {
        type: EDIT_TABLE_DATA,
        data
    }
};

// 搜索
export const SERACH_TABLE_DATA = 'SERACH_TABLE_DATA';
export const searchData = (data: any) => {
    return {
        type: SERACH_TABLE_DATA,
        data
    }
};

// 禁用
export const LIMIT_TABLE_DATA = 'LIMIT_TABLE_DATA';
export const limitData = (index: any) => {
    return {
        type: LIMIT_TABLE_DATA,
        index
    }
};

// 取消禁用 -- 正常
export const NORMAL_TABLE_DATA = 'NORMAL_TABLE_DATA';
export const normalData = (index: any) => {
    return {
        type: NORMAL_TABLE_DATA,
        index
    }
};
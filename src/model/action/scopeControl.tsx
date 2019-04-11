export const DEL_TABLEDATA = 'DEL_TABLEDATA';
export function delDispatch(id: String) {
    return {
        type: DEL_TABLEDATA,
        id
    }
}

export const ADD_FORM_DATA = 'ADD_FORM_DATA';
export function addData (data: any) {
    return  {
        type: ADD_FORM_DATA,
        data
    }
}


// 这里写action

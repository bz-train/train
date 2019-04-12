import { ADD_ADDROLE } from '../action/addrole'


const initState = {
    data : [{
        key: '1',
        rNumber: '1',
        rName: 'John Brown',
        rType: '',
        rTypeName: '',
        createTime: '2019/03/26',
        yonSys: '是',
        operate: '',
    }, {
        key: '2',
        rNumber: '2',
        rName: 'Jim Green',
        rType: '',
        rTypeName: '',
        createTime: '2019/03/26',
        yonSys: '是',
        operate: '',
    }, {
        key: '3',
        rNumber: '3',
        rName: 'Joe Black',
        rType: '',
        rTypeName: '',
        createTime: '2019/03/26',
        yonSys: '是',
        operate: '',
    },
    ]
};

//添加内容列表
function Content(state = initState, action:any) {
    switch (action.type) {
        case ADD_ADDROLE:{
            const newState = JSON.parse(JSON.stringify(state));
            newState.data.push(action.value);
           // console.log(newState.data);
            return Object.assign({}, state, {
                data: newState.data
        }
        default:
            return state;
    }
}

export default Content;
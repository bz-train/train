import { ADD_ADDROLE,USE_FORBID,USE_ALLOW,DEL_ROWDATA } from '../action/addrole'


const initState = {
    data : [{
        key: '1',
        rName: 'John Brown',
        rType: '',
        rTypeName: '',
        createTime: '2019/03/26',
        yonSys: '是',
        operate: '',
        status:false
    }, {
        key: '2',
        rName: 'Jim Green',
        rType: '',
        rTypeName: '',
        createTime: '2019/03/26',
        yonSys: '是',
        operate: '',
        status:true
    }, {
        key: '3',
        rName: 'Joe Black',
        rType: '',
        rTypeName: '',
        createTime: '2019/03/26',
        yonSys: '是',
        operate: '',
        status:true
    },
    ]
};

//添加内容列表
function Content(state = initState, action:any) {
    switch (action.type) {
        //新增功能
        case ADD_ADDROLE: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.data.push(action.value);
            // console.log(newState.data);
            return Object.assign({}, state, {
                data: newState.data
            });
        }
        //禁止功能
        case USE_FORBID:{
            const newState=JSON.parse(JSON.stringify(state));
            newState.data[action.index].status = false;
            console.log(newState.data);
            return Object.assign({}, state, {
                data: newState.data
            });

        }
        //正常功能
        case USE_ALLOW:{
            const newState=JSON.parse(JSON.stringify(state));
            newState.data[action.index].status = true;
            console.log(newState.data);
            return Object.assign({}, state, {
                data: newState.data
            });
        }
        //删除功能
        case DEL_ROWDATA: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.data.splice(action.index,1);
            return Object.assign({}, state, {
                data: newState.data
            })
        }

        default:
            return state
    }
}

export default Content;
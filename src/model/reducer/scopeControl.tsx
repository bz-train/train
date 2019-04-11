import { DEL_TABLEDATA } from '../action/scopeControl';
import { Icon, Button} from 'antd';
import React from 'react'

const tableData = {
    data: [
        {
            key: 1,
            name: '首页',
            urlInfo: '/',
            methodType: 'get',
            createTime: '2019/04/03',
            changeTime: '2019/04/03',
            funRemark: '首页',
        },
        {
            key: 2,
            name: '首页',
            urlInfo: '/',
            methodType: 'get',
            createTime: '2019/04/03',
            changeTime: '2019/04/03',
            funRemark: '用户与授权',
        },
        {
            key: 3,
            name: '首页',
            urlInfo: '/',
            methodType: 'get',
            createTime: '2019/04/03',
            changeTime: '2019/04/03',
            funRemark: '功能与角色',
        },
        {
            key: 4,
            name: '首页',
            urlInfo: '/template',
            methodType: 'get',
            createTime: '2019/04/03',
            changeTime: '2019/04/03',
            funRemark: '表单模板管理',
        },
        {
            key: 5,
            name: '首页',
            urlInfo: '/template',
            methodType: 'get',
            createTime: '2019/04/03',
            changeTime: '2019/04/03',
            funRemark: '表单实例管理',
        },
    ],
}

//添加内容列表
function scopeControl(state = tableData, action:any) {
    switch (action.type) {
        case DEL_TABLEDATA:
            return Object.assign({}, state, {
                // 后面的action.data 会覆盖state里面的data属性
                data: action.data // 获取了action里面的data值
            })
        case 'add_form_data':
            return Object.assign({}, state, {
                // 后面的action.data 会覆盖state里面的data属性
                data: action.data // 获取了action里面的data值
            })
        default:
            return state
    }
}

export default scopeControl;
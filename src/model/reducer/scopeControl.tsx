import {
    DEL_TABLE_DATA,
    ADD_FORM_DATA,
    EDIT_TABLE_DATA,
    SERACH_TABLE_DATA,
    LIMIT_TABLE_DATA,
    NORMAL_TABLE_DATA } from '../action/scopeControl';
import React from 'react';
import { message } from "antd";

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
            status: true
        },
        {
            key: 2,
            name: '首页',
            urlInfo: '/',
            methodType: 'get',
            createTime: '2019/04/03',
            changeTime: '2019/04/03',
            funRemark: '用户与授权',
            status: true
        },
        {
            key: 3,
            name: '首页',
            urlInfo: '/',
            methodType: 'get',
            createTime: '2019/04/03',
            changeTime: '2019/04/03',
            funRemark: '功能与角色',
            status: true
        },
        {
            key: 4,
            name: '首页',
            urlInfo: '/template',
            methodType: 'get',
            createTime: '2019/04/03',
            changeTime: '2019/04/03',
            funRemark: '表单模板管理',
            status: true
        },
        {
            key: 5,
            name: '首页',
            urlInfo: '/template',
            methodType: 'get',
            createTime: '2019/04/03',
            changeTime: '2019/04/03',
            funRemark: '表单实例管理',
            status: true
        },
    ],
    newData: []
};

//添加内容列表
function scopeControl(state = tableData, action:any) {
    switch (action.type) {
        case DEL_TABLE_DATA:{
            let newState = JSON.parse(JSON.stringify(state)) // 拷贝老数据
            newState.data.splice(action.id,1);
            for (let i = 0; i < newState.data.length; i++) {
                newState.data.key = i + 1
            }
            return Object.assign({}, state, {
                // 后面的action.data 会覆盖state里面的data属性
                data: newState.data
            });
            // return {     -- 这种方法可能更简单
            //     state: newState
            // }
        }
        case ADD_FORM_DATA:{
            let newState = JSON.parse(JSON.stringify(state));
            newState.data.push(action.data);
            return Object.assign({}, state, {
                data: newState.data
            })
        }
        case EDIT_TABLE_DATA: {
            return Object.assign({}, state, {
                data: action.data
            })
        }
        // 搜索
        case SERACH_TABLE_DATA: {
            let newState = JSON.parse(JSON.stringify(state));
            let copyData = newState; // 拷贝一份
            let i = 0;
            if (i > 0 ) {
                console.log(11)
            }
            i++;
            newState.newData = [];
            for (let i = 0; i < copyData.data.length; i++) {
                    if (copyData.data[i].funRemark.indexOf(action.data) > -1) {
                        newState.newData.push(copyData.data[i])
                    }
                }
                if (action.data === '') {
                    message.warning('请输入搜索数据',2);
                    return;
                } else {
                    return Object.assign({}, state, {
                        data: newState.newData
                    })
                }
        }
        // 禁用
        case LIMIT_TABLE_DATA: {
            let newState = JSON.parse(JSON.stringify(state));
            newState.data[action.index].status = false;
            return Object.assign({}, state, {
                data: newState.data
            })
        }
        // 取消禁用 -- 正常
        case NORMAL_TABLE_DATA: {
            let newState = JSON.parse(JSON.stringify(state));
            newState.data[action.index].status = true;
            return Object.assign({}, state, {
                data: newState.data
            })
        }
        default:
            return state
    }
}

export default scopeControl;
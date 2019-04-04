/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react"
import { Button, Input, Table, Badge, Menu, Dropdown, Icon, Modal } from 'antd'
import './index.scss';
import AddFun from './addFun';


export default class Content extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            name: '',
            visible: false,
            loading: false
        }
    }

    // 弹出框的函数
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({
            visible: false,
        });
        // 获取form表单元素
        let addFunDate = this.refs.addFunDate
        console.log(addFunDate)
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    delCol = () => {
        alert('是否删除？')
    }

    render() {
        // 额外的展开行函数
        const expandedRowRender = () => {
            const columns = [ // 展开列数据
                { title: 'Date', dataIndex: 'date', key: 'date' },
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Status', key: 'state', render: () => <span><Badge status="success" />Finished</span> },
                { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
                {
                    title: 'Action',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: () => (
                        <span className="table-operation">
            <a href="javascript:;">Pause</a>
            <a href="javascript:;">Stop</a>
            <Dropdown overlay={menu}>
              <a href="javascript:;">
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
                    ),
                },
            ];

            const data = [];
            for (let i = 0; i < 2; ++i) {
                data.push({
                    key: i,
                    date: '2014-12-24 23:12:00',
                    name: 'This is production name',
                    upgradeNum: 'Upgraded: 56',
                });
            }
            return (
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            );
        }
        //
        let menu = (
            <Menu>
                <Menu.Item>
                    Action 1
                </Menu.Item>
                <Menu.Item>
                    Action 2
                </Menu.Item>
            </Menu>
        );

        // table默认定义表头数据及索引
            const columns = [ // 列数据描述对象
                { title: '功能名', dataIndex: 'name', key: 'name' },
                { title: 'URL信息', dataIndex: 'urlInfo', key: 'urlInfo' },
                { title: 'method类型', dataIndex: 'form', key: 'form' },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                { title: '修改时间', dataIndex: 'changeTime', key: 'changeTime' },
                { title: '功能状态', dataIndex: 'funState', key: 'funState',render: () => {return(<span><Button>正常</Button><a className="Unuse" href="javascript:;">禁用</a></span>)} },
                { title: '功能备注', dataIndex: 'funRemark', key: 'funRemark' },
                { title: '操作', key: 'handle', render: () =>
                        <span>
                            <Icon type="edit" style={{color: '#1890ff'}}/><a href="javascript:;">编辑</a>
                            <a href="javascript:;">+新增子级功能</a>
                            <Icon type="delete" style={{color: 'red'}}/><a href="javascript:;" onClick={this.delCol} style={{color: "red"}}>删除</a>
                        </span> },
            ];

            // 默认表单数据
            const data = [
                {
                    key: 1,
                    name: '首页',
                    urlInfo: '/',
                    form: 'get',
                    createTime: '2019/04/03',
                    changeTime: '2019/04/03',
                    funRemark: '首页',
                },
                {
                    key: 2,
                    name: '首页',
                    urlInfo: '/',
                    form: 'get',
                    createTime: '2019/04/03',
                    changeTime: '2019/04/03',
                    funRemark: '用户与授权',
                },
                {
                    key: 3,
                    name: '首页',
                    urlInfo: '/',
                    form: 'get',
                    createTime: '2019/04/03',
                    changeTime: '2019/04/03',
                    funRemark: '功能与角色',
                },
                {
                    key: 4,
                    name: '首页',
                    urlInfo: '/template',
                    form: 'get',
                    createTime: '2019/04/03',
                    changeTime: '2019/04/03',
                    funRemark: '表单模板管理',
                },
                {
                    key: 5,
                    name: '首页',
                    urlInfo: '/template',
                    form: 'get',
                    createTime: '2019/04/03',
                    changeTime: '2019/04/03',
                    funRemark: '表单实例管理',
                },
            ];

            return (
            <div className="home-content">
                <div className="content-box">
                    <div className="content-top">
                        <div className="content-input">
                            菜单名称：<Input placeholder="请输入菜单名称" size="small"/>
                        </div>
                        <div className="content-add">
                            <Button className="content-add_btn" type="primary" icon="search">搜索</Button>
                            <Button onClick={this.showModal}>+ 新增根级功能</Button>
                        </div>
                    </div>
                    <div className="content-bottom">
                        <Table
                            className="components-table-demo-nested"
                            columns={columns}
                            expandedRowRender={expandedRowRender}
                            dataSource={data}
                        />
                        {/*dataSource：表格数据源*/}
                        {/*只有当visiable为true的时候，才引入modal，因为model不会自动清空数据*/}
                        <div>
                            {this.state.visible?
                                <Modal
                                    title="新增根级功能"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    footer={[
                                        <div style={{textAlign: 'center'}}>
                                            <Button key="back" onClick={this.handleCancel}>取消</Button>,
                                            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                                                新增
                                            </Button>
                                        </div>
                                    ]}
                                >
                                    {/*// 嵌入表单组件*/}
                                    <AddFun ref="addFunDate"/>
                                </Modal>: ""}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react"
import { Button, Input, Table, Badge, Menu, Dropdown, Icon, Modal } from 'antd'
import './index.scss';
import AddFun from './addFun';
 import { connect } from 'react-redux';
 // import { del } from '../../model/action/scopeControl';


class scopeControl extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            name: '',
            visible: false,
            loading: false,
            columns: [ // 列数据描述对象
                { title: '功能名', dataIndex: 'name', key: 'name' },
                { title: 'URL信息', dataIndex: 'urlInfo', key: 'urlInfo' },
                { title: 'method类型', dataIndex: 'methodType', key: 'methodType' },
                { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
                { title: '修改时间', dataIndex: 'changeTime', key: 'changeTime' },
                { title: '功能状态', dataIndex: 'funState', key: 'funState',render: () => {return(<span><Button>正常</Button><a className="Unuse" href="javascript:;">禁用</a></span>)} },
                { title: '功能备注', dataIndex: 'funRemark', key: 'funRemark' },
                { title: '操作', key: 'handle', render: (text, record, index) =>
                        <span>
                            <Icon type="edit" style={{color: '#1890ff'}}/><a href="javascript:;">编辑</a>
                            <a href="javascript:;">+新增子级功能</a>
                            <Icon type="delete" style={{color: 'red'}}/><a href="javascript:;" data-index={index} onClick={this.delCol} style={{color: "red"}}>删除</a>
                        </span> },
            ]
        }
    }

    // 弹出框的函数
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    // modal确认
    handleOk = () => {
        // 获取form表单元素
        let addFunDate = this.refs.form;
        addFunDate.validateFields((err: any, value: any) => {
            if (!err) {
                let formData = value;
                let data = this.props.data;
                formData.createTime = '2019/04/03';
                formData.changeTime = '2019/04/03';
                formData.funRemark = '权限管理';
                formData.key = data.length+1;
                data.push(formData);
                this.props.addData(data)
                // this.setState({
                //     data,
                //     visible: false,
                // })
            }
        })
        // console.log(addFunDate)
    }

    // modal取消
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    // 删除函数
    delCol = (e: any) => {
        let data = this.props.data;
        data.splice(e.target.getAttribute('data-index'),1);
        // this.setState({
        //     data
        // })
        this.props.delDispatch(data)
    }

    // // 额外的展开行函数
    expandedRowRender = () => {
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

    render() {
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
                            columns={this.state.columns}
                            // expandedRowRender={this.expandedRowRender}
                            dataSource={this.props.data}
                            rowKey={record => record.key}
                            // pagination={{
                            //     pageSize: 3, // 一页显示条数
                            //     total: this.state.columns.key,
                            //     showSizeChanger: true, //是否显示可以设置几条一页
                            // }}
                        />
                        {/*dataSource：表格数据源*/}
                        {/*只有当visiable为true的时候，才引入modal，因为model不会自动清空数据*/}
                        <div className="bottom-modal">
                            {this.state.visible?
                                <Modal
                                    title="新增根级功能"
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    footer={[
                                        <div style={{textAlign: 'center'}}>
                                            <Button key="back" onClick={this.handleCancel}>取消</Button>,
                                            <Button key="submit" type="primary" onClick={this.handleOk}>
                                                新增
                                            </Button>
                                        </div>
                                    ]}
                                >
                                    {/*// 嵌入表单组件*/}
                                    <AddFun ref="form"/>
                                </Modal>: ""}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    // state.control 因为这是多个reducer合成的（拿数据要小心）
    return {
        data: state.control.data,
        columns: state.control.columns
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        delDispatch: (data: any) => {
            const action = {
                type: 'del_tableData',
                data
            }
            dispatch(action)
        },
        addData: (data: any) => {
            const action = {
                type: 'add_form_data',
                data
            }
            dispatch(action)
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(scopeControl)
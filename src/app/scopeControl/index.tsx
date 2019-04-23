/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react";
import { Button, Input, Table, Badge, Menu, message,
    Dropdown, Icon, Modal, Form,InputNumber,Popconfirm } from 'antd'
import './index.scss';
import AddFun from './addFun';
 import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as scopeActions from "../../model/action/scopeControl";


const FormItem = Form.Item;
const EditableContext = React.createContext();  // 不懂的地方1

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };
    render() {
        const {editing, dataIndex, title, inputType, record, index, ...restProps} = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

// ---------------------分界线---------------------------------------------

class scopeControl extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            editingKey: '',
            inputValue: '',
            columns: [ // 列数据描述对象
                {
                    title: '功能名',
                    dataIndex: 'name',
                    key: 'name',
                    editable: true,
                },
                {
                    title: 'URL信息',
                    dataIndex: 'urlInfo',
                    key: 'urlInfo',
                    editable: true,
                },
                {
                    title: 'method类型',
                    dataIndex: 'methodType',
                    key: 'methodType',
                    editable: true,
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                    editable: true,
                },
                {
                    title: '修改时间',
                    dataIndex: 'changeTime',
                    key: 'changeTime',
                    editable: true,
                },
                {
                    title: '功能状态',
                    dataIndex: 'funState',
                    key: 'funState',
                    render: (text:any, record:any, index:any) => {
                        return (
                            <span>
                                <Button onClick={this.handleNormal.bind(this,text,record,index)}>正常</Button>
                                <a className="Unuse" href="javascript:;" onClick={this.limitUse.bind(this,text,record,index)}>禁用</a>
                            </span>
                        )
                    }
                 },
                {
                    title: '功能备注',
                    dataIndex: 'funRemark',
                    key: 'funRemark',
                    editable: true,
                },
                {
                    title: '操作',
                    key: 'handle',
                    render: (text: any, record: any, index: any) => {
                        const { editingKey } = this.state;
                        const editable = this.isEditing(record);
                        return (
                            <div>
                                {
                                    editable ? (
                                            <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                href="javascript:;"
                                                onClick={() => this.save(form, record.key)}
                                                style={{ marginRight: 8 }}
                                            >
                                                保存
                                            </a>
                                        )}
                                        </EditableContext.Consumer>
                                    <Popconfirm
                                        title="Sure to cancel?"
                                        onConfirm={() => this.cancel(record.key)}
                                    >
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
                                        ) :
                                        (
                                            <span>
                                                <Icon type="edit" style={{color: '#1890ff'}}/>
                                                <a disabled={editingKey !== ''} onClick={() => this.edit(record.key,record.status)}>编辑</a>
                                                <a href="javascript:;">+新增子级功能</a>
                                                <Icon type="delete" style={{color: 'red'}}/><a href="javascript:;" data-index={index} onClick={this.delCol.bind(this,index)} style={{color: "red"}}>删除</a>
                                            </span>
                                        )
                                }

                            </div>
                            )
                    }
                },
            ]
            
        }
    }


    isEditing = (record:any) => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };
    // 确认保存
    save = (form:any, key:any) => {
        form.validateFields((error:any, row:any) => {
            if (error) {
                return;
            }
            const newData = [...this.props.data];
            // findIndex() 找到元素的位置（找到后不会再循环），找不到就返回-1
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.props.actions.editData(newData);
                this.setState({ editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ editingKey: '' });
            }
        });
    }

    edit = (key:any,status:boolean) => {
        if (status === false) {
            message.warning('不能编辑，禁用中')
        } else {
            this.setState({ editingKey: key });
        }
    };

// ============函数分界线=====================================
    // 弹出框的函数
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    // modal确认
    handleOk = () => {
        // 获取form表单元素
        let form = this.refs.form;
        form.validateFields((err: any, value: any) => {
            if (!err) {
                let formData = value;
                formData.createTime = '2019/04/03';
                formData.changeTime = '2019/04/03';
                formData.funRemark = '权限管理';
                formData.status = true;
                formData.key = this.props.data.length+1;
                this.props.actions.addData(formData);
                // 关闭
                this.setState({
                    visible: false,
                });
            }
        })
    };
    // modal取消
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    // 删除函数
    delCol = (id:any) => {
        // 调用action的函数
        this.props.actions.delDispatch(id)
    };
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
                columns={ columns }
                dataSource={ data }
                pagination={ false }
            />
        );

    };

    input = (e:any) => {
        this.setState({
            inputValue: e.target.value
        })
    };
    // 搜索
    search = () => {
        let inputValue = this.state.inputValue;
        this.props.actions.searchData(inputValue);
        this.setState({
            inputValue: ''
        })
    };

    // 禁用
    limitUse = (text:any,record:any,index:any) => {
        // console.log(text)  undefined
        // console.log(record) // 对象数据
        // console.log(index) // 索引值 0
        this.props.actions.limitData(index)
        // console.log(this.props.data)
    };
    // 取消禁用--正常
    handleNormal = (text:any,record:any,index:any) => {
        this.props.actions.normalData(index)
    }

    // 显示是否被禁用 -- 默认展示
    rowClassName = (record: any) => {
        return record.status === false ? 'limitUse': ''
    };


    render() {
        // 定义常量 不会修改
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.state.columns.map((col:any) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <div className="home-content">
                <div className="content-box">
                    <div className="content-top">
                        <div className="content-input">
                            菜单名称：<Input placeholder="请输入菜单名称" size="small" onChange={this.input}/>
                        </div>
                        <div className="content-add">
                            <Button className="content-add_btn" type="primary" icon="search" onClick={this.search}>搜索</Button>
                            <Button onClick={this.showModal}>+ 新增根级功能</Button>
                        </div>
                    </div>
                    <div className="content-bottom">
                        <EditableContext.Provider value={this.props.form}>
                            <Table
                                components={components}
                                bordered
                                expandedRowRender={this.expandedRowRender}
                                rowKey={record => record.key}
                                dataSource={this.props.data}
                                columns={columns}
                                rowClassName={this.rowClassName}
                                // pagination={{
                                //     onChange: this.cancel,
                                //     pageSize: 3
                                // }}
                            />
                        </EditableContext.Provider>

                        {/*<Table*/}
                            {/*className="components-table-demo-nested"*/}
                            {/*columns={this.state.columns}*/}
                            {/*expandedRowRender={this.expandedRowRender}*/}
                            {/*dataSource={this.props.data}*/}
                            {/*rowKey={record => record.key}*/}
                            {/*// pagination={{*/}
                            {/*//     pageSize: 3, // 一页显示条数*/}
                            {/*//     total: this.state.columns.key,*/}
                            {/*//     showSizeChanger: true, //是否显示可以设置几条一页*/}
                            {/*// }}*/}
                        {/*/>*/}

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
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: bindActionCreators(scopeActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(scopeControl))
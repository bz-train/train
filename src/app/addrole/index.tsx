import React,{Component} from "react"
import {Table, Divider,Modal,Button,} from 'antd'
import Head from './head'
import '../content/index.scss'
import {connect} from "react-redux";
import { bindActionCreators } from 'redux'
import * as addAddRole from "../../model/action/addrole";
class AddRole extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {visible: false, loading: false,}
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        let head = this.refs.head;
        head.validateFields((err:any,value:any) => {
            if (!err) {
                this.props.actions.addAddRole(value);
                this.setState({
                    visible:false
                })
            }
        });


        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState({
                loading: false,
                visible: false });
        }, 1000);
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const  columns=[
            {
                title: '序号',
                dataIndex: 'rNumber',
                key: 'rNumber',

            },
                {
                    title: '角色名称',
                    dataIndex: 'rName',
                    key: 'rName'
                },
                {
                    title: '角色类型',
                    dataIndex: 'rType',
                    key: 'rType'
                },
                {
                    title: '角色类型名称',
                    dataIndex: 'rTypeName',
                    key: 'rTypeName'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                }, {
                title: '是否系统角色',
                dataIndex: 'yonSys',
                key: 'yonSys',
            }, {
                title: '状态',
                key: 'tempState',
                render: () => (
                <span>
                <a href="javascript:;"><Button className="zhuangtai">正常</Button></a>
                <Divider type="vertical"/>
                <a href="javascript:;" className="zhuangtai01">禁用</a>
                </span>
                ),
            },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    key: 'operate',
                },];


        return (
            <div className="o-home-content">
                <Button className="adressButton" type="primary" onClick={this.showModal}>+ 新增</Button>
                <Table columns={columns}
                       dataSource={this.props.data}
                />
                <Modal
                    visible={this.state.visible}
                    title="新增"
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            创建
                        </Button>,

                    ]}

                >
                    <Head ref="head" />
                </Modal>

            </div>
        );
    }
}
function mapStateToProps(state:any) {
    return {
        data:state.add.data
    };
}

function mapDispatchToProps(dispatch:any, ownProps:any) {
    return {
        actions: bindActionCreators(addAddRole, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddRole)
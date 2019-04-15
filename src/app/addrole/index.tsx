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
        this.state = {
            visible: false,
            loading: false,
            createTime:''}
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        //获取modal输入的值
        let head = this.refs.head;
        head.validateFields((err:any,value:any) => {
            if (!err) {
                //将子组件传来的创建时间加到获取到的form表单输入值
                let newData = value;
                newData.createTime=this.state.createTime;
                //派发action
                this.props.actions.addAddRole(newData);
                this.setState({
                    visible:false,
                });


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
    //获取子组件传来的dtaString并存入creatTime
    getTime=(dateString:any)=>{
        console.log(dateString);
        this.setState({
            createTime:dateString
        })
    };

    handleAllow=(text:any,record:any,index:any)=>{
        console.log(text,record,index);
        this.props.actions.allowData(index);
    };
    handleForbid=(index:any)=>{
        // console.log('aaaaaaa'+index);
        //派发下标给action
        this.props.actions.forbidData(index);
    };
    forbidColor=(record: any)=>{
        //console.log(record);
        //动态设置显示className
      return record.status === false ? 'forbidColor': '';
    };

    render() {
        const  columns=[
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',

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
                render: (text:any,record:any,index:any) => (
                <span>
                <a href="javascript:;"><Button className="zhuangtai" onClick={this.handleAllow.bind(this,text,record,index)}>正常</Button></a>
                <Divider type="vertical"/>
                <a href="javascript:;" className="zhuangtai01"  onClick={this.handleForbid.bind(this,index)}>禁用</a>
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
                       //设置行的类名
                       rowClassName={this.forbidColor}
                />
                <Modal
                    visible={this.state.visible}
                    title="新增"
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={this.state.loading}
                            onClick={this.handleOk}>
                            创建
                        </Button>,

                    ]}

                >
                    <Head ref="head" getTime={this.getTime}/>
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
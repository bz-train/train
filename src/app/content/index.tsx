/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react"
import {Table, Divider,Modal,Button} from 'antd'
import './index.scss'
import Head from './head'
import '../index.scss'

export default class Content extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = { visible: false,loading: false, }

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { visible, loading } = this.state;
        const columns = [{
            title: '序号',
            dataIndex: '序号',
            key: '序号',

        },
            {
                title: '角色名称',
                dataIndex: '角色名称',
                key: '角色名称'
            },
            {
                title: '角色类型',
                dataIndex: '角色类型',
                key: '角色类型'
            },
            {
                title: '角色类型名称',
                dataIndex: '角色类型名称',
                key: '角色类型名称'
            },
            {
                title: '创建时间',
                dataIndex: '创建时间',
                key: '创建时间',
            }, {
                title: '是否系统角色',
                dataIndex: '是否系统角色',
                key: '是否系统角色',
            }, {
                title: '状态',
                key: '状态',
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
                dataIndex: '操作',
                key: '操作',
            }];

        const data = [{
            key: '1',
            序号: '1',
            角色名称: 'John Brown',
            角色类型: '',
            角色类型名称: '',
            创建时间: '2019/03/26',
            是否系统角色: '是',
            操作: '',
        }, {
            key: '2',
            序号: '2',
            角色名称: 'Jim Green',
            角色类型: '',
            角色类型名称: '',
            创建时间: '2019/03/26',
            是否系统角色: '是',
            操作: '',
        }, {
            key: '3',
            序号: '3',
            角色名称: 'Joe Black',
            角色类型: '',
            角色类型名称: '',
            创建时间: '2019/03/26',
            是否系统角色: '是',
            操作: '',
        }];
        return (
            <div className="o-home-content">
                <Button className="adressButton" type="primary" onClick={this.showModal}>+ 新增</Button>
                <Table columns={columns} dataSource={data}/>
                <Modal

                    visible={visible}
                    title="新增"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            创建
                        </Button>,
                    ]}
                >
                    <Head />
                </Modal>
            </div>
        );
    }
}
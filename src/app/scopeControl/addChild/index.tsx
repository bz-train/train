/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react";
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal,} from 'antd';


class newChildFun extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            msg: '这是新增根级功能',
        }
    }

    // 数据
    render() {
        const tailFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 0,
                },
            },
        };
        const { getFieldDecorator }=this.props.form;
        return (
            <Form
            >
                <Form.Item
                    {...tailFormItemLayout}
                    label={'属性名：'}
                >
                    {getFieldDecorator('name', {
                        rules:[{required:true,message:'功能名不能为空',}]})
                    (
                        <Input  placeholder="请输入属性名"/>
                    )}
                </Form.Item>
                <Form.Item
                    {...tailFormItemLayout}
                    label="属性值："
                >
                    {getFieldDecorator ('value')(
                        <Input className="addInput"  placeholder="请输入属性地址"/>
                    )}
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(newChildFun);

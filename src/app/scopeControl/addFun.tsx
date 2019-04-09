/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react";
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,} from 'antd';
import './addFun.scss';
import 'antd/dist/antd.css';

class AddFun extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            msg: '这是新增根级功能',
            confirmDirty: false,
            autoCompleteResult: []
        }
    }
    // 函数
    // 自定义函数获取数据
    getItemsValue = () => {
        let value = this.props.form.getFieldsValue();
        return value;
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
        const { form: { validateFields } } = this.props;
        return (
            <div className="content">
                <Form
                >
                    <Form.Item
                        {...tailFormItemLayout}
                        label={'功能名：'}
                    >
                        {getFieldDecorator('name', {
                            rules:[{required:true,message:'功能名不能为空',}]})
                        (
                            <Input  placeholder="请输入功能名"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...tailFormItemLayout}
                        label="功能URL地址："
                    >
                        {getFieldDecorator ('urlInfo')(
                            <Input className="addInput"  placeholder="请输入URL地址"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...tailFormItemLayout}
                        label="图标："
                    >
                        {getFieldDecorator ('icon')(
                            <Input className="addInput" placeholder="请输入图标名称"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...tailFormItemLayout}
                        label="排序索引："
                    >
                        {getFieldDecorator ('sortUse')(
                            <Input className="addInput" placeholder="请输入排序索引"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...tailFormItemLayout}
                        label="URL跳转方式："
                    >
                        {getFieldDecorator ('methodType',{
                            // 设置input默认值
                            initialValue:"GET"
                        })(
                            <Input className="addInput" />
                        )}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create()(AddFun);
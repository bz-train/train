import React from "react";
import {DatePicker,Form, Input, Select,} from 'antd';
const { Option } = Select;

class Head extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }

    handleSubmit = (e:any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err:any, values:any) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    dateChange = (date:any, dateString:any) => {
        console.log(date, dateString)
    }
    handleChange = (value:any) => {
        console.log(`selected ${value}`);
    }
    handleBlur=()=> {
        console.log('blur');
    }
    handleFocus=()=> {
        console.log('focus');
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };



        return(
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="角色编码"
                    >
                        {getFieldDecorator('rnumber', {
                            rules: [
                               {
                                required: true, message: '不能为空!',
                            }],
                        })(
                            <Input placeholder="请输入角色业务编码"/>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="角色名称"
                    >
                        {getFieldDecorator('rname', {
                            rules: [
                                {
                                    required: true, message: '不能为空!',
                                }],
                        })(
                            <Input placeholder="请输入角色名称(英文)"/>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="角色类型" className="iconselect"
                    >
                        {getFieldDecorator('rtype', {
                            rules: [
                                {
                                    required: true, message: '不能为空!',
                                }],
                        })(
                            <Select
                                showSearch
                                style={{ width: 315 }}
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="0">类型1</Option>
                                <Option value="1">类型2</Option>
                                <Option value="2" disabled>类型3</Option>
                                <Option value="3">类型4</Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="是否系统角色"
                    >
                        {getFieldDecorator('rsys', {
                            rules: [
                                {
                                    required: true, message: '不能为空!',
                                }],
                        })(
                            <Select
                                showSearch
                                style={{ width: 315 }}
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="0">是</Option>
                                <Option value="1">否</Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="信息说明"
                    >
                        {getFieldDecorator('rmsg', {
                            rules: [
                                {
                                    required: true, message: '不能为空!',
                                }],
                        })(
                            <Input placeholder="请填写角色信息说明"/>
                        )}
                    </Form.Item>

                    <Form.Item
                        label="创建时间"
                    >
                        {getFieldDecorator('rtime', {
                            rules: [],
                        })(
                            <DatePicker onChange={this.dateChange} className="data-t-day"/>
                        )}
                    </Form.Item>
                </Form>

            </div>
        );
    }
}
export default Form.create()(Head);
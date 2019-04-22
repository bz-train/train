import React from 'react'
import {Form, Input,DatePicker, Select,} from 'antd';
const Option = Select.Option;

function handleChange(value:any){
    console.log(`selected ${value}`);

}

function handleBlur() {
    console.log('blur');
}
function handleFocus() {
    console.log('focus');
}
interface ReactProps {
    form?:any;
    getTime?:any;
    handleOk?:any;
}
class Head extends React.Component<ReactProps,{}> {
    constructor(props:any){

        super(props);
        this.state = {
            confirmDirty: false,
        }
    };

    handleSubmit = (e:any) => {
        e.preventDefault();
    };

     onChange=(date:any, dateString:any) =>{
        console.log(date, dateString);
        this.props.getTime(dateString);
    };
    getKeyValue=(e:any)=>{
      console.log(e.keyCode);
      if(e.keyCode==13){
          this.props.handleOk();
      }
    };

    render() {
        const { getFieldDecorator } =this.props.form;


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

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} onKeyUp={this.getKeyValue}>
                <Form.Item
                    label="角色编码"
                >
                    {getFieldDecorator('key', {
                        rules: [{
                            required: true, message: '不能为空',
                        }],
                    })(
                        <Input placeholder="请输入角色业务编码" />
                    )}
                </Form.Item>

                <Form.Item
                    label="角色名称"
                >
                    {getFieldDecorator('rName', {
                        rules: [{
                            required: true, message: '不能为空',
                        }],
                    })(
                        <Input placeholder="请输入角色业名称(英文)"/>
                    )}
                </Form.Item>

                <Form.Item
                    label="角色类型"
                >
                    {getFieldDecorator('rType', {

                    })(
                        <Select
                            showSearch
                            optionFilterProp="children"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input:any, option:any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="类型1">类型1</Option>
                            <Option value="类型2">类型2</Option>
                            <Option value="类型3">类型3</Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item
                    label="是否系统角色"
                >
                    {getFieldDecorator('yonSys', {
                    })(
                        <Select

                            showSearch
                            optionFilterProp="children"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input:any, option:any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="是">是</Option>
                            <Option value="否">否</Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item
                    label="信息说明"
                >
                    {getFieldDecorator('msg', {
                        rules: [{
                            required: true, message: '不能为空',
                        }],
                    })(
                        <Input

                            placeholder="请填写角色信息说明"/>
                    )}
                </Form.Item>

                <Form.Item
                    label="创建时间"
                >
                    {getFieldDecorator('createTime',{

                        })(
                            <DatePicker onChange={this.onChange}
                                        format='YYYY/MM/DD'
                                        style={{width:315}}
                                        placeholder="请选择创建时间"/>
                        )}
                </Form.Item>

            </Form>
        );
    }
}

export default Form.create()(Head);
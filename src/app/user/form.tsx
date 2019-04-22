import React,{Component} from 'react'
import  {Form,Input,DatePicker,} from 'antd'


interface ReactProps{
    form?:any
}

class Forms extends Component<ReactProps,any>{
    constructor(props:any){
        super(props)
        this.state = {
         
        }
    }

    // 密码
    validateToNextPassword = (rule:any, value:any, callback:any) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
     }

     // 验证密码
     compareToFirstPassword = (rule:any, value:any, callback:any) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一致!');
        } else {
          callback();
        }
      }

    // 验证密码
    handleConfirmBlur = (e:any) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
     
    // 阻止提交事件
    handleSubmit = (e:any) => {
        e.preventDefault();
    }

    // 时间发生变化的回调
    onChange = (value:any,dataString:any) => {
      this.props.getTime(dataString)
       console.log('v'+value)
       console.log('s'+dataString)  
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        // console.log('time'+this.state.time)
        // 手机号码
       /*  const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
          }) */

        //日期
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择日期!' }],
          };

        const tailFormItemLayout = {
            labelCol: {  //同<Col>等价
              xs: { span: 6 },
              sm: { span: 6 },
            },
            wrapperCol: {  
              xs: {
                span: 16,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 0,
              },
            },
          };
        return (  
            <Form {...tailFormItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="用户姓名：">
                    {getFieldDecorator('username')(
                        <Input placeholder="请输入用户姓名"/>
                    )}
                
                </Form.Item>
                <Form.Item label="账户名称：">
                    {getFieldDecorator('account')(
                        <Input placeholder="请输入账户名称"/>
                    )}
                
                </Form.Item>
                <Form.Item label="初始密码：">
                    {getFieldDecorator('password', {
                        rules: [{
                        required: true, message: '请输入你的密码!',
                        }, {
                        validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" placeholder="请输入密码"/>
                    )}

                </Form.Item>
                <Form.Item label="再次输入：">
                    {getFieldDecorator('confirm', {
                        rules: [{
                        required: true, message: '请再次输入你的密码!',
                        }, {
                        validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" placeholder="请再次输入密码" onBlur={this.handleConfirmBlur}  />
                    )}
                    
                </Form.Item>
                <Form.Item label="手机号码：">
                    {getFieldDecorator('telnumber', {
                        rules: [{ required: true, message: '请输入你的电话号码!' }],
                    })(
                        <Input placeholder="请输入手机号码" style={{ width: '100%' }} />
                    )}
                    
                </Form.Item>
                <Form.Item label="入职时间：">
                    {getFieldDecorator('time', config)(
                        <DatePicker  onChange={this.onChange} format='YYYY/MM/DD' style={{width:'314px'}} placeholder="请选择入职时间"/>
                    )}
                </Form.Item>
            </Form>
        )
    }
}
//	经 Form.create() 包装过的组件会自带 this.props.form 属性
export default Form.create()(Forms)
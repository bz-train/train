/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react"
import {Form, Input,Select, Icon, Tabs, message} from 'antd'
import './index.scss'
import axios from '@utils/axios'

const FormItem = Form.Item;

class Login extends Component<any,any> {

    handleSubmit = (event:any) => {
        event.preventDefault();
        localStorage.setItem('name','cl');
        this.props.history.push("/home");
        axios.get('/login?id=12345')
        .then(function (response:any) {
            console.log(response);
        })
        .catch(function (error:any) {
            console.log(error);
        });
    }

    register = () => {
        this.props.history.push("/register");
    }

    render() {
        const formItemLayout = {
            wrapperCol: {span: 24}
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="o-login">
                <div className="login-t">
                    <div className="title">培训平台</div>
                </div>
                <div className="login-c">
                    <Form layout={'horizontal'}
                          onSubmit={this.handleSubmit} >
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('phone', {
                                rules: [{
                                    required: true,
                                    message: '请输入手机号!',
                                    whitespace: true
                                }]
                            })(
                                <Input  autoComplete="off"
                                        placeholder="请输入手机号"
                                        addonBefore={<Icon type="mobile" />}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('secret',
                                {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        message: '请输入密码!',
                                        whitespace: true
                                    }]
                                })(
                                <Input type="password" autoComplete="off"
                                       placeholder="请输入密码" addonBefore={<Icon type="lock" />}
                                />
                            )}
                        </FormItem>
                        <FormItem{...formItemLayout}>
                            <button type="submit" >登录</button>
                        </FormItem>
                        <div className="login-reg" onClick={this.register}>注册</div>
                    </Form>
                </div>
            </div>
        );
    }
}

const login = Form.create({})(Login)
export default login

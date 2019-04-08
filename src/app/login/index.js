var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import { Component } from "react";
import { Form, Input, Icon } from 'antd';
import './index.scss';
import axios from '@utils/axios';
var FormItem = Form.Item;
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubmit = function (event) {
            event.preventDefault();
            localStorage.setItem('name', 'cl');
            _this.props.history.push("/home");
            axios.get('/login?id=12345')
                .then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                console.log(error);
            });
        };
        _this.register = function () {
            _this.props.history.push("/register");
        };
        return _this;
    }
    Login.prototype.render = function () {
        var formItemLayout = {
            wrapperCol: { span: 24 }
        };
        var getFieldDecorator = this.props.form.getFieldDecorator;
        return (React.createElement("div", { className: "o-login" },
            React.createElement("div", { className: "login-t" },
                React.createElement("div", { className: "title" }, "API\u7F51\u5173\u5E73\u53F0")),
            React.createElement("div", { className: "login-c" },
                React.createElement(Form, { layout: 'horizontal', onSubmit: this.handleSubmit },
                    React.createElement(FormItem, __assign({}, formItemLayout), getFieldDecorator('phone', {
                        rules: [{
                                required: true,
                                message: '请输入手机号!',
                                whitespace: true
                            }]
                    })(React.createElement(Input, { autoComplete: "off", placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7", addonBefore: React.createElement(Icon, { type: "mobile" }) }))),
                    React.createElement(FormItem, __assign({}, formItemLayout), getFieldDecorator('secret', {
                        initialValue: '',
                        rules: [{
                                required: true,
                                message: '请输入密码!',
                                whitespace: true
                            }]
                    })(React.createElement(Input, { type: "password", autoComplete: "off", placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801", addonBefore: React.createElement(Icon, { type: "lock" }) }))),
                    React.createElement(FormItem, __assign({}, formItemLayout),
                        React.createElement("button", { type: "submit" }, "\u767B\u5F55")),
                    React.createElement("div", { className: "login-reg", onClick: this.register }, "\u6CE8\u518C")))));
    };
    return Login;
}(Component));
var login = Form.create({})(Login);
export default login;
//# sourceMappingURL=index.js.map
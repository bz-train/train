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
import { Menu, Icon } from 'antd';
import Bundle from '../Bundle';
import { renderRoutes } from 'react-router-config';
import './index.scss';
var SubMenu = Menu.SubMenu;
var Root = function (props) {
    var key = props.location.pathname;
    var routes = props.route.routes;
    var index = routes.findIndex(function (item) { return item.path == key; });
    if (index !== -1) {
        var item_1 = routes[index];
        item_1.component = function () {
            var path = "" + item_1.lazyComponent;
            return React.createElement(Bundle, __assign({}, props, { goUrl: path }));
        };
        return (React.createElement("div", { className: "o-home-content" }, renderRoutes([item_1])));
    }
    else {
        return (React.createElement("div", null, "\u65E0\u5BF9\u5E94\u7684\u9875\u9762"));
    }
};
var routes = [{
        component: Root,
        routes: [
            {
                path: '/home',
                lazyComponent: './content/index',
            },
            {
                path: '/home/user',
                lazyComponent: './UserManage/index',
            },
            {
                path: '/home/application',
                lazyComponent: './ApplicationManage/index',
            },
            {
                path: '/home/apilist',
                lazyComponent: './APIListManage/index',
            },
            {
                path: '/home/apigroup',
                lazyComponent: './APIGroupManage/index',
            },
            {
                path: '/home/auth',
                lazyComponent: './AuthManage/index',
            }
        ]
    }];
var Home = (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleCollapsed = function () {
            _this.setState({
                collapsed: !_this.state.collapsed,
            });
        };
        _this.doMenuClick = function (data) {
            _this.props.history.push(data.key);
        };
        _this.state = {
            collapsed: false,
        };
        return _this;
    }
    Home.prototype.render = function () {
        return (React.createElement("div", { className: "o-home" },
            React.createElement("div", { className: "o-home-head" },
                React.createElement("div", { className: "title" }, "API\u7F51\u5173\u5E73\u53F0")),
            React.createElement("div", { className: "o-home-body" },
                React.createElement("div", { className: "o-nav" },
                    React.createElement("div", { className: "o-menu-fold" }),
                    React.createElement(Menu, { defaultSelectedKeys: ['1'], defaultOpenKeys: ['sub1'], mode: "inline", theme: "dark", onClick: this.doMenuClick, inlineCollapsed: this.state.collapsed },
                        React.createElement(Menu.Item, { key: "/home/user" },
                            React.createElement(Icon, { type: "pie-chart" }),
                            React.createElement("span", null, "\u7528\u6237\u7BA1\u7406")),
                        React.createElement(Menu.Item, { key: "/home/application" },
                            React.createElement(Icon, { type: "desktop" }),
                            React.createElement("span", null, "\u5E94\u7528\u7BA1\u7406")),
                        React.createElement(SubMenu, { key: "sub1", title: React.createElement("span", null,
                                React.createElement(Icon, { type: "mail" }),
                                React.createElement("span", null, "API\u7BA1\u7406")) },
                            React.createElement(Menu.Item, { key: "/home/apilist" }, "API\u5217\u8868\u7BA1\u7406"),
                            React.createElement(Menu.Item, { key: "/home/apigroup" }, "API\u5206\u7EC4\u7BA1\u7406")),
                        React.createElement(SubMenu, { key: "sub2", title: React.createElement("span", null,
                                React.createElement(Icon, { type: "inbox" }),
                                React.createElement("span", null, "\u6743\u9650\u7BA1\u7406")) },
                            React.createElement(Menu.Item, { key: "/home/auth" }, "\u89D2\u8272\u7BA1\u7406")))),
                React.createElement("div", { className: "o-home-c" }, renderRoutes(routes)))));
    };
    return Home;
}(Component));
export default Home;
//# sourceMappingURL=index.js.map
/**
 * Created by chenlei on 2018/5/30.
 */
import * as React from "react"
import { Component } from "react"
import { Menu, Icon, Button } from 'antd';
import Bundle from '../Bundle'
import { renderRoutes } from 'react-router-config'

import './index.scss'

const SubMenu = Menu.SubMenu;

// 懒加载函数封装。
const Root = (props: any) => {
    let key=props.location.pathname;
    let routes = props.route.routes;
    let index = routes.findIndex((item:any) => item.path==key);
    if(index!==-1){
        let item = routes[index];
        item.component =  () => {
            const path=`${item.lazyComponent}`
            return <Bundle {...props} goUrl={path} />
        }
        return (
            <div className="o-home-content">
                {renderRoutes([item])}
            </div>
        )
    }else {
        return (
            <div>无对应的页面</div>
        )
    }

}

const routes: any[] = [{
    component:Root,
    routes:[
        {
            path: '/home',
            lazyComponent: './content/index',
        },
        {
            path: '/home/scopeControl',
            lazyComponent: './scopeControl/index',
        }
    ]
}]

export default class Home extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            collapsed: false,
            menus : [
                {
                    key: '/home/user',
                    title:'用户管理',
                    icon: 'pie-chart'
                }, {
                    key:'sub3',
                    title:'权限管理',
                    icon: 'inbox',
                    children:[
                    {
                        key: '/home/scopeControl',
                        title: '权限页面',
                        icon: 'table'
                    }
                    ]
                },]
        }


    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    doMenuClick = (data:any) => {
        this.props.history.push(data.key);
    }

    render() {
        const { menus } = this.state;
        return (
            <div className="o-home">
                <div className="o-home-head">
                    <div className="title">培训学习平台</div>
                </div>
                <div className="o-home-body">
                    <div className="o-nav">
                        <div className="o-menu-fold" >
                        </div>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            onClick={this.doMenuClick}
                            inlineCollapsed={this.state.collapsed}
                        >
                            {
                                menus.map((item:any) => {
                                    let children = typeof(item.children) !== "undefined" ? item.children : [];
                                    if(children.length==0){
                                        return (
                                            <Menu.Item key={item.key}>
                                                <Icon type={item.icon} />
                                                <span>{item.title}</span>
                                            </Menu.Item>
                                        );
                                    }else {
                                        return (
                                            <SubMenu
                                                key={item.key}
                                                title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} >
                                                {
                                                    children.map((child:any) => {
                                                        return (
                                                            <Menu.Item key={child.key}>
                                                                <span>{child.title}</span>
                                                            </Menu.Item>
                                                        );
                                                    })
                                                }
                                            </SubMenu>
                                        );
                                    }
                                })
                            }
                        </Menu>
                    </div>
                    <div className="o-home-c">
                        {renderRoutes(routes)}
                    </div>
                </div>

            </div>
        )
    }
}

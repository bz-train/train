/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react"
import { Button, Input, Table, Badge, Menu, Dropdown, Icon, Modal } from 'antd'
import './index.scss';


export default class Content extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            name: '',
            visible: false,
            loading: false
        }
    }

    render() {
            return (
            <div className="home-content">
                这是content页面
            </div>
        );
    }
}
/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react"
import {Button} from 'antd'
import './index.scss'
import List, {aa,bb} from './child'
import Head from './head'


console.log("aa>>>",aa);
console.log("bb>>>",bb);

export default class Content extends Component<any,any> {
    constructor(props:any) {
        super(props);

        this.state = {
            a:"a",
            name: ''
        }
    }


    add = (obj:any) => {
        this.setState({
            name:obj.name
        })
    }

    componentDidMount() {
        this.WrapList.addList();
    }

    render() {
        return (
            <div className="o-home-content">
                <Head  name = {this.state.name} />
                <List  a={this.state.a} add = {this.add} ref={(self) => { this.WrapList = self}} />
            </div>
        );
    }
}

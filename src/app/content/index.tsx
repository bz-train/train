/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react"
import {Button} from 'antd'
import './index.scss'
import List, {aa,bb} from './child'
import Head from './head'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContentActions from '../../model/action/content'  // 这种写法：匹配到content文件里面所有的函数

class Content extends Component<any,any> {
    static a ={

    }

    WrapList: any;

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

    changeHead = () => {
        this.props.actions.addContent('you are very smart');
    }

    render() {
        return (
            <div className="o-home-content">
                <div onClick={this.changeHead}> {this.props.content.title}</div>
                <Head  name = {this.state.name} ref='Head'  />
                <List  a={this.state.a} add = {this.add} ref={(self:object) => { this.WrapList = self}} />
            </div>
        );
    }
}

// store数据变化时执行
function mapStateToProps(state:any) {
    return {
        content:state.content
    };
}

// 相当于store.dispatch()
function mapDispatchToProps(dispatch:any, ownProps:any) {
    // ownProps（容器组件的props对象）
    return {
        actions: bindActionCreators(ContentActions, dispatch)
    }
}

// connect的意思，就是将这两种组件连起来。
// Content --UI组件    VisibleTodoList就是由 React-Redux 通过connect方法自动生成的容器组件。
//mapStateToProps  -- 将state映射到组件参数     mapDispatchToProps   -- 将组件的操作映射成action
export default connect(mapStateToProps, mapDispatchToProps)(Content)

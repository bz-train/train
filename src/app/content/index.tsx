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
import * as ContentActions from '../../model/action/content'

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
        this.props.actions.getContent(function(data:any[]) {
            console.log(data);
        });
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


function mapStateToProps(state:any) {
    console.log("state>>>>>",state);
    return {
        content:state.content
    };
}

function mapDispatchToProps(dispatch:any, ownProps:any) {
    return {
        actions: bindActionCreators(ContentActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)

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
    }

    changeHead = () => {
        this.props.actions.addContent('you are very smart');
    }

    render() {
        return (
            <div className="o-home-content">
            {/*在下面div上的属性 {this.props.content.title} */}
                <div onClick={this.changeHead}>{this.props.content.title} </div>
                <Head  name = {this.state.name} ref='Head'  />
                <List  a={this.state.a} add = {this.add} ref={(self:object) => { this.WrapList = self}} />
            </div>
        );
    }
}

/* mapStateToProps  
     第一个参数：允许将store中的数据作为props绑定到组件上， 
     之后可以用this.props.content来获取值，
    第二个参数：传入组件自己的值
*/

function mapStateToProps(state:any) {
    console.log("state>>>>>",state);
    return {
        content:state.content
    };
}

/* 作用是将action作为props绑定到自己的组件 
   bindActionCreators():将action包装成直接可被调用的函数
*/
function mapDispatchToProps(dispatch:any, ownProps:any) {
    return {
        actions: bindActionCreators(ContentActions, dispatch)
    }
}

//app 里使用了Provider组件,要想使用state中的数据，必须在要用state的组件中使用connect()
export default connect(mapStateToProps, mapDispatchToProps)(Content)

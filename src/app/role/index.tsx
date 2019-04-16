import React,{Component} from "react";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as addToRole from '../../model/action/content'

class Role extends Component {
    constructor(props:any){
        super(props)
        this.state = {

        }
    }
    render() {
       
        return (
            <div>{this.props.contents.title}</div>
        );
    }
}

/* mapStateToProps  
     第一个参数：允许将store中的数据作为props绑定到组件上， 
     之后可以用this.props.content来获取值，
    第二个参数：传入组件自己的值
*/

function mapStateToProps(state:any) {
    console.log("role state>>>>>",state);
    return {
        contents:state.role
    };
}

/* 作用是将action作为props绑定到自己的组件 
   bindActionCreators():将action包装成直接可被调用的函数
*/
function mapDispatchToProps(dispatch:any, ownProps:any) {
    return {
        actions: bindActionCreators(addToRole.addToRole, dispatch)
    }
}

//app 里使用了Provider组件,要想使用state中的数据，必须在要用state的组件中使用connect()
export default connect(mapStateToProps, mapDispatchToProps)(Role)
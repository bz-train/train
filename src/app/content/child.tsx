/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react"
import {Button} from 'antd';
import './index.scss'

interface Props {
    goUrl?: string;
    beforeLoad?: any;
    store?: any;
    history?:any;
}


export const aa = 'aaa'

export const bb = function () {

}

/*
var / let

const

es5

bind()
() => {}

let obj = {
a,
b
}

obj1 =

let a = "a"+ obj.a
let a = `a${obj.a}`;

map
set
promise

['a','b']
for
map
forEach
for in  对象
for of

filter
findIndex

*/




export default class List extends Component<any,any> {
    static defaultProps = {
        name:'pt'
    }

    constructor(props:any) {
        super(props);
        this.state={
            list:[]
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }


    componentWillReceiveProps(nextProps:any,prevProps:any) {

    }

    addList = (e:any) => {
        console.log(e);
        let {list} = this.state;
        let tmp ={
            name:'xwb'
        }
        list.push(tmp);

        this.setState({
            list:list
        },()=>{
            this.props.add(tmp);
        });

    }

    componentWillUpdate() {

    }

    render() {
        let {list} = this.state;
        return (
            <div ref="content" className="o-home-content" {...this.props} >
                <Button type="primary" onClick={this.addList}>添加列表</Button>
                <ul>
                {
                   list.map((item:any,index:any) => {
                      return <li key={index}>{item.name}</li>
                   })
                }
                </ul>
            </div>
        );
    }

    componentDidUpdate() {

    }
}

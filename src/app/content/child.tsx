/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react"
import {Button,Layout} from 'antd';
import './index.scss'


let {Header, Sider, Content, Footer} = Layout;


interface Props {
    goUrl?: string;
    beforeLoad?: any;
    store?: any;
    history?:any;
}


export const aa = 'aaa'

export const bb = function () {

}
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
                <div>
                    <Layout>
                        <Header></Header>
                        <Layout>
                            <Sider></Sider>
                            <Content></Content>
                        </Layout>
                        <Footer></Footer>
                    </Layout>
                </div>
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

import React,{Component} from "react";
import {Row,Col} from 'antd';

class Head extends Component<any,any> {

    constructor(props:any) {
        super(props);

        this.state = {

        }
    }

    render() {
        let labelCol = {
            xs:24,
            md:12,
            xl:6
        }
        let inputCol = {
            xs:24,
            md:12,
            xl:6
        }
        return(
            <div className="train-head" >
                <div className="head-title">{this.props.name}</div>
                <Row type="flex" align='middle' >
                    <Col >title1</Col>
                    <Col >input1</Col>
                    <Col >title2</Col>
                    <Col >input2</Col>
                </Row>
            </div>
        );
    }
}

export default Head;

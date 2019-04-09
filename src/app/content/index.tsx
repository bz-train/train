/**
 * Created by chenlei on 2018/7/12.
 */
import React,{Component} from "react"
import './index.scss'

export default class Content extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = { visible: false,
            loading: false,
        }

    }
    render() {

        return (
            <div className="o-home-content">

            </div>
        );
    }
}
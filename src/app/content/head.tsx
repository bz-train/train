import React,{Component} from "react";

class Head extends Component<any,any> {

    constructor(props:any) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <div className="head" >{this.props.name}</div>
        );
    }
}

export default Head;

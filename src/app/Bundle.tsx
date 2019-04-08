/**
 * Created by chenlei on 2018/5/30.
 */
import * as React from "react"
import {Component} from "react"

interface ReactState {
    lazyComponent: any;
}

interface ReactProps {
    goUrl?: string;
    beforeLoad?: any;
    store?: any;
    history?:any;
}

export default class Bundle extends Component<ReactProps,ReactState> {

    constructor(props: ReactProps) {
        super(props);
        this.state = {
            lazyComponent : null
        }
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps: ReactProps) {
        if (nextProps.goUrl !== this.props.goUrl) {
            this.load(nextProps);
        }
    }

    async load(props: ReactProps) {
        const module = await import(`${props.goUrl}`);
        this.setState({
            lazyComponent: module.default ? module.default : module
        });
    }

    render() {
        const LazyComponent = this.state.lazyComponent;
        const BeforeLoad = this.props.beforeLoad;
        return LazyComponent
            ? <LazyComponent {...this.props} />
            : BeforeLoad
                ? <BeforeLoad {...this.props} />
                : null;
    }
}

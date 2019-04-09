import React from "react";
import {matchPath, Route, RouteComponentProps, Router, Switch, SwitchProps} from "react-router";
import {Location} from "history";
import Bundle from './Bundle'

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
    route?: RouteConfig;
}

export interface RouteConfig {
    key?: string;
    location?: Location;
    component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType;
    lazyComponent?:string
    path?: string;
    exact?: boolean;
    strict?: boolean;
    routes?: RouteConfig[];
    render(props:object):any;
}

function renderRoutes(routes: RouteConfig[] | undefined,
                      extraProps?: any,
                      switchProps?: SwitchProps) {
    if (extraProps === void 0) {
        extraProps = {};
    }

    if (switchProps === void 0) {
        switchProps = {};
    }

    return routes ? React.createElement(Switch, switchProps, routes.map(function (route:RouteConfig, i:any) {
        return React.createElement(Route, {
            key: route.key || i,
            path: route.path,
            exact: route.exact,
            strict: route.strict,
            render: function render(props:object) {
                let _props:object =
                    route.component ? Object.assign({}, props, extraProps, {route: route})
                        : Object.assign({goUrl:route.lazyComponent}, props, extraProps, {route: route})
                let component = route.component ? route.component : Bundle
                return route.render ? route.render(_props) : React.createElement(component, _props);
            }
        });
    })) : null;
}

export { renderRoutes};

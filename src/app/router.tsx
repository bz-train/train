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


function matchRoutes(routes: RouteConfig[] | undefined,
                     pathname:string,
                     branch:any[]) {
    if (branch === void 0) {
        branch = [];
    }

    routes.some(function (route) {
        var match = route.path ? matchPath(pathname, route) : branch.length ? branch[branch.length - 1].match // use parent match
            : Router.computeRootMatch(pathname); // use default "root" match

        if (match) {
            branch.push({
                route: route,
                match: match
            });

            if (route.routes) {
                matchRoutes(route.routes, pathname, branch);
            }
        }

        return match;
    });
    return branch;
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

    let route = routes ? React.createElement(Switch, switchProps, routes.map(function (route:RouteConfig, i:any) {
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
    console.log("route>>>>",route);
    return route;
}

export { renderRoutes, matchRoutes };

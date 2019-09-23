import React from "react";
import { Route as ReactRoute, Redirect } from "react-router-dom";
import routes from "../routes.js";

class Route extends React.Component {
  constructor(props) {
    super(props);

    this.allowRouteList = Object.values(routes);
  }

  isNotFoundRoute() {
    return !this.allowRouteList.includes(this.props.location.pathname);
  }

  render() {
    if (this.isNotFoundRoute()) {
      return <Redirect to={routes.accountsComparison} />;
    }

    return <ReactRoute {...this.props} />;
  }
}

export default Route;

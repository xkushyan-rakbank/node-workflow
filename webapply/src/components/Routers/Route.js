import React from "react";
import { Route as ReactRoute } from "react-router-dom";

import { ErrorBoundary } from "./ErrorBoundary";

export const Route = ({ component: Component, render, ...rest }) => {
  return (
    <ReactRoute
      {...rest}
      render={props => (
        <ErrorBoundary>{Component ? <Component {...props} /> : render(props)}</ErrorBoundary>
      )}
    />
  );
};

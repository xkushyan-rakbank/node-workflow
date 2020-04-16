import React from "react";
import { Route } from "react-router-dom";

import { ErrorBoundary } from "./ErrorBoundary";

export const ProtectedRoute = ({ component: Component, render, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <ErrorBoundary>{Component ? <Component {...props} /> : render(props)}</ErrorBoundary>
    )}
  />
);

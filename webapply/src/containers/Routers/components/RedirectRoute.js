import React from "react";
import { Route, Redirect } from "react-router-dom";

export const RedirectRoute = ({ to, ...rest }) => (
  <Route {...rest} render={props => <Route {...props} render={() => <Redirect to={to} />} />} />
);

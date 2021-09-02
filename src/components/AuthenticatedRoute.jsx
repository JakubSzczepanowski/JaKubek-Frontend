import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({
  component: Component,
  appProps,
  ...rest
}) {
  console.log("Profile Route");
  return (
    <Route
      {...rest}
      render={() =>
        appProps.isAuthenticated ? (
          <Component {...appProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const auth = localStorage.getItem("user-token");
  return auth ? children : <Navigate to="/" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

PrivateRoute.defaultProps = {
  children: null,
};

export default PrivateRoute;

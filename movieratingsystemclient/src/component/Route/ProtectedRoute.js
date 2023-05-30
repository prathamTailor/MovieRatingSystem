import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import jwt from 'jwt-decode'
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  var data;
  if(user != null)
    data = jwt(user);
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return navigate("/LoginSignUp");
            }

            if (isAdmin === true && data.role !== "Admin") {
              return navigate("/LoginSignUp");
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
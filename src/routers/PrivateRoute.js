import { React } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isLogged, children }) => {
  return isLogged ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

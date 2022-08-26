import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  const isLogedIn = useSelector((store) => store.userReducer.isLogedIn);
  const location = useLocation();

  return (
    <Route {...rest}>
      {isLogedIn ? (
        children
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default ProtectedRoute;

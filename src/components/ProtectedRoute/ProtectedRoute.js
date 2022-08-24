import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/helpers";

const ProtectedRoute = ({ children, ...rest }) => {
  const cookie = getCookie("accessToken");
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        cookie ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;

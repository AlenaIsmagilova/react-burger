import { Redirect, Route } from "react-router-dom";
import { getCookie } from "../../utils/helpers";

const ProtectedRoute = ({ children, ...rest }) => {
  const cookie = getCookie("accessToken");

  return (
    <Route
      {...rest}
      render={() => (cookie ? children : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedRoute;

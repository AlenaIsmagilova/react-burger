import { FC } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector } from "../../utils/types";

interface IProtectedRoute {
  children: React.ReactNode | undefined;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
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

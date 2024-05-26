import { Navigate, Outlet} from "react-router-dom";
import { FC } from "react";
import { useAppSelector } from "./redux/hooks";

const PrivateRoute: FC = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
  if (isAuth) {
     return <Outlet/>
  } else {
    return <Navigate to="/login"/>;
  }
};
  
export default PrivateRoute;
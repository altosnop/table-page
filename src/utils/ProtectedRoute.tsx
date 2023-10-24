import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { isAuthenticatedSelector } from '../store/user/userSelectors';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useAppSelector(isAuthenticatedSelector);
  return isAuth ? children : <Navigate to='/login' replace />;
};

export default ProtectedRoute;

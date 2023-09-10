import { FC, ReactNode } from 'react';
import { isAuthTokenPresent } from '../../../utils/authUtils.ts';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
  navigate: 'login' | 'home';
}

const AuthGuard: FC<AuthGuardProps> = ({ children, navigate }) => {
  const hasToken = isAuthTokenPresent();

  if (navigate === 'login' ? !hasToken : hasToken) {
    return <Navigate to={navigate === 'login' ? '/login' : '/'} replace />;
  }

  return children;
};

export default AuthGuard;

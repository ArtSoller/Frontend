import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

interface PrivateRouteProps {
    element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component }) => {
    return isAuthenticated() ? Component : <Navigate to="/" />;
};

export default PrivateRoute;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './ContextProvider';

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useAuth();

    console.log(user?.Email);
    const location = useLocation();

    if (user?.Email) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} />;
};

export default PrivateRoute;

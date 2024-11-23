import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/forum" replace />;
    }

    return children;
};

export default ProtectedRoute;
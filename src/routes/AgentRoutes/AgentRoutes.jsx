import React from 'react';
import useAuth from '../../hooks/useAuth/useAuth';
import useUserRole from '../../hooks/useUserRole/useUserRole';
import Loader from '../../components/shared/Loader/Loader';

const AgentRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isLoading } = useUserRole();

    if (loading || isLoading) {
        return <Loader></Loader>;
    }

    if (!user || role !== "agent") {
        return <Navigate to="/forbidden" state={location.pathname}></Navigate>;
    }

    return children;
};

export default AgentRoutes;
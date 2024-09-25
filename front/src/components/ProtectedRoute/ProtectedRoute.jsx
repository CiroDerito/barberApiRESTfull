import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const userSesion = useSelector(state => state.sesion.userSesion);

    if (!userSesion) {
        return <Navigate to="/home" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

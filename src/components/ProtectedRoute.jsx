import { Outlet, Navigate } from 'react-router';
// reducer 
import { useGlobalContext } from '../context/useUserContext';

const ProtectedRoute = () => {
    const { state } = useGlobalContext();
    //    проверка авторизации 
    return state.auth ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute;

import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutsContext();
    const logout = () => {
        //remove user form locolstorage
        localStorage.removeItem('user');
        authDispatch({ type: 'LOGOUT' });
        workoutDispatch({ type: 'SET_WORKOUTS', payload: null });
    };

    return { logout };
};

export default useLogout;

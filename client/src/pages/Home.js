import React, { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkoutsData = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'SET_WORKOUTS',
                    payload: data,
                });
            }
        };

        if (user) {
            fetchWorkoutsData();
        }
    }, [dispatch, user]);

    return (
        <div className='home'>
            <div className='workouts'>
                {workouts &&
                    workouts.map((item) => (
                        <WorkoutDetails key={item._id} workout={item} />
                    ))}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;

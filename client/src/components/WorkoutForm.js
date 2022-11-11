import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [workoutValues, setWorkoutValues] = useState({
        title: '',
        load: '',
        reps: '',
    });
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in');
            return;
        }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workoutValues),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
            setError(null);
            setEmptyFields([]);
            setWorkoutValues({
                title: '',
                load: '',
                reps: '',
            });
        }
    };

    const handleChangeWorkoutValues = (e) => {
        setWorkoutValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className='create'>
            <h3>Add a new workout</h3>

            <label>Excersize title:</label>
            <input
                type='text'
                value={workoutValues.title}
                name={'title'}
                onChange={(e) => handleChangeWorkoutValues(e)}
                className={emptyFields?.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input
                type='number'
                value={workoutValues.load}
                name={'load'}
                onChange={(e) => handleChangeWorkoutValues(e)}
                className={emptyFields?.includes('load') ? 'error' : ''}
            />

            <label>Reps :</label>
            <input
                type='number'
                name={'reps'}
                value={workoutValues.reps}
                onChange={(e) => handleChangeWorkoutValues(e)}
                className={emptyFields?.includes('reps') ? 'error' : ''}
            />
            <button type='submit'>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default WorkoutForm;

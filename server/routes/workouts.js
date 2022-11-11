const express = require('express');
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
//создает нам экземпляр маршрутизатора

router.use(requireAuth);
//get all workouts
router.get('/', getWorkouts);

//get a single workout
router.get('/:id', getWorkout);

//post a new workout
router.post('/', createWorkout);

//delete a workout
router.delete('/:id', deleteWorkout);

//delete a workout
router.patch('/:id', updateWorkout);

module.exports = router;

const workoutModel = require('../models/workoutModel')

function getWorkouts(req, res) {
    const workouts = workoutModel.getWorkouts()
    res.json(workouts)
}

function addWorkout(req, res) {
    const workout = req.body
    workoutModel.addWorkout(workout)
    res.json({ message: 'Workout added successfully' })
}

function deleteWorkout(req, res) {
    const index = parseInt(req.params.index)
    workoutModel.deleteWorkout(index)
    res.json({ message: 'Workout deleted successfully' })
}

module.exports = {
    getWorkouts,
    addWorkout,
    deleteWorkout
}
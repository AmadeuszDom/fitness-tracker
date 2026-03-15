let workouts = []

function getWorkouts(){
    return workouts
}

function addWorkout(workout){
    workouts.push(workout)
}

function deleteWorkout(index) {
    workouts.splice(index, 1)
}


module.exports = {
    getWorkouts,
    addWorkout,
    deleteWorkout
}
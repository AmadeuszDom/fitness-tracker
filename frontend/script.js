const form = document.getElementById("workoutForm")
const workoutList = document.getElementById("workoutList")

let workouts = JSON.parse(localStorage.getItem("workout")) || []

function saveWorkouts() {
    localStorage.setItem("workout", JSON.stringify(workouts))
}

function renderWorkouts(){
    workoutList.innerHTML = "";
    workouts.forEach((workout, index) => {
        const li = document.createElement("li")
        li.innerHTML = `${workout.exercise} - ${workout.weight} kg x ${workout.reps} reps <button onclick="deleteWorkout(${index})">Delete</button>`
        workoutList.appendChild(li)
    })
}

function deleteWorkout(index) {
    workouts.splice(index, 1)
    saveWorkouts()
    renderWorkouts()
}

form.addEventListener("submit", function(e) {
    e.preventDefault()

    const exercise = document.getElementById("exercise").value
    const weight = document.getElementById("weight").value
    const reps = document.getElementById("reps").value

    const workout = {
        exercise,
        weight,
        reps
    }

    workouts.push(workout)

    saveWorkouts()
    renderWorkouts()

    form.reset()
})

renderWorkouts()
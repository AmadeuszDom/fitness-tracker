const form = document.getElementById("workoutForm")
const table = document.getElementById("workoutTable")
const saveWorkout = document.getElementById("save-workout-hidden");
let workouts = JSON.parse(localStorage.getItem("workouts")) || []

function saveWorkouts(){
localStorage.setItem("workouts", JSON.stringify(workouts))
}

function renderWorkouts(){
console.log(localStorage.getItem("workouts"));


if (localStorage.getItem("workouts").length > 2) saveWorkout.id = "save-workout";


table.innerHTML=""

workouts.forEach((workout,index)=>{

const row = document.createElement("tr")

row.innerHTML=`
<td>${workout.exercise}</td>
<td>${workout.weight}</td>
<td>${workout.reps}</td>
<td><button onclick="deleteWorkout(${index})">Delete</button></td>
`

table.appendChild(row)

})

saveWorkout.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("workout-details").id = "workout-details-active";
})

updateChart()

}

function deleteWorkout(index){

workouts.splice(index,1)

saveWorkouts()

renderWorkouts()

if (localStorage.getItem("workouts").length <= 2) saveWorkout.id = "save-workout-hidden";

}

form.addEventListener("submit",function(e){

e.preventDefault()

const exercise=document.getElementById("exercise").value
const weight=document.getElementById("weight").value
const reps=document.getElementById("reps").value

const workout={
exercise,
weight,
reps
}

workouts.push(workout)

saveWorkouts()

renderWorkouts()

form.reset()

})

function updateChart(){

const ctx=document.getElementById("progressChart")

const weights=workouts.map(w=>w.weight)

new Chart(ctx,{
type:"line",
data:{
labels:weights.map((_,i)=>i+1),
datasets:[{
label:"Weight Progress",
data:weights
}]
}
})

}

renderWorkouts()
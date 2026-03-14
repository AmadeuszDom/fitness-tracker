const form = document.getElementById("workoutForm")
const table = document.getElementById("workoutTable")

let workouts = JSON.parse(localStorage.getItem("workouts")) || []

function saveWorkouts(){
localStorage.setItem("workouts", JSON.stringify(workouts))
}

function renderWorkouts(){

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

updateChart()

}

function deleteWorkout(index){

workouts.splice(index,1)

saveWorkouts()

renderWorkouts()

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
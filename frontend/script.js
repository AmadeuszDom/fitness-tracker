const form = document.getElementById("workoutForm")
const table = document.getElementById("workoutTable")
const saveWorkout = document.getElementById("save-workout-hidden");
const cancelButton = document.getElementById("cancel-save");
let exercises = JSON.parse(localStorage.getItem("exercises")) || []
let chart;

function saveExercise(){
localStorage.setItem("exercises", JSON.stringify(exercises))
}

function renderExercises(){

    if (!exercises[0]) saveWorkout.id = "save-workout-hidden";
    else saveWorkout.id = "save-workout";
    

    table.innerHTML=""

    exercises.forEach((exercise,index)=>{

        const row = document.createElement("tr")

        row.innerHTML=`
        <td>${exercise.exercise}</td>
        <td>${exercise.weight}KG</td>
        <td>${exercise.reps}</td>
        <td><button onclick="deleteExercise(${index})">Delete</button></td>
        `

        table.appendChild(row)

    })

    saveWorkout.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("workout-details").id = "workout-details-active";
    })

    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("workout-details-active").id = "workout-details";
        document.getElementById("workoutName").value = "";
        document.getElementById("workoutRating").value = -1;
    });

    updateChart()

}

function deleteExercise(index){

    exercises.splice(index,1)

    saveExercise()

    renderExercises()

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

    exercises.push(workout)

    saveExercise()

    renderExercises()

    form.reset()

})

function updateChart() {
    const ctx = document.getElementById("progressChart").getContext("2d");

    const weights = exercises.map(w => w.weight);
    const labels = weights.map((_, i) => i + 1);

    if (chart) {
        // Update existing chart
        chart.data.labels = labels;
        chart.data.datasets[0].data = weights;
        chart.update();
    } else {
        // Create chart only once
        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Weight Progress",
                    data: weights
                }]
            }
        });
    }
}

renderExercises();
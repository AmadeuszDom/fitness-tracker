const exerciseform = document.getElementById("workoutForm")
const table = document.getElementById("workoutTable")
const saveWorkoutButton = document.getElementById("save-workout-hidden");
const cancelButton = document.getElementById("cancel-save");
const saveWorkoutForm = document.getElementById("workoutDetailsForm");
const workoutSection = document.getElementById("workouts-section");
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let exercises = JSON.parse(localStorage.getItem("exercises")) || [];
let chart;

function saveExercise(){
localStorage.setItem("exercises", JSON.stringify(exercises))
}

function saveWorkout() {
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

function renderExercises(){

    if (!exercises[0]) saveWorkoutButton.id = "save-workout-hidden";
    else saveWorkoutButton.id = "save-workout";
    

    table.innerHTML=""

    exercises.forEach((exercise,index)=>{

        const row = document.createElement("tr")

        row.innerHTML=`
        <td>${exercise.exercise}</td>
        <td>${exercise.weight} KG</td>
        <td>${exercise.reps}</td>
        <td><button onclick="deleteExercise(${index})" style="background-color: #b94545">Delete</button></td>
        `

        table.appendChild(row)

    })
    updateChart()

}

saveWorkoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("workout-details").id = "workout-details-active";
})

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("workout-details-active").id = "workout-details";
    saveWorkoutForm.reset();
});

exerciseform.addEventListener("submit",function(e){

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

    exerciseform.reset()

})

saveWorkoutForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("workoutName").value;
    const rating = document.getElementById("workoutRating").value;
    var numberOfExercises = 0;
    exercises.forEach(() => numberOfExercises++); 

    var totalWeight = 0;
    exercises.forEach((w) => totalWeight+= ( parseFloat(w.weight) * parseFloat(w.reps)) );

    const workout = {
        name,
        rating,
        numberOfExercises,
        totalWeight
    }
    workouts.push(workout);
    saveWorkout();
    renderWorkout();
    document.getElementById("workout-details-active").id = "workout-details";
    saveWorkoutForm.reset();

    exercises = [];
    localStorage.removeItem("exercises");
    saveExercise();
    renderExercises();
})

function deleteExercise(index){

    exercises.splice(index,1)

    saveExercise()

    renderExercises()

}


function deleteWorkout(index){

    workouts.splice(index,1)

    saveWorkout()

    renderWorkout()

}

function renderWorkout(){
    workoutSection.innerHTML = "";  // Clear old cards before rendering new ones
    workouts.forEach((workout, index) => {
        const card = document.createElement("div");
        card.className = "workout-card";

        var ratingColor; 

        //Workout rating color dependent on the rating it
        if (workout.rating < 5) ratingColor = ratingColor = "style=\"color: #3eb0e6\""
        if (workout.rating >= 5 && workout.rating < 8) ratingColor = "style=\"color: #e27a19\""
        if (workout.rating >= 8 && workout.rating < 10) ratingColor = "style=\"color: #e9490a\""
        if (workout.rating == 10) ratingColor = "style=\"color: #ff0000\"";

        
        card.innerHTML = `
            <div class="workout-header">
                <h3 class="workout-name">${workout.name}</h3>
                <p class="workout-rating" ${ratingColor}>${workout.rating} / 10</p>
            </div>
            
            <div class="workout-stats">
                <div class="stat-item">
                    <span class="stat-label">Exercises</span>
                    <span class="stat-value" >${workout.numberOfExercises}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Total Weight</span>
                    <span class="stat-value">${workout.totalWeight} kg</span>
                </div>
            </div>

            <button class="delete-btn" onclick="deleteWorkout(${index})">Delete Workout</button>
        `
        workoutSection.append(card);
    })
}

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

// Drag-to-scroll functionality for workout cards
const workoutsContainer = document.querySelector('.workouts-section');
let isDown = false;
let startX;
let scrollLeft;

workoutsContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - workoutsContainer.offsetLeft;
    scrollLeft = workoutsContainer.scrollLeft;
    workoutsContainer.style.cursor = 'grabbing';
});

workoutsContainer.addEventListener('mouseleave', () => {
    isDown = false;
    workoutsContainer.style.cursor = 'grab';
});

workoutsContainer.addEventListener('mouseup', () => {
    isDown = false;
    workoutsContainer.style.cursor = 'grab';
});

workoutsContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - workoutsContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplier for scroll speed
    workoutsContainer.scrollLeft = scrollLeft - walk;
});

renderExercises();
renderWorkout()
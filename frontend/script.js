const form = document.getElementById("workoutForm");
const workoutList = document.getElementById("workoutList");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const exercise = document.getElementById("exercise").value;
    const weigfht = document.getElementById("weight").value;
    const reps = document.getElementById("reps").value;

    const li = document.createElement("li");

    li.textContent = `${exercise} - ${weigfht} kg x ${reps} reps`;
    workoutList.appendChild(li);

    form.reset();
})
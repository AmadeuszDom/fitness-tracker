const express = require('express')
const cors = require('cors')

const workoutRoutes = require('./routes/workouts')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/workouts', workoutRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to the Fitness Tracker API!")

})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})

let workouts = []
app.get("/workouts", (req, res) => {
    res.json(workouts)
})

app.post("/workouts", (req, res) => {

    const workout = req.body
    workouts.push(workout)
    res.json({message:"Workout added"})
})
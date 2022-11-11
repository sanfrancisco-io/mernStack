const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
require('dotenv').config();

//express app
const app = express();
//middleware
app.use(express.json());

app.use((req, res, next) => {
    next();
});

//routes
app.use('/api/workouts', workoutRoutes);
//захватывет все различние маршруты которые мы создали через экземпляр который мы создали в роутах
app.use('/api/user', userRoutes);

//connect to db
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                'connect to db and listening on port',
                process.env.PORT
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });

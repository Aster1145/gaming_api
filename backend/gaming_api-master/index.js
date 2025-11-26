const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGODB_URI }  = require('./config/env.js');
const gamesRoutes = require('./routes/games.routes.js');
const userRoutes = require('./routes/user.routes.js');


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/games',gamesRoutes);
app.use('/api/users',userRoutes);

app.get('/', (req, res) => {
  res.send("Welcomw to gaming API")
});



mongoose.connect(MONGODB_URI).then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
})
.catch((err) => {
    console.log("Error connecting to MongoDB:",err)
})









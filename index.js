const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const roleRouter = require('./routes/roleRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const categoryRouter = require('./routes/categoryRoute');
const tradesmanRouter = require('./routes/tradesmanRoute');
const parishRouter = require('./routes/parishRoute');
const app = express();
require('dotenv').config();

// 1) MIDDLEWARES
app.use(express.json());


app.use(cors(['*']))


// 2) ROUTES
app.use('/api/v1/roles',roleRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/tradesman',tradesmanRouter);
app.use('/api/v1/parish',parishRouter);

const DB_CONN = process.env.NODE_ENV === "production"
    ? process.env.DATABASE_PRODUCTION.replace("<PWD>",process.env.DATABASE_PASSWORD)
    : process.env.DATABASE;
// const DB_CONN = process.env.DATABASE;


// Function to start db connection
const database = () => {
    // required connection params
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    try {
        //Connect to collection on mongodb atlas
        mongoose.connect( process.env.DATABASE, connectionParams)
        console.log( "Successfully Connected to Tradeswap Database");

    } catch (err) {
        console.error(err)
    }
}

database();


// mongoose.connect(DB_CONN).then((conn) => {
//   console.log("Successfully connected to Tradeswap database");
// });


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
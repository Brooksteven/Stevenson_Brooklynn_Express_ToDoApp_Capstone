import { config } from 'dotenv'; config(); //here we are loading .env variables into our process .env variable here. Also, into our process//this is allowing the use of environment variables coming from a .env file
import './database/database.js' //import database connection into server.js
import express from 'express' //this imports the express package
import cors from 'cors';

//import routes here
import itemsRouter from './routes/items/items-router.js';
import userRouter from './routes/users/users-router.js';


const app = express() //this initializes this backend express app
const PORT = process.env.PORT || 3001 //// This is conditional assignment. PORT conditionall is being assigned a value that comes from our PORT environment variable, if it doesn't find it, set it to 3001 instead


//middleware
app.use(express.urlencoded({ extended: true })) ////this allows us to have a req.body for whatever forms are submitted //for the checkout form where user enters personal information to check out
app.use(express.json()) //this allows us to have a req.body whenever json data is submitted directly without a form, coming from reqbin or postman etc
app.use(cors());


app.use('/items', itemsRouter) //this is saying for all routes that start with /items look for them in itemsRouter
app.use('/users', userRouter)


//define a base route
app.get('/', (req, res) => {
    res.send('Welcome to the To Do List API!');
});


//start our server. listening on port 3000 or 3001
app.listen(PORT, (req, res) => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
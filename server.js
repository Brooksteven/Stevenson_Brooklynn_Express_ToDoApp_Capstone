import { config } from 'dotenv'; config(); //here we are loading .env variables into our process .env variable here. Also, into our process//this is allowing the use of environment variables coming from a .env file
import './database/database.js'; //import database connection into server.js
import express from 'express'; //this imports the express package
import cors from 'cors'; 

//import routes here
import itemsRouter from './routes/items/items-router.js';
import userRouter from './routes/users/users-router.js';
import authRouter from './routes/auth/auth-router.js';


const app = express() //this initializes this backend express app and invokes express
const PORT = process.env.PORT || 3001 //// This is conditional assignment. PORT conditionall is being assigned a value that comes from our PORT environment variable, if it doesn't find it, set it to 3001 instead


//middleware
app.use(express.urlencoded({ extended: true })) ////this allows us to have a req.body for whatever forms are submitted //for the checkout form where user enters personal information to check out
app.use(express.json()) //this allows us to have a req.body whenever json data is submitted directly without a form, coming from reqbin or postman etc
app.use(cors());


app.use('/items', itemsRouter) //this is saying for all routes that start with /items look for them in itemsRouter
app.use('/users', userRouter)
app.use('/auth', authRouter);


//define a base route
app.get('/', (req, res) => {
    res.send('Welcome to the To Do List API!');
});



//start our server. listening on port 3000 or 3001
app.listen(PORT, (req, res) => {
    console.log(`Server is listening on PORT: ${PORT}`);
});



////////code from youtube video JWT Authentication Tutorial - Node.js ///////


//this server is only for authentication



// code from Youtube video JWT Authentication Tutorial - Node.js
//QUESTION!!!! WHERE SHOULD THIS BE?
import jwt from 'jsonwebtoken' 

// app.use(express.json())

//QUESTION!!!!! would this be the info in my controllers for cart? so all I need to do is do /carts below. Also which file should app.get('/carts, (req, res) be?)
// const post = [
//     {
//         username: 'Kyle',
//         title: 'Post 1'
//     },
//     {
//         username: 'Jim',
//         title: 'Post 2'
//     }
// ]

//this will only return the post that the user has access to. do this for cart and if enough time order. it will identify with username, not userId_. so add username to each schema/controller your want the user to identify with. make username unique 
app.get('/posts', (req, res) => {
    res.json(post.filter(post => post.username === req.user.name))
})


//remove /login code

// app.post('/login', (req, res) => {
//     //authentication user here(watch video to do this)
//     const username = req.body.usernmae
//     const user = { name: username }
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json({ accessToken: accessToken }) //every time a user creates a username it will also get a accessToken
// })



//QUESTION!!!!!!! Should this below be in server.js?

//here we are going to test our accessToken by doing this middleware which will authenticate our token
function authenticateToken(req, res, next) {
    //here we get the token from our header
    const authHeader = req.headers['authorization']
    //if we have a suthHeader then return the authHeader token portion which we split on the space otherwise return undefined
    //so our token will either be undefined or it's going to be the actual token
    const token = authHeader && authHeader.split('')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
     
}

// const jwt = require('jsonwebtoken')

// app.listen(PORT, (req, res) => {
//     console.log(`Server is listening on PORT: ${PORT}`);
// });
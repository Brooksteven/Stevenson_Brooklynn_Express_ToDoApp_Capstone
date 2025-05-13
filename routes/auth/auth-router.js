//this server is only for authentication
//theres only login, logout, and refresh tokens on this server

import { config } from 'dotenv'; config(); 
import express from 'express' //this imports the express package
const app = express() //this initializes this backend express app
const PORT = 4000

const router = express.Router();

// code from Youtube video JWT Authentication Tutorial - Node.js
import jwt from 'jsonwebtoken'

app.use(express.json())

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

// //this will only return the post that the user has access to. do this for cart and if enough time order. it will identify with username, not userId_. so add username to each schema/controller your want the user to identify with. make username unique 
// app.get('/posts', (req, res) => {
//     res.json(post.filter(post => post.username === req.user.name))
// })

//store our refreshTokens in an empty array
//this isn't the best way to do this because every time your server restarts, this is going to be empty out, so need to create an entire database just to store these tokens for the future part of this project
let refreshTokens = []


//here we can create a new token that will take in a refresh token
app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
  })
})

//how to deauthenticate refreshTokens so users cant create infinite access tokens for users so to prevent that we have this delete function
//here we delete the refreshToken they can no longer use it to create initfinite accessTokens
app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token) //checking to make sure the token that is inside our refreshToken is not equal to the req.body.token token that we passed up to it. If it is equal to it then delete the token from the refreshTokens array []
    res.sendStatus(204)
})


app.post('/login', (req, res) => {
    //authentication user here(watch video to do this)
    const username = req.body.usernmae
    const user = { name: username }

    const accessToken = generateAccessToken(user) //this calls the generateAccessToken below to generate the access token
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET) //after token expires in 10 min we need to create a refresh token and this will use the same user to create the refresh token. we don't want a expiration on the refresh token because we want to manually handle the expiration of these refresh tokens and we don't want jwt to do this for us.
    refreshTokens.push(refreshToken) //push in the new refresh token created
    res.json({ accessToken: accessToken }) //every time a user creates a username it will also get a accessToken
})


//a function that will generate an access token
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' }) //token expires in 10 minutes
}


//we don't need authentication in authServer

// //here we are going to test our accessToken by doing this middleware which will authenticate our token
// function authenticateToken(req, res, next) {
//     //here we get the token from our header
//     const authHeader = req.headers['authorization']
//     //if we have a suthHeader then return the authHeader token portion which we split on the space otherwise return undefined
//     //so our token will either be undefined or it's going to be the actual token
//     const token = authHeader && authHeader.split('')[1]

//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
     
// }

// const jwt = require('jsonwebtoken')

// app.listen(PORT, (req, res) => {
//     console.log(`Server is listening on PORT: ${PORT}`);
// });





export default router;
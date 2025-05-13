import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name: { type: String, required: true, lowercase: true }, //this is a validator //if a user puts there name in all caps it will come to the database is all lowercase letters
    email: { type: String, required: true, unique: true, lowercase: true, },
    password: { type: String, required: true, lowercase: true },
    role: { type: String, default: 'user' }
}, {
    timestamps: true 
}) 


const User = mongoose.model('User', userSchema) 


//LAST 
export default User; 
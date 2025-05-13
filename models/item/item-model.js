//We established a connection to the database in the database  and now we are here I creating collections for the database with models

import mongoose from 'mongoose'

//starting with the schema
const itemSchema = new mongoose.Schema({
    //this is what the schema will look like
    //what rows and columns do I need for the items: name, color, size

    title: { type: String, required: true, lowercase: true },
    body: { type: String, required: true, lowercase: true },

    //More Examples
    // email: { type: String, unique: true, required: true },
    // airport: { type: String, enum: ['JFK', 'LAX', 'LGA'] } 
    //cart: { type: [String or Numbers or productSchema] }
    //readyToEat: { type: Boolean, default: false } //if you never provide if it's ready to eat or not then it will be false by default, you don't have to provide a selection
}, {
    timestamps: true // when you create or update the item it will now be timestamped
}) 

//keep track of the schema or a reference by putting it inside a variable so we can pass it in the mongoos.model()

//now that we are done creating the schema we can now finish building the model

//this creates a model following the fruitSchema. With this fruit model we can now call varioous methods on it like Item.find() if you need to query for something for example: Item.find({ readyToEat: true }) or Item.findById() which manipulates the data in this collection thanks to the creation of this model
const Item = mongoose.model('Item', itemSchema) //this needs to be a reference so put it in a variable //always capitalize the variable name here //parameter equals (name of the model/table, schema for the model to follow)


//LAST 
export default Item; 

//you can also do export { Item }. You can also add export in front of const Item like this: export const Item = mongoose.model('Item', itemSchema)
//now create router
import Item from '../../models/item/item-model.js'

//this is my seed for seed route
//asynchronous function
async function seedItems(req, res) {
    try {
        //we need access to the model we created in /routes/items/items-router.js 'Items'
        //anytime you're interacting with the database, we need to do it asychronously by using async/await 
        //we put await here because we want to make sure that all fruits get deleted before we begin to execute anything else, WHY***?
        //delete all existing items
       await Item.deleteMany({}) //we leave the object empty so it will query for everything instead of something specific. It deletes all of the documents inside of this specific database. then create some notes below
       await Item.create(
        {
           title: 'Finances',
           body: 'Financial meeting with John Doe friday.',
           taskComplete: true
        },
        {
            title: 'Vacation',
            body: 'Book flight to Bermuda Sunday.',
            taskComplete: false
         },
         {
            title: 'Chores',
            body: 'Do Laundry Wednesday.',
            taskComplete: true
         },
         {
            title: 'Shopping',
            body: 'Buy outfit for Jane and John babyshower by Sunday.',
            taskComplete: false
         },
         {
            title: 'Education',
            body: 'Have Capstone Project due by thursday midnight.',
            taskComplete: true
         },
         {
            title: 'Date Night',
            body: 'Book dinner reservation for 2 by Tuesday.',
            taskComplete: true
         }
     );
     res.status(201).redirect('/items'); //created = 201. we redirect the user back to /items because /items is the index route where we can see all the items. we have to send something back here are the browser will be inifinitely loading
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// Now we are creating another function called items //
// function for INDEX (Step 2 - for creating a route which is now creating the controller)

async function getItems(req, res){
    try {
        const items = await Item.find({}); //here we are finding all the items
        res.status(200).json(items); // here we share what we find with the clients.
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// function for CREATE 
async function createItem(req, res){
    try {
        //if was using a boolean like readyToEat you would need to account for the checkbox by doing this = req.body.readyToEat === 'on' ? req.body.readyToEat = true : req.body.readyToEat = false; 
        const item = await Item.create(req.body);
        console.log(item);
        res.status(201).json(item); //send the item created back as a response
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// function for Update 
async function updateItem(req, res){
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }); //find cart by id so we can update it req.body will contain the update, not sure if this is the case with qty increase and decrease //when you do findByIdAndUpdate when the update returns, it will return it in it's original form so to prevent this we need { new: true } this returns the updated document, not the original, it will still change without this but it won't show in postman
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//function to DELETE Item from shopping cart
async function deleteItem(req, res){
    try {
        const item = await Item.findByIdAndDelete(req.params.id); //this is an admin route where the admin can find that specifc cart and delete it/. You can allow the user to delete their cart as well req.params.id allows us to find the specific cart
        res.status(200).json(item); 
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//function for getting one item
async function getItem(req, res){
    try {
        const item = await Item.findById(req.params.id)
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//if qty drops to 0 then delete. inc and dec would be calling the update to the item through fetch request updateItem


// funciton for New
//this is what renders the new.ejs file
// async function renderNewForm(req, res){
//     try {
//         //here we are rendering the form from the new.ejs file
//         // in the views folder next go inside the items folder and then render the new.ejs file
//         res.render('./items/new.ejs')
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }

// funciton for Edit
//this is what renders the new.ejs file
// async function renderEditForm(req, res){
//     try {
//         //here we are rendering the form from the new.ejs file
//         // in the views folder next go inside the items folder and then render the new.ejs file
//         res.render('./items/new.ejs')
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }




//export controller function (Step 3 - export the function and then test it. At this point it should already be imported into routes folder as: import * as itemsController from '../../controllers/items/items-controller.js' and the route as: router.get('/new', itemsController.renderNewForm) and this: export default router;)
// always test after exporting: 
export {
    seedItems,
    getItems,
    updateItem,
    createItem,
    deleteItem,
    getItem
    // renderNewForm,
    // renderEditForm
}
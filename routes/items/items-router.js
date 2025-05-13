import express from 'express';
import * as itemsController from '../../controllers/items/items-controller.js';

const router = express.Router();

//this is a tester to make sure /items is working properly
// router.get('/', (req, res) => {
//     res.send(`I'm an item. Sike no I'm not.`)
// })

/////////////////////////////
// Routes / API Endpoints //
////////////////////////////

// All items routes (INDUCES = Index, New, Delete, Update, Create, Edit, Show) and their corresponding controller functions (CRUD = Create, Read, Update, Delete)

//define all routes needed 
///// Seed /////

//the seed route is a route to easily populate our database instead of doing a post route like router.post('/', (req, res) => {}), then once you do the post route you open up your HTTP Request tool in Postman and then having to specificy the name of the route http://localhost:3000/items and then doing POST then going to the body and clicking raw and then insert information in {} which can also end up being a lot if you do router.delete and then to get that info back oyu have to go and repost etc. IT'S ALOT!!
//Instead we can do whats below to populate our data for us

router.get('/seed', itemsController.seedItems) //instead of defining a callback function directly in the /seed file example: router.get('/seed', () => {}), instead we are going to do separation of concerns which is putting the callback functions in their own file instead i.e. controllers/items/items-controller.js


///// INDUCES /////


// Index (Step 1 when building a route) shows all items
router.get('/', itemsController.getItems);


// // New
// router.get('/new', itemsController.renderNewForm)

// // Delete
router.delete('/:id', itemsController.deleteItem)

// Update
router.put('/:id', itemsController.updateItem); //update qty button

// Create
router.post('/', itemsController.createItem); //this is for the future for an admin adding items to the store. comment function out in controllers as well


// // Edit
// router.get('/:id', itemsController.renderEditForm);

//Show
router.get('/:id', itemsController.getItem);

export default router;
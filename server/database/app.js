
const express = require('express'); // To create the server
const cors = require('cors'); // To allow cross-origin requests
const mongoose = require('mongoose'); // To connect to the MongoDB database
const { MongoClient } = require('mongodb'); 
const fs = require('fs'); // To read in the data from the JSON files
require('dotenv').config(); // To read in the environment variables

const app = express(); 
const port = 3030; // port where server will be listened

app.use(cors()); // allow cross-origin requests
app.use(require('body-parser').urlencoded({extended: false})); // parse application/x-www-form-urlencoded

// Read in the data from the JSON files
const dealerships_data = JSON.parse(fs.readFileSync('./data/dealerships.json', 'utf8'));
const reviews_data = JSON.parse(fs.readFileSync('./data/reviews.json', 'utf8'));

const uri = process.env.MONGO_URI; // get mongodb server URI

// Mongoose connection
mongoose.connect(uri) 
  .then(() => console.log('Mongoose connected'))
  .catch(err => console.log('Mongoose connection error: ', err));

// MongoDB client connection
const client = new MongoClient(uri);

// Connect to the database
(async () => { 
    try {
      await client.connect();
    } catch (e) {
      console.log('Error: ', e.message);
    }
})(); 

// Import data schemas 
const Dealerships = require('./dealership'); // dealership data schema
const Reviews = require('./review'); // review data schema

// Insert data into the database
(async () => {
    // Insert dealership data into the database, i.e. a collection of deaelerships
    try {
        const count_dealers = await Dealerships.countDocuments(); // count the number of documents in the dealership collection
        const count_reviews = await Reviews.countDocuments();
        if (count_dealers === 0) { // check if the dealership data already exists
            await Dealerships.insertMany(dealerships_data.dealerships);
            console.log('Dealership data inserted successfully');
        } else {
            console.log('Dealership data already exists, skipping data insertion');
        }
    } catch (error) {
        console.log('Error in processing data ', error);
    }
    // Insert reviews data into the database, i.e. a collection of reviews
    try {
        const count_reviews = await Reviews.countDocuments();
        if (count_reviews === 0) { // check if the reviews data already exists
            await Reviews.insertMany(reviews_data.reviews);
            console.log('Reviews data inserted successfully');
        } else {
            console.log('Reviews data already exists, skipping data insertion');
        }
    } catch (error) {
        console.log('Error in processing data ', error);
    }    

})(); 

// Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API");
});

// Get all dealerships from the database
app.get('/fetchDealers', async (req, res) => {
    try {
        const dealerships = await Dealerships.find();
        const sortedDealerships = [...dealerships].sort((a,b) => a.id - b.id) // sorted dealers list
        res.json(sortedDealerships);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching documents' });
    }
});

// Get a specific dealership from the database for an id
app.get('/fetchDealer/:id', async (req, res) => {
    try {
        const documents = await Dealerships.find({id: req.params.id});
        res.json(documents);
      } catch (error) {
        res.status(500).json({error:'Error fetching documents'});
    
      }
});

// Get a specific dealership from the database for a state
app.get('/fetchDealers/:state', async (req, res) => {
    try {
        const documents = await Dealerships.find({state: req.params.state});
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching documents' });
    }
});

// Get all reviews from the database
app.get('/fetchReviews', async (req, res) => {
    try {
        const reviews = await Reviews.find(); // 
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching documents' });
    }
});

// Get all reviews from the database for a specific dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
    try {
        const documents = await Reviews.find({dealership: req.params.id});
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching documents' });
    }
});

// Express route to insert a review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
    review_data = JSON.parse(req.body); // parse the request body
    const documents = await Reviews.find().sort({id: -1}); // fetches documents from the 'Reviews' collection in the database and sorts them in descending order based on the 'id' field.
    const new_id = documents[0].id + 1; // increment the id by 1 for a new review entry
    const review = new Reviews({
        "id": new_id, 
        "name": review_data.name, // name of the user giving the review
        "dealership": review_data.dealership,
        "review": review_data.review,
        "purchase": review_data.purchase,
        "purchase_date": review_data.purchase_date,
        "car_make": review_data.car_make,
        "car_model": review_data.car_model,
        "car_year": review_data.car_year,
    });
    try {
        const savedReview = await review.save(); // saving review entry
        res.json(savedReview); // return the saved review entry
    } catch (error) {
        res.status(500).json({ error: 'Error inserting review' });
    }
} );

// Start the server
app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`);
});
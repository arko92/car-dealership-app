
const express = require('express'); // To create the server
const cors = require('cors'); // To allow cross-origin requests
const mongoose = require('mongoose'); // To connect to the MongoDB database
const fs = require('fs'); // To read in the data from the JSON files
require('dotenv').config(); // To read in the environment variables
const { MongoClient } = require('mongodb');

const app = express(); 
const port = 3030; // port where server will be listened

app.use(cors()); // allow cross-origin requests
app.use(require('body-parser').urlencoded({extended: false})); // parse application/x-www-form-urlencoded

// Read in the data from the JSON files
const dealerships_data = JSON.parse(fs.readFileSync('./data/dealerships.json', 'utf8'));

const uri = process.env.MONGO_URI; // get mongodb server URI

// Mongoose connection
mongoose.connect(uri) 
  .then(() => console.log('Mongoose connected'))
  .catch(err => console.log('Mongoose connection error: ', err));

// MongoDB client connection
const client = new MongoClient(uri);

(async () => { // connect to the database
    try {
      await client.connect();
    } catch (e) {
      console.log('Error: ', e.message);
    }
})();

// Import data schemas 
const Dealerships = require('./dealership'); // dealership data schema

const fill_data = async () => {
    try {
        const count = await Dealerships.countDocuments();
        if (count === 0) {
            await Dealerships.insertMany(dealerships_data.dealerships);
            console.log('Dealership data inserted successfully');
        } else {
            console.log('Dealership data already exists, skipping data insertion');
        }
    } catch (error) {
        console.log('Error in processing data ', error);
    }
}

fill_data(); // fill the database with data

// Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API");
});

// Get all dealerships from the database
app.get('/fetchDealers', async (req, res) => {
    try {
        const dealerships = await Dealerships.find();
        res.json(dealerships);
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

// Start the server
app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`);
});
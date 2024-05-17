
const express = require('express'); // To create the server
const  cors = require('cors'); // To allow cross-origin requests
const mongoose = require('mongoose'); // To connect to the MongoDB database
const fs = require('fs'); // To read in the data from the JSON files

const app = express();
const port = 3030;

app.use(cors()); // allow cross-origin requests
app.use(require('body-parser').urlencoded({extended: false})); // parse application/x-www-form-urlencoded

// Read in the data from the JSON files
const dealerships_data = JSON.parse(fs.readFileSync('./data/dealerships.json', 'utf8'));

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/",{'dbName':'dealershipsDB'}); 

// import data schemas 
const Dealerships = require('./dealership');


// insert data into the database
try {
    Dealerships.deleteMany({}).then(()=>{
      Dealerships.insertMany(dealerships_data.dealerships);
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }

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
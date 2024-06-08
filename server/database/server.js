const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

const dealerships_data = JSON.parse(fs.readFileSync('./data/dealerships.json', 'utf8'));
const reviews_data = JSON.parse(fs.readFileSync('./data/reviews.json', 'utf8'));

const uri = process.env.MONGO_URI;

// Mongoose connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongoose connected'))
  .catch(err => console.log('Mongoose connection error: ', err));

// MongoDB client connection
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,  // 30 seconds
  socketTimeoutMS: 45000,  // 45 seconds
});

(async () => { 
  try {
    await client.connect();
    console.log('MongoDB client connected');
  } catch (e) {
    console.log('MongoDB client connection error: ', e.message);
  }
})(); 

const Dealerships = require('./dealership');
const Reviews = require('./review');

(async () => {
  try {
    const count_dealers = await Dealerships.countDocuments();
    if (count_dealers === 0) {
      await Dealerships.insertMany(dealerships_data.dealerships);
      console.log('Dealership data inserted successfully');
    } else {
      console.log('Dealership data already exists, skipping data insertion');
    }
  } catch (error) {
    console.log('Error in processing data ', error);
  }

  try {
    const count_reviews = await Reviews.countDocuments();
    if (count_reviews === 0) {
      await Reviews.insertMany(reviews_data.reviews);
      console.log('Reviews data inserted successfully');
    } else {
      console.log('Reviews data already exists, skipping data insertion');
    }
  } catch (error) {
    console.log('Error in processing data ', error);
  }    
})(); 

app.get('/', async (req, res) => {
  res.send("Welcome to the Mongoose API");
});

app.get('/fetchDealers', async (req, res) => {
  try {
    const dealerships = await Dealerships.find();
    const sortedDealerships = [...dealerships].sort((a, b) => a.id - b.id);
    res.json(sortedDealerships);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const documents = await Dealerships.find({ id: req.params.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const documents = await Dealerships.find({ state: req.params.state });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchReviews', async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({ dealership: req.params.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  const review_data = JSON.parse(req.body);
  const documents = await Reviews.find().sort({ id: -1 });
  const new_id = documents[0].id + 1;
  const review = new Reviews({
    id: new_id,
    name: review_data.name,
    dealership: review_data.dealership,
    review: review_data.review,
    purchase: review_data.purchase,
    purchase_date: review_data.purchase_date,
    car_make: review_data.car_make,
    car_model: review_data.car_model,
    car_year: review_data.car_year,
  });
  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Lambda handler for serverless deployment
module.exports.handler = serverless(app);

// Start the server locally
if (require.main === module) {
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
}


# Dealership and Review API

This is a Node.js application using Express, MongoDB, and Mongoose, deployed on AWS Elastic Beanstalk. It provides endpoints to manage and fetch dealership and review data.

## Features

- Connects to a MongoDB database
- Provides RESTful API endpoints to fetch and insert dealership and review data
- Configured to run in a serverless environment using AWS Elastic Beanstalk

## Prerequisites

- Node.js and npm installed
- AWS CLI installed and configured
- AWS Elastic Beanstalk CLI installed

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create a `.env` file:**

   Create a `.env` file in the root directory with the following content:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3030
   ```

3. **Run the application locally:**

   ```bash
   npm start
   ```

   The application should be running on `http://localhost:3030`.

## Deployment on AWS Elastic Beanstalk

### Steps to Deploy

1. **Initialize Elastic Beanstalk application:**

   ```bash
   eb init -p node.js dealership-api --region your-region
   ```

2. **Create Elastic Beanstalk environment:**

   ```bash
   eb create dealership-api-env
   ```

3. **Set environment variables:**

   ```bash
   eb setenv MONGO_URI=your_mongodb_connection_string
   ```

4. **Deploy the application:**

   ```bash
   eb deploy
   ```

### Reasons for Choosing Elastic Beanstalk

1. **Ease of Use:**
   AWS Elastic Beanstalk abstracts much of the underlying infrastructure, making it easy to deploy and manage applications without needing deep AWS knowledge.

2. **Scalability:**
   Elastic Beanstalk automatically handles the scaling of your application up or down based on demand.

3. **Managed Environment:**
   It provides a managed environment for running applications, including health monitoring, load balancing, and automatic provisioning.

4. **Flexibility:**
   You can customize your environment using configuration files and integrate other AWS services like RDS, S3, and more.

5. **Cost-Effective:**
   For small projects and portfolio applications, Elastic Beanstalk offers a cost-effective way to deploy and run applications with minimal management overhead.

## API Endpoints

- `GET /fetchDealers`: Fetch all dealerships.
- `GET /fetchDealer/:id`: Fetch a dealership by ID.
- `GET /fetchDealers/:state`: Fetch dealerships by state.
- `GET /fetchReviews`: Fetch all reviews.
- `GET /fetchReviews/dealer/:id`: Fetch reviews by dealership ID.
- `POST /insert_review`: Insert a new review.


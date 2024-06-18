
# CAR-DEALERSHIP-APP

## Table of Contents
- [About](#about)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Stopping the Application](#stopping-the-application)
- [Accessing the Application](#accessing-the-application)
- [Environment Variables](#environment-variables)
- [Notes](#notes)

## About
A car dealership full-stack web application providing an overview of the available car dealers in the locality with user reviews. Registered users can also post reviews for the car dealers. The app includes a flask and AI-based microservice to predict the sentiments of user reviews. It is built with a React frontend and a Django backend, containerized using Docker, and managed with Docker Compose. The microservice and backend are deployed on AWS.

## Technologies

## Frontend
- React
## Backend
- Django
- Flask
- nodeJS
- Express

## Database
- MongoDB
- PostgreSQL

## CI/CD
- Github actions

## Containerization
- Docker
- Docker Compose

## Deployment
- AWS lambda
- Elastic beanstalk
- ECR

# Steps to containerize the full stack application

## Prerequisites
- Docker
- Docker Compose

## Installation

1. **Clone the Repository**:
    ```
    git clone https://github.com/arko92/car-dealership-app
    cd CAR-DEALERSHIP-APP/server
    ```

2. **Set Up Environment Variables**:
    - Create a `.env` file in the `server` directory with the following content:
        ```
        POSTGRES_DB=your_db_name
        POSTGRES_USER=your_db_user
        POSTGRES_PASSWORD=your_db_password
        ```

## Running the Application

1. **Build and Start Containers**:
    ```
    docker-compose up --build
    ```

## Stopping the Application

1. **Stop Containers**:
    ```bash
    docker-compose down
    ```

## Accessing the Application

[http://localhost:8000](http://localhost:8000)

## Environment Variables

Ensure the `.env` file in the `server` directory contains the following:
```env
POSTGRES_DB=your_db_name
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
```

## Notes

- **Database Credentials**: Ensure the database credentials in the `.env` file match your local setup.
- **Docker Volumes**: Docker volumes are used to persist PostgreSQL data and manage static files.

---

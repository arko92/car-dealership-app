
# CAR-DEALERSHIP-APP

A full-stack application with a React frontend and a Django backend.

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
This project is a car dealership application built with a React frontend and a Django backend, containerized using Docker and managed with Docker Compose.

## Technologies
- React
- Django
- Flask
- AWS
- mongoDB
- PostgreSQL
- Docker
- Docker Compose

## Prerequisites
- Docker
- Docker Compose

## Installation

1. **Clone the Repository**:
    ```
    git clone https://github.com/yourusername/CAR-DEALERSHIP-APP.git
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
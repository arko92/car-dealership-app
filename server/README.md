# CAR-DEALERSHIP-APP Containerization

The application is containeraized using docker in the following steps

1. **Create Dockerfile for React Frontend**:
    - In `server/client/Dockerfile`:
        - Build the React app and serve it using Nginx.

2. **Create Dockerfile for Django Backend**:
    - In `server/Dockerfile`:
        - Build the React app.
        - Copy static files from the React build to the Django static directory.
        - Collect static files.
        - Run the Django application using Gunicorn.

3. **Setup Docker Compose**:
    - In `server/docker-compose.yml`:
        - Define services for PostgreSQL, Django backend, and React frontend.
        - Configure environment variables and volume mounts.

4. **Build and Run Containers**:
    - Navigate to the `server` directory.
    - Run the following commands to build and start the containers:
        ```bash
        docker-compose down
        docker-compose up --build
        ```

5. **Verify Deployment**:
    - Access the React frontend at `http://localhost`.
    - Access the Django backend at `http://localhost:8000`.

## Notes

- Ensure `.env` file in the `server` directory contains database credentials.

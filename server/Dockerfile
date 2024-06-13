# Stage 1: Build the React app
FROM node:14 as frontend-build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY client/ ./

# Build the React app
RUN npm run build

# Stage 2: Build the Django app
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the required dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Copy static files from the frontend build stage
COPY --from=frontend-build /app/build /app/static

# Collect static files
RUN python manage.py collectstatic --noinput


# Copy additional static files
COPY ./client/static /app/static


# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "djangoproj.wsgi:application"]

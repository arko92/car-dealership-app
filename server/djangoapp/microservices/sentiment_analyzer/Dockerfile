# Use the official Python image from the Docker Hub
FROM python:3.8-slim

# Set environment variables to prevent Python from writing .pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt /app/

# Install the dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    python -m nltk.downloader vader_lexicon

# Copy the rest of the application code into the container
COPY . /app/

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["python", "app.py"]


# Sentiment Analyzer Flask Application

This repository contains a Flask application for sentiment analysis using NLTK. The application is designed to be deployed on AWS Lambda using the AWS Serverless Application Model (SAM) and Docker.

## Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- [Docker](https://www.docker.com/products/docker-desktop)
- Python 3.12
- NLTK library

## Setup and Deployment Steps


1. **Create a virtual environment and install dependencies:**

   ```sh
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Download NLTK data:**

   ```sh
   mkdir -p nltk_data
   python -m nltk.downloader -d nltk_data vader_lexicon
   ```

3. **Build the SAM application:**

   ```sh
   sam build
   ```

4. **Start the local API Gateway:**

   ```sh
   sam local start-api
   ```

5. **Test the local endpoints:**

   ```sh
   curl http://localhost:3000/
   curl http://localhost:3000/analyze/test
   ```

6. **Deploy to AWS:**

   ```sh
   sam deploy --guided
   ```

   During the guided deployment, you will be prompted to provide the following information:
   - **Stack Name**: Enter a meaningful name for your stack (e.g., `sentiment-analyzer-stack`).
   - **AWS Region**: Choose your preferred AWS region (e.g., `eu-central-1`).
   - **Confirm changes before deploy**: Enter `y` to review changes before deploying.
   - **Allow SAM CLI IAM role creation**: Enter `y` to allow SAM to create roles.
   - **Save arguments to samconfig.toml**: Enter `y` to save your deployment settings.

7. **Test the deployed endpoints:**

   After deployment, you will receive the API Gateway endpoint URL. Use this URL to test your deployed Flask application:

   ```sh
   curl https://<api-id>.execute-api.<region>.amazonaws.com/Prod/
   curl https://<api-id>.execute-api.<region>.amazonaws.com/Prod/analyze/test
   ```

   Replace `<api-id>` and `<region>` with the actual values from your deployment.

## Cleanup

To delete the stack and all associated resources:

```sh
aws cloudformation delete-stack --stack-name sentiment-analyzer-stack
```


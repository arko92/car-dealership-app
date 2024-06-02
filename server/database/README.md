# Deployment approach selection
AWS SAM CLI serverless approach is choosen for the deployment of the database server:

* To take advantage of the serverless model with automatic scaling and no infrastructure management
* Because application process runtime is within aws lambda time out limits (i.e. < 15 mins)
* To have a cost effective solution

The deployment using docker images on AWS ECS with Fragrate is not choosen:
* Because of complex setup and managament
* Because it requires detailed configuration of networking
* Becasue it is less cost effective w.r.t resource management than aws lambda

# Steps of deployment

## Prerequisites

- [AWS CLI](https://aws.amazon.com/cli/)
- [AWS SAM CLI](https://aws.amazon.com/serverless/sam/)
- [Docker](https://www.docker.com/products/docker-desktop) (for local testing)
- Node.js and npm

### 1. Install Dependencies

```sh
npm install
```

### 2. Create a SAM Template



### 3. Modify Your Application for Lambda


### 4. Build and Deploy the SAM Application

1. **Build the SAM Application**

   ```sh
   sam build
   ```

2. **Deploy the SAM Application**

   ```sh
   sam deploy --guided
   ```

   During the guided deployment, you will be prompted to provide the following information:
   - **Stack Name**: Enter a meaningful name for your stack (e.g., `nodejs-app-stack`).
   - **AWS Region**: Choose your preferred AWS region (e.g., `us-east-1`).
   - **MongoURI Parameter**: Provide the MongoDB connection URI.
   - **Confirm changes before deploy**: Enter `y` to review changes before deploying.
   - **Allow SAM CLI IAM role creation**: Enter `y` to allow SAM to create roles.
   - **Save arguments to samconfig.toml**: Enter `y` to save your deployment settings.

### 6. Test the Deployed Application

After deployment, you will receive the API Gateway endpoint URL. Use this URL to test your deployed Node.js application:

```sh
curl https://<api-id>.execute-api.<region>.amazonaws.com/Prod/
curl https://<api-id>.execute-api.<region>.amazonaws.com/Prod/fetchDealers
```

Replace `<api-id>` and `<region>` with the actual values from your deployment.

## Cleanup

To delete the stack and all associated resources:

```sh
aws cloudformation delete-stack --stack-name nodejs-app-stack
```


# Neurobot

![logo](./assets/logo.png)

## Overview

Neurobot is an AI-powered chat platform that takes ordinary emails to the next level. By leveraging the domain **basemail.me** as a universal proxy, our system automatically provisions inboxes for any basename. For example, if a user has the name **john.base.eth**, they automatically own the email address **john@basemail.me**. But these aren't your typical emails – they're supercharged AI emails, intelligently summarized and elegantly formatted to make information extraction effortless. On top of that, Basemail offers a voice-enabled inbox where a natural language voice agent lets you interact with every single email in any language.

Built during a 48-hour hackathon, Basemail combines rapid development with modern, scalable AWS serverless architecture, pushing the envelope on what email can do.

## Features

- **Dynamic Mailbox Provisioning:**  
  Automatically creates a personalized inbox for any basename using the basemail.me proxy domain.

- **AI-Powered Summarization & Formatting:**  
  Incoming emails are processed through AI (using AWS Bedrock and Pinecone) to extract summaries and emphasize the critical parts – making content super digestible.

- **Voice-Enabled Interaction:**  
  A voice agent lets you query and interact with your emails using natural language – talk to your inbox in any language.

- **Real-Time Communication:**  
  WebSocket integrations provide live updates and interactive messaging capabilities for a seamless experience.

- **Scalable Serverless Architecture:**  
  Leveraging AWS services like Lambda, SES, S3, DynamoDB, and API Gateway, ensuring high performance and low maintenance.

## Architecture

Basemail is composed of three main AWS CloudFormation stacks (built with AWS CDK in TypeScript):

1. **Mail Stack:**

   - **SES & S3:** Emails arriving via AWS SES are stored in an S3 bucket.
   - **Lambda Processing:** A Lambda function (via `NodejsFunction`) triggered by SES events processes incoming emails, writing them to the bucket and forwarding them for further AI enhancement.
   - **IAM Policies:** Fine-grained access permissions ensure each component (SES, Lambda, S3) interacts securely.

2. **API Stack:**

   - **HTTP and WebSocket APIs:** Provides REST endpoints for email retrieval and supports real-time connections (using API Gateway and WebSocket integrations).
   - **Lambda Functions:** Various Lambda functions manage API requests, process WebSocket events, and even handle errors (with SQS DLQs for fault tolerance).
   - **DynamoDB:** Manages the connections for the WebSocket-based real-time chat interface.

3. **Bedrock Stack:**
   - **AI Knowledge Base:** Integrates AWS Bedrock with a Pinecone vector store to create a knowledge base that powers email summarization and natural language querying.
   - **S3 DataSource:** Uses a dedicated S3 bucket to store and process the data that feeds into the AI system.

## How It Works

1. **Email Reception:**  
   Incoming emails are received by AWS SES for the basemail.me domain. A receipt rule routes these emails to an S3 bucket.

2. **Email Processing:**  
   A dedicated Lambda function (the mail handler) retrieves the new email from S3, processes its contents, and invokes AI routines to summarize and elegantly format the email data.

3. **AI Enhancements:**  
   Using the Bedrock stack, emails are transformed into a rich, queryable knowledge base. This includes vector embeddings and semantic processing via Pinecone.

4. **Interactive Inbox:**  
   Users can interact with their inbox both via a traditional API and a WebSocket-enabled real-time chat interface. A voice-enabled agent further offers natural language interaction with email content.

## Getting Started

### Prerequisites

- **AWS Account:** Ensure you have an active AWS account with proper permissions.
- **AWS CDK:** Install and configure the AWS CDK.
- **Node.js:** Ensure Node.js and npm/yarn are installed.
- **Environment Variables:** Set the following variables in your deployment environment:
  - `CLERK_SECRET_KEY`
  - `DISCORD_WEBHOOK_URL`
  - `PINECONE_DB`
  - `PINECONE_SECRET_ARN`
  - _[Any others as needed]_

### Installation & Deployment

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Bootstrap CDK (if needed) & deploy:**

   ```bash
   npx cdk bootstrap
   npx cdk deploy
   ```

   Deploy each stack as needed:

   - Basemail Mail Stack
   - Basemail API Stack
   - Basemail Bedrock Stack

## Usage

- **Email Functionality:**  
  Once deployed, simply use your basename (e.g., `john`) to access your personalized email inbox at `john@basemail.me`.

- **AI Interaction:**  
  Access summarized and formatted emails via our web API or use the voice agent for a conversational experience to query and interact with your emails.

- **Real-Time Updates:**  
  Connect via the provided WebSocket endpoint for live interaction and updates.

## Future Roadmap

- **Enhanced AI Models:**  
  Integrate additional machine learning models to further improve summarization and content extraction.

- **Voice Agent Improvements:**  
  Expand the voice-enabled functionality with advanced natural language processing and broader language support.

- **User Interface:**  
  Develop dedicated client applications (web and mobile) that fully leverage Basemail's backend capabilities.

## License

This project is released under the [MIT License](LICENSE).

## Acknowledgments

Developed as part of a 48-hour hackathon, Basemail is a demonstration of rapid prototyping combined with powerful AWS services and innovative AI integration.

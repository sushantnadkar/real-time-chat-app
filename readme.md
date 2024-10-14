# Chat App
A simple chat-like interface that communicates with a background service to answer questions.

# Getting Started

## Prerequisites
- Node.js installed on your machine

## Installation
1. Clone repository
2. Navigate to the `backgroundService` directory
    1. Run `npm install`
    2. Create a copy of `env.template` in the same directory and rename it to `.env`
    3. Add you own NASA API key to this `.env` file. You can get one at [https://api.nasa.gov:443](https://api.nasa.gov:443)
3. Navigate to the `expressApp` directory
    1. Run `npm install`
    2. Create a copy of `env.template` in the same directory and rename it to `.env`
4. Navigate to the `real-time-chat` directory
    1. Run `npm install`
5. Navigate back to the root directory
    1. Run `npm run ui` to start the UI
    2. Run `npm run background` to start the background service
    3. Run `npm run express` to start the express server

## Usage
1. Open the UI in your browser: http://localhost:3000
2. Type a question in the input field and press _Send_
3. The app will display the answer in the output area

# Supported Questions
- ping: replies with pong
- weather: fetches the current weather using wttr.in and displays the response
- apod: fetches the Astronomy Picture of the Day using NASA's API and displays the image link
- Any other question: replies with _Unknown question_

# Architecture
The app consists of three parts:

1. Background Service: A Node.js service that listens for incoming messages, processes the questions, and sends back the answers.
2. ExpressJs App: A Node.js app that sets up a WebSocket connection with the UI and forwards the questions to the Background Service.
3. UI (Socket App): A simple React chat-like interface that sends questions to the ExpressJs App and displays the answers.

# Deployment
The React UI app, ExpressJs App and Background Service can be deployed on separate servers.

# License
MIT License

# Acknowledgments
- wttr.in for providing the weather API
- NASA for providing the Astronomy Picture of the Day API
import {WebSocketServer} from 'ws';
import axios from 'axios';


export default class WebSocketServerClass {
  constructor() {
    const wss = new WebSocketServer({ port: 8080 });
    wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', async (message) => {
        console.log(`Received message: ${message}`);
        // Forward the message to the Background Service
        axios.post('http://localhost:3001/questions', { question: message })
            .then((response) => {
                console.log('Received answer:', response);
                ws.send(response.data);
            })
            .catch((error) => {
                console.error('Axios error:', error);
                console.error('Error message:', error.message);
                console.error('Error code:', error.code);
            });
      });
    });
  }
}

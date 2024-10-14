import React, { useState, useEffect } from 'react';

function App() {
	const [input, setInput] = useState('');
	const [output, setOutput] = useState([]);
	const [ws, setWs] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [isConnecting, setIsConnecting] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setIsConnecting(true);
		const ws = new WebSocket('ws://localhost:8080');
		setWs(ws);

		ws.onmessage = (event) => {
			const answer = event.data;
			if (answer.startsWith('https')) {
				const img = document.createElement('img');
				img.src = answer;
				img.alt = 'NASA APOD';
				setOutput((output) => [...output, <img src={answer} alt="NASA APOD" />]);
			} else {
				setOutput((output) => [...output, answer]);
			}
			setLoading(false);
		};

		ws.onopen = () => {
			console.log('Connected to the server');
			setIsConnected(true);
			setIsConnecting(false);
		};

		ws.onerror = (error) => {
			console.log('Error occurred:', error);
			setIsConnecting(false);
		};

		ws.onclose = () => {
			console.log('Disconnected from the server');
			setIsConnected(false);
			setIsConnecting(false);
		};
	}, []);

	const handleSend = () => {
		if (isConnected) {
			console.log('Sending message:', input);
			ws.send(input);
			setLoading(true);
			setInput('');
		} else if (isConnecting) {
			console.log('Waiting for the WebSocket connection to be established...');
		} else {
			console.log('WebSocket connection is not established yet');
		}
	};

	return (
		<div>
			<h1>Chat App</h1>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Ask a question"
			/>
			<button onClick={handleSend} disabled={!isConnected || loading}>
				{isConnecting ? 'Connecting...' : loading ? 'Loading' : 'Send'}
			</button>
			<div id="output">
				{output.map((msg, index) => (
					<div key={index} className="message">
						{msg}
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
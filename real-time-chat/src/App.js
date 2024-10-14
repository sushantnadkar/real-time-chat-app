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
				setOutput((output) => [...output, { type: "received", text: <img src={answer} alt="NASA APOD" />}]);
			} else {
				setOutput((output) => [...output, { type: "received", text: answer}]);
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
			setOutput((output) => [...output, { type: "sent", text: input }])
			setLoading(true);
			setInput('');
		} else if (isConnecting) {
			console.log('Waiting for the WebSocket connection to be established...');
		} else {
			console.log('WebSocket connection is not established yet');
		}
	};

	return (
		<div className="chat-container">
			<div className="chat-header">
				<h1>Chat App</h1>
			</div>
			<div className="chat-body">
				<div id="output">
					{output.map((msg, index) => (
						<div key={index} className={`message ${msg.type === 'sent' ? 'sent' : 'received'}`}>
							<span className="message-text">{msg.text}</span>
						</div>
					))}
				</div>
			</div>
			<div className="chat-footer">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type a message"
					className="chat-input"
				/>
				<button onClick={handleSend} disabled={!isConnected || loading} className="chat-send-button">
					{isConnecting ? 'Connecting...' : loading ? 'Loading' : 'Send'}
				</button>
			</div>
		</div>
	);
}

export default App;
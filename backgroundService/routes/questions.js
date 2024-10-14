import express from 'express';
import axios from 'axios';


export const router = express.Router();

router.post('/questions', async (req, res) => {
	console.log('Received question:', req);
	const question = Buffer.from(req.body.question.data).toString();
	console.log('Received question:', question);
	let func;
	switch (question) {
		case 'ping':
			func = () => 'pong'
			break;
		case 'weather':
			func = async () => {
				try {
					const response = await axios.get('https://wttr.in/?format=3')
						.catch(error => {
							res.send(`${error.response.data.error.code}: ${error.response.data.error.message}`)
						});
					return response.data;
				} catch(e) {
					return `Network Error please try again later: ${e}`
				}
			}
			break;
		case 'apod':
			func = async () => {
				if(typeof process.env.NASA_API_KEY === 'undefined')
					return `NASA_API_KEY missing`;
				try {
					const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`)
						.catch(error => {
							res.send(`${error.response.data.error.code}: ${error.response.data.error.message}`)
						});
					return response?.data?.url;
				} catch(e) {
					return `Network Error please try again later: ${e}`
				}
			}
			break;
		default:
			func = () => 'Unknown question';
			break;
	}
	const answer = await func();
	res.send(answer);
});

export default router;

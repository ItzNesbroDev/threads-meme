// remove this if you are not using replit
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
// -------------------------------- //

const { ThreadsAPI } = require("threads-api")
const fetch = require("node-fetch")
// remove if you are using replit
require("dotenv").config();

const main = async() => {
	const thread = new ThreadsAPI({
		username: process.env.USERNAME,
		password: process.env.PASSWORD
	})

	const fetchMeme = async () => {
		try {
			const response = await fetch("https://meme-api.com/gimme")
			const meme = await response.json()

		if (meme.nsfw === true) {
      return;
		} else {   
			await thread.publish({
				text: meme.title,
				attachment: {
					image: meme.url
				}
			})
		}
		} catch (error) {
			console.log('An error found, ' + error)
		}
	}

	fetchMeme()
	setInterval(fetchMeme, 86400000)
}
main()
require('dotenv').config();
console.log('Current Working Directory:', process.cwd());

/*
TO START: node server.js
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line

const app = express();
const port = 5050;

// Enable CORS middleware
app.use(cors());

// MongoDB connection, need your ENV file
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB!');
});

// Define a mongoose model
const TodoData = mongoose.model('TodoData', { 
	todo: String,
	deadline: String,
	status: String,
	uID: String
});

// Middleware to parse JSON requests
app.use(express.json());

// POST endpoint to receive data
app.post('/api/endpoint', async (req, res) => {
	const { todo, deadline } = req.body;

	try {
		const document = new TodoData({ todo, deadline });
		await document.save();

		res.status(201).json({ message: 'Data saved successfully' });
	} catch (error) {
		console.error('Error saving data to MongoDB:', error);
		res.status(500).json({ error: 'Internal Server Error', details: error.message });
	}
});

app.get('/api/endpoint', async (req, res) => {
	try {
		const data = await TodoData.find();
		res.status(200).json(data);
	} catch (error) {
		console.error('Error fetching data from MongoDB:', error);
		res.status(500).json({ error: 'Internal Server Error', details: error.message });
	}
});

app.delete('/api/endpoint/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedData = await TodoData.findByIdAndDelete(id);

        if (deletedData) {
            res.status(200).json({ message: 'Data deleted successfully' });
        } else {
            res.status(404).json({ error: 'Data not found', details: 'No data with the provided ID' });
        }
    } catch (error) {
        console.error('Error deleting data from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

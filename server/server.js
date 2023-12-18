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
console.log (process.env.MONGODB_URI);
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
const TextData = mongoose.model('TextData', { txtData: String });

// Middleware to parse JSON requests
app.use(express.json());

// POST endpoint to receive data
app.post('/api/endpoint', async (req, res) => {
  const { txtData } = req.body;

  try {
    const document = new TextData({ txtData });
    await document.save();

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.get('/api/endpoint', async (req, res) => {
  try {
    const data = await TextData.find();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

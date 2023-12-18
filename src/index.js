import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const DataTxt= require('./models/dataSchema');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://cluster0.2tcjphh.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', { useNewUrlParser: true });

app.post('/insert', async(req, res) => {
    const _dataTxt = req.body.dataTxt

    const formData = new DataTxt({
        dataTxt: _dataTxt,
    })

    try {
        await formData.save();
        res.send("inserted data..")
    } catch(err) {
        console.log(err)
    }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

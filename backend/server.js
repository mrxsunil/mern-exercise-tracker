//  Dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// To config environment variables from dotenv file
require('dotenv').config();

// Express server
const app = express();
const port = process.env.PORT || 5000;  // Server port

app.use(cors());    // to use cors
app.use(express.json());  // to allow parse json

// Connecting to MongoDB
const uri = process.env.ATLAS_URI;   // read URI from process.env  
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});  
const connection = mongoose.connection;  
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// For API call routing 
const exerciseRouter = require('./routes/exercises');    
const usersRouter = require('./routes/users');

app.use('/exercises',exerciseRouter);   //for handling /exercises/*
app.use('/users',usersRouter);          //for handling /users/*

// Start the server listening 
app.listen(port,() => {
    console.log(`Server is running on port : ${port}`);
});

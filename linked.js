// Importing required modules
const express = require('express');

// Creating an instance of Express
const app = express();

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const express = require ('express');
const app = express();
const port = 3000;

app.use(express.json());

const info = require('./data/mentees.json'); // check if this is the right path

app.get('/api/info', (req,res)=>
{
    res.json(info);
});

app.listen(port, ()=> {
    console.log(`Server running at https://localhost:${port}`);
});

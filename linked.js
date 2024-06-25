const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { loadMentorsAndMatchMentee } = require('./matching/mentee');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the 'ui' directory
app.use(express.static(path.join(__dirname, 'ui')));
app.use(bodyParser.json());

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui', 'create-Mentee-profile.html'));
});

// Additional routes for other HTML files if necessary
app.get('/matches', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui', 'matches.html'));
});

app.get('/myMentee', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui', 'myMentee.html'));
});

app.get('/myMentor', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui', 'myMentor.html'));
});

// Route to handle form submission and save mentee profile
app.post('/save-mentee-profile', (req, res) => {
    const mentee = req.body;

    loadMentorsAndMatchMentee(mentee, (err, matches) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json({ message: 'Profile saved and matches generated successfully', matches });
    });
});

// Route to clear/reset the temporary matching data
app.post('/reset-matching-data', (req, res) => {
    const matchesPath = path.join(__dirname, 'matching', 'mentee_to_mentor_matches.json');
    fs.writeFile(matchesPath, JSON.stringify([], null, 4), 'utf8', err => {
        if (err) {
            console.error('Error resetting matches.json:', err);
            res.status(500).json({ error: 'Failed to reset matching data' });
            return;
        }
        console.log('Matching data reset successfully');
        res.json({ message: 'Matching data reset successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
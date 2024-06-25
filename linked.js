const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { loadMentorsAndMatchMentee } = require('./matching/mentee');
const { loadMenteesAndMatchMentor } = require('./matching/mentor');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the 'ui' directory
app.use(express.static(path.join(__dirname, 'ui')));
app.use(bodyParser.json());

// Route to serve the main HTML file for mentee profile creation
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui', 'create-Mentee-profile.html'));
});

// Route to serve the main HTML file for mentor profile creation
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui', 'create-Mentor-profile.html'));
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

    console.log('Received mentee profile:', mentee); // Debugging log

    loadMentorsAndMatchMentee(mentee, (err, matches) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json({ message: 'Matches data saved to mentee_to_mentor_matches.json', matches });
    });
});

// Route to handle form submission and save mentor profile
app.post('/save-mentor-profile', (req, res) => {
    const mentor = req.body;

    console.log('Received mentor profile:', mentor); // Debugging log

    loadMenteesAndMatchMentor(mentor, (err, matches) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json({ message: 'Matches data saved to mentor_to_mentee_matches.json', matches });
    });
});

// Route to clear/reset the temporary matching data
app.post('/reset-matching-data', (req, res) => {
    const menteeMatchesPath = path.join(__dirname, 'matching', 'mentee_to_mentor_matches.json');
    const mentorMatchesPath = path.join(__dirname, 'matching', 'mentor_to_mentee_matches.json');
    
    const resetData = [];

    fs.writeFile(menteeMatchesPath, JSON.stringify(resetData, null, 4), 'utf8', err => {
        if (err) {
            console.error('Error resetting mentee matches:', err);
            res.status(500).json({ error: 'Failed to reset mentee matching data' });
            return;
        }
        console.log('Mentee matching data reset successfully');
    });

    fs.writeFile(mentorMatchesPath, JSON.stringify(resetData, null, 4), 'utf8', err => {
        if (err) {
            console.error('Error resetting mentor matches:', err);
            res.status(500).json({ error: 'Failed to reset mentor matching data' });
            return;
        }
        console.log('Mentor matching data reset successfully');
        res.json({ message: 'Matching data reset successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

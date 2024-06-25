const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the 'ui' directory
app.use(express.static(path.join(__dirname, 'ui')));
app.use(bodyParser.json());

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui', 'makeProfile.html'));
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

// Function to calculate match percentage
function calculateMatchPercentage(mentor, mentee) {
    let score = 0;
    let maxScore = 0;

    // Check degree
    if (mentee.degree) {
        maxScore += 1;
        if (mentor.degrees.includes(mentee.degree)) {
            score += 1;
        }
    }

    // Check industry
    if (mentee.industry) {
        maxScore += 1;
        if (mentor.industries.includes(mentee.industry)) {
            score += 1;
        }
    }

    // Check school
    if (mentee.school) {
        maxScore += 1;
        if (mentor.school_names.includes(mentee.school)) {
            score += 1;
        }
    }

    // Check location
    if (mentee.location) {
        maxScore += 1;
        if (mentor.current_location === mentee.location.toUpperCase()) {
            score += 1;
        }
    }

    // Check time preference
    if (mentee.time_preference) {
        maxScore += 1;
        if (mentor.time_preference === mentee.time_preference) {
            score += 1;
        }
    }

    // Check skills
    if (mentee.skills.length > 0) {
        maxScore += mentee.skills.length;
        const matchingSkills = mentor.skills.filter(skill => mentee.skills.includes(skill));
        score += matchingSkills.length;
    }

    // Check underrepresented groups
    if (mentee.underrepresented_group) {
        maxScore += 1;
        if (mentor.underrepresented_group && mentor.underrepresented_group.includes(mentee.underrepresented_group)) {
            score += 1;
        }
    }

    return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
}

// Function to match mentee with mentors and sort by match percentage
function matchMenteeWithMentors(mentee, mentors) {
    const matches = mentors.map(mentor => {
        const matchPercentage = calculateMatchPercentage(mentor, mentee);
        return {
            ...mentor,
            matchPercentage
        };
    });

    // Sort matches in descending order of match percentage
    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
    return matches;
}

// Function to match mentor with mentees and sort by match percentage
function matchMentorWithMentees(mentor, mentees) {
    const matches = mentees.map(mentee => {
        const matchPercentage = calculateMatchPercentage(mentee, mentor);
        return {
            ...mentee,
            matchPercentage
        };
    });

    // Sort matches in descending order of match percentage
    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
    return matches;
}

// Route to handle form submission and run matching algorithm for mentors
app.post('/api/matchMentors', (req, res) => {
    const menteeData = req.body;

    // Load mentors data from mentors.json file
    const mentorsPath = path.join(__dirname, 'data', 'mentors.json');
    fs.readFile(mentorsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading mentors.json:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        const mentors = JSON.parse(data);
        const matches = matchMenteeWithMentors(menteeData, mentors);

        res.json(matches);
    });
});

// Route to handle form submission and run matching algorithm for mentees
app.post('/api/matchMentees', (req, res) => {
    const mentorData = req.body;

    // Load mentees data from mentees.json file
    const menteesPath = path.join(__dirname, 'data', 'mentees.json');
    fs.readFile(menteesPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading mentees.json:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        const mentees = JSON.parse(data);
        const matches = matchMentorWithMentees(mentorData, mentees);

        res.json(matches);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

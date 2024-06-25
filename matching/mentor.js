const fs = require('fs');
const path = require('path');

// Function to calculate match percentage
function calculateMatchPercentage(mentee, mentor) {
    let score = 0;
    let maxScore = 0;

    // Check degree
    if (mentor.degree) {
        maxScore += 1;
        if (mentee.degrees.includes(mentor.degree)) {
            score += 1;
        }
    }

    // Check industry
    if (mentor.industry) {
        maxScore += 1;
        if (mentee.industries.includes(mentor.industry)) {
            score += 1;
        }
    }

    // Check school
    if (mentor.school) {
        maxScore += 1;
        if (mentee.school_names.includes(mentor.school)) {
            score += 1;
        }
    }

    // Check location
    if (mentor.location) {
        maxScore += 1;
        if (mentee.current_location === mentor.location.toUpperCase()) {
            score += 1;
        }
    }

    // Check time preference
    if (mentor.time_preference) {
        maxScore += 1;
        if (mentee.time_preference.toLowerCase() === mentor.time_preference.toLowerCase()) {
            score += 1;
        }
    }

    // Check skills
    if (mentor.skills.length > 0) {
        maxScore += mentor.skills.length;
        const matchingSkills = mentee.skills.filter(skill => mentor.skills.includes(skill));
        score += matchingSkills.length;
    }

    // Check underrepresented groups
    if (mentor.underrepresented_group) {
        maxScore += 1;
        if (mentee.underrepresented_group.toLowerCase() === mentor.underrepresented_group.toLowerCase()) {
            score += 1;
        }
    }

    return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
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

function loadMenteesAndMatchMentor(mentor, callback) {
    // Load mentees data from mentees.json file
    const menteesPath = path.join(__dirname, '../data/mentees.json');
    fs.readFile(menteesPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading mentees.json:', err);
            return callback(err);
        }

        const mentees = JSON.parse(data);
        const matches = matchMentorWithMentees(mentor, mentees);

        // Save matches to a file
        const matchesPath = path.join(__dirname, 'mentor_to_mentee_matches.json');
        fs.writeFile(matchesPath, JSON.stringify(matches, null, 4), 'utf8', err => {
            if (err) {
                console.error('Error writing matches.json:', err);
                return callback(err);
            }
            console.log('Matches data saved to mentor_to_mentee_matches.json');
            callback(null, matches);
        });
    });
}

module.exports = {
    calculateMatchPercentage,
    matchMentorWithMentees,
    loadMenteesAndMatchMentor
};

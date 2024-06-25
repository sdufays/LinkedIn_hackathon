const fs = require('fs');
const path = require('path');

// Sample mentee object
const mentee = {
    degree: 'Computer Science',
    industry: 'Technology',
    school: 'Stanford University',
    location: 'BOSTON, MA',
    time_preference: 'Weekly',
    skills: ['information security', 'aws', 'software']
};

// Function to calculate match percentage
function calculateMatchPercentage(mentor, mentee) {
    let score = 0;
    let maxScore = 6; // Max score: 1 for degree, 1 for industry, 1 for school, 1 for location, 1 for time_preference, 1 for skills

    // Check degree
    if (!mentee.degree || mentor.degrees.includes(mentee.degree)) {
        score += 1;
    }

    // Check industry
    if (!mentee.industry || mentor.industries.includes(mentee.industry)) {
        score += 1;
    }

    // Check school
    if (!mentee.school || mentor.school_names.includes(mentee.school)) {
        score += 1;
    }

    // Check location
    if (!mentee.location || mentor.current_location === mentee.location.toUpperCase()) {
        score += 1;
    }

    // Check time preference
    if (!mentee.time_preference || mentor.time_preference === mentee.time_preference) {
        score += 1;
    }

    // Check skills
    if (mentee.skills.length > 0) {
        const matchingSkills = mentor.skills.filter(skill => mentee.skills.includes(skill));
        score += matchingSkills.length / mentee.skills.length; // Partial points for each matching skill
        maxScore += mentee.skills.length - 1; // Adjust max score for each skill
    }

    return Math.round((score / maxScore) * 100);
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

// Load mentors data from mentors.json file
const mentorsPath = path.join(__dirname, '../data/mentors.json');
fs.readFile(mentorsPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading mentors.json:', err);
        return;
    }

    const mentors = JSON.parse(data);
    const matches = matchMenteeWithMentors(mentee, mentors);

    // Save matches to a file
    const matchesPath = path.join(__dirname, 'matches.json');
    fs.writeFile(matchesPath, JSON.stringify(matches, null, 4), 'utf8', err => {
        if (err) {
            console.error('Error writing matches.json:', err);
            return;
        }
        console.log('Matches data saved to matches.json');
    });
});
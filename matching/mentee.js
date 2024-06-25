const fs = require('fs');
const path = require('path');

// Function to calculate match percentage
function calculateMatchPercentage(mentor, mentee) {
    let score = 0;
    let maxScore = 0;

    // Check degree
    if (mentee.degree && mentee.degree.trim() !== '') {
        maxScore += 1;
        if (mentor.degrees.includes(mentee.degree.trim())) {
            score += 1;
        }
    }

    // Check industry
    if (mentee.industry && mentee.industry.trim() !== '') {
        maxScore += 1;
        if (mentor.industries.includes(mentee.industry.trim())) {
            score += 1;
        }
    }

    // Check school
    if (mentee.school && mentee.school.trim() !== '') {
        maxScore += 1;
        if (mentor.school_names.includes(mentee.school.trim())) {
            score += 1;
        }
    }

    // Check location
    if (mentee.location && mentee.location.trim() !== '') {
        maxScore += 1;
        if (mentor.current_location.toUpperCase() === mentee.location.trim().toUpperCase()) {
            score += 1;
        }
    }

    // Check time preference
    if (mentee.time_preference && mentee.time_preference.trim() !== '') {
        maxScore += 1;
        if (mentor.time_preference.toLowerCase() === mentee.time_preference.trim().toLowerCase()) {
            score += 1;
        }
    }

    // Check skills
    if (mentee.skills && mentee.skills.length > 0) {
        maxScore += mentee.skills.length;
        const matchingSkills = mentor.skills.filter(skill => mentee.skills.includes(skill));
        score += matchingSkills.length;
    }

    // Check underrepresented groups
    if (mentee.underrepresented_group && mentee.underrepresented_group.trim() !== '') {
        maxScore += 1;
        if (mentor.underrepresented_group.toLowerCase() === mentee.underrepresented_group.trim().toLowerCase()) {
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

function loadMentorsAndMatchMentee(mentee, callback) {
    // Load mentors data from mentors.json file
    const mentorsPath = path.join(__dirname, '../data/mentors.json');
    fs.readFile(mentorsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading mentors.json:', err);
            return callback(err);
        }

        const mentors = JSON.parse(data);
        const matches = matchMenteeWithMentors(mentee, mentors);

        // Save matches to a file
        const matchesPath = path.join(__dirname, 'mentee_to_mentor_matches.json');
        fs.writeFile(matchesPath, JSON.stringify(matches, null, 4), 'utf8', err => {
            if (err) {
                console.error('Error writing matches.json:', err);
                return callback(err);
            }
            console.log('Matches data saved to mentee_to_mentor_matches.json');
            callback(null, matches);
        });
    });
}

module.exports = {
    calculateMatchPercentage,
    matchMenteeWithMentors,
    loadMentorsAndMatchMentee
};

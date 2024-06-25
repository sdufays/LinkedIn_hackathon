const fs = require('fs');
const path = require('path');

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
        if (mentor.time_preference.toLowerCase() === mentee.time_preference.toLowerCase()) {
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
        if (mentor.underrepresented_group.toLowerCase() === mentee.underrepresented_group.toLowerCase()) {
            score += 1;
        }
    }

    // console.log(`Match calculation for mentee ${mentee.name} and mentor ${mentor.name}:`);
    // console.log(`Degree: ${score}/${maxScore} (Mentor: ${mentor.degrees}, Mentee: ${mentee.degree})`);
    // console.log(`Industry: ${score}/${maxScore} (Mentor: ${mentor.industries}, Mentee: ${mentee.industry})`);
    // console.log(`School: ${score}/${maxScore} (Mentor: ${mentor.school_names}, Mentee: ${mentee.school})`);
    // console.log(`Location: ${score}/${maxScore} (Mentor: ${mentor.current_location}, Mentee: ${mentee.location})`);
    // console.log(`Time Preference: ${score}/${maxScore} (Mentor: ${mentor.time_preference}, Mentee: ${mentee.time_preference})`);
    // console.log(`Skills: ${score}/${maxScore} (Mentor: ${mentor.skills}, Mentee: ${mentee.skills})`);
    // console.log(`Underrepresented Group: ${score}/${maxScore} (Mentor: ${mentor.underrepresented_group}, Mentee: ${mentee.underrepresented_group})`);

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
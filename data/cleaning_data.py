import pandas as pd

# Load JSON data
user_data = pd.read_json('user_data.json')
jobs_data = pd.read_json('jobs_data.json')

def clean_data(user_data, jobs_data):
    # Remove unnecessary fields
    if 'courses' in user_data.columns:
        user_data = user_data.drop(columns=['courses'])
    
    # Extract school names and degrees, remove graduation years
    user_data['school_names'] = user_data['school_history'].apply(lambda x: [school['school_name'] for school in x])
    user_data['degrees'] = user_data['school_history'].apply(lambda x: [school['degree'] for school in x])
    user_data = user_data.drop(columns=['school_history'])
    
    # Standardize current location to uppercase
    user_data['current_location'] = user_data['current_location'].str.upper()
    
    # Standardize skills to lowercase
    user_data['skills'] = user_data['skills'].apply(lambda x: [skill.lower() for skill in x])
    
    # Initialize columns for industries, highest level, and mentorship position
    user_data['industries'] = ''
    user_data['highest_level'] = ''
    user_data['mentorship_position'] = ''
    
    # Extract industries and highest job level from job data
    job_dict = jobs_data.set_index('id').to_dict(orient='index')
    
    def extract_job_info(job_ids):
        industries = set()
        levels = set()
        for job_id in job_ids:
            if job_id in job_dict:
                industries.add(job_dict[job_id]['industry'])
                levels.add(job_dict[job_id]['level'])
        return list(industries), max(levels, key=lambda x: ['Entry', 'Mid', 'Senior', 'Management'].index(x)) if levels else None

    def determine_mentorship_position(highest_level):
        if highest_level in ['Entry', 'Mid']:
            return 'mentee'
        elif highest_level in ['Senior', 'Management']:
            return 'mentor'
        else:
            return 'mentee'
    
    user_data['industries'], user_data['highest_level'] = zip(*user_data['job_history'].apply(extract_job_info))
    user_data['mentorship_position'] = user_data['highest_level'].apply(determine_mentorship_position)
    
    user_data = user_data.drop(columns=['job_history'])

    return user_data

# Clean the data
cleaned_data = clean_data(user_data, jobs_data)

# Save cleaned data to JSON file
cleaned_data.to_json('project_data.json', orient='records', indent=4)



import json

# Read project_data.json
with open('project_data.json', 'r') as file:
    project_data = json.load(file)

# Separate mentors and mentees
mentors = [person for person in project_data if person['mentorship_position'] == 'mentor']
mentees = [person for person in project_data if person['mentorship_position'] == 'mentee']

# Save mentors data to mentors.json
with open('mentors.json', 'w') as file:
    json.dump(mentors, file, indent=4)
    print('Mentors data saved to mentors.json')

# Save mentees data to mentees.json
with open('mentees.json', 'w') as file:
    json.dump(mentees, file, indent=4)
    print('Mentees data saved to mentees.json')

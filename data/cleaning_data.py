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
    
    # Initialize columns for industries and highest level
    user_data['industries'] = ''
    user_data['highest_level'] = ''
    
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

    user_data['industries'], user_data['highest_level'] = zip(*user_data['job_history'].apply(extract_job_info))
    
    return user_data

# Clean the data
cleaned_data = clean_data(user_data, jobs_data)

# Save cleaned data to JSON file
cleaned_data.to_json('user_data_cleaned.json', orient='records', indent=4)

# Display cleaned data for verification
print(cleaned_data.head())

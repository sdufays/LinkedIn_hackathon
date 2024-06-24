import pandas as pd

data = pd.read_json('user_data.json')

def clean_data(data):
    # Remove unnecessary fields
    data = data.drop(columns=['courses'])
    # Extract school names and degrees, remove graduation years
    data['school_names'] = data['school_history'].apply(lambda x: [school['school_name'] for school in x])
    data['degrees'] = data['school_history'].apply(lambda x: [school['degree'] for school in x])
    data = data.drop(columns=['school_history'])

    return data

cleaned_data = clean_data(data)

cleaned_data.to_json('user_data_cleaned.json', orient='records')

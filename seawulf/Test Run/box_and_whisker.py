import numpy as np
import pandas as pd
import json


def calculate_box_and_whisker(df):
    demographic_columns = [col for col in df.columns if '_population' in col]

    results = []

    for demographic in demographic_columns:
        for district, district_data in df.groupby('district'):
            demographic_data = district_data[demographic]

            stats = {
                'demographic': demographic.split('_')[0],
                'district': district,
                'min': demographic_data.min(),
                '25th_percentile': np.percentile(demographic_data, 25) if not demographic_data.empty else None,
                'median': np.median(demographic_data) if not demographic_data.empty else None,
                '75th_percentile': np.percentile(demographic_data, 75) if not demographic_data.empty else None,
                'max': demographic_data.max()
            }
            results.append(stats)
    return pd.DataFrame(results)


file_path = './chain_output.json'
with open(file_path, 'r') as f:
    json_data = json.load(f)

filtered_data = [{
    'plan_id': item['plans']['id'],
    'districts': [
        {k: v for k, v in district.items() if
         k in ['district', 'black_population', 'hispanic_population', 'asian_population']}
        for district in item['plans']['districts']
    ]
} for item in json_data]

data = pd.json_normalize(filtered_data, 'districts', ['plan_id'])
data = calculate_box_and_whisker(data)
data.to_csv('box_and_whisker.csv')

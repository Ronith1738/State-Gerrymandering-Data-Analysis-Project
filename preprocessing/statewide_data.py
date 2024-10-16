import geopandas
import pandas
import json


CSV_HEADER_ROW_INDEX = 1
SENATE_RACE_LABEL_COLUMN_PREFIX = 'G20USS'
IDEAL_POPULATION_DIVISOR = 2
PERCENTAGE_MULTIPLIER = 100
DF_FIRST_ROW_INDEX = 0
SERIES_FIRST_ELEMENT_INDEX = 0
COLUMN_AXIS = 1


def calculate_demographic_data(statewide_csv_path, district_geojson_path):
    statewide_csv_columns = [
        'GEO_ID', 'P9_001N', 'P9_002N', 'P9_005N', 'P9_006N',
        'P9_007N', 'P9_008N', 'P9_010N', 'P9_011N'
    ]
    statewide_demographic_df = pandas.read_csv(
        statewide_csv_path,
        usecols=statewide_csv_columns,
        skiprows=[CSV_HEADER_ROW_INDEX]
    )
    renamed_column_labels = [
        'geoID', 'totalPop', 'hispanic', 'white', 'black', 
        'natives', 'asian', 'other', '2+races'
    ]
    column_label_mapping = dict(zip(statewide_csv_columns, renamed_column_labels))
    statewide_demographic_df.rename(columns=column_label_mapping, inplace=True)

    district_data_gdf = geopandas.read_file(district_geojson_path)
    total_population = district_data_gdf['totalPop'].sum()
    number_of_disticts = len(district_data_gdf.index)
    ideal_population = total_population / number_of_disticts

    demographic_columns = [
        'hispanic', 'white', 'black', 'natives', 'asian', 'other', '2+races'
    ]
    for index, row in statewide_demographic_df.iterrows():
        for column in demographic_columns:
            if row[column] < (ideal_population / IDEAL_POPULATION_DIVISOR):
                statewide_demographic_df = statewide_demographic_df.drop(column, axis=COLUMN_AXIS)
            else:
                statewide_demographic_df[column] = statewide_demographic_df[column].astype(float)
                statewide_demographic_df[column] = (
                    row[column] / row['totalPop']) * PERCENTAGE_MULTIPLIER

    return statewide_demographic_df


def calculate_election_data(statewide_data_df, statewide_json_path, precinct_geojson_path):
    precinct_data_gdf = geopandas.read_file(precinct_geojson_path)

    senate_votes_series = precinct_data_gdf.loc[:, precinct_data_gdf.columns.str.startswith(
        SENATE_RACE_LABEL_COLUMN_PREFIX)].sum()
    total_senate_votes = senate_votes_series.sum()
    democratic_senate_votes = senate_votes_series[senate_votes_series.index.str.startswith(
        SENATE_RACE_LABEL_COLUMN_PREFIX + 'D')].iloc[SERIES_FIRST_ELEMENT_INDEX]
    republican_senate_votes = senate_votes_series[senate_votes_series.index.str.startswith(
        SENATE_RACE_LABEL_COLUMN_PREFIX + 'R')].iloc[SERIES_FIRST_ELEMENT_INDEX]

    statewide_data_df['demSenateVotes'] = (
        democratic_senate_votes / total_senate_votes) * PERCENTAGE_MULTIPLIER
    statewide_data_df['repSenateVotes'] = (
        republican_senate_votes / total_senate_votes) * PERCENTAGE_MULTIPLIER

    statewide_demographic_dict = {
        'values': statewide_data_df.iloc[DF_FIRST_ROW_INDEX].to_dict()
    }
    with open(statewide_json_path, 'w') as file:
        json.dump(statewide_demographic_dict, file)


nm_statewide_csv = 'DECENNIALCD1182020NM.P9_2024-04-23T234148/DECENNIALCD1182020.P9-Data.csv'
nm_district_geojson = '/Users/garytran/416-data/output-files/nm_district_data.geojson'
nm_statewide_df = calculate_demographic_data(
    nm_statewide_csv, nm_district_geojson
)
nm_statewide_json = 'Users/garytran/416-data/output-files/nm_state_data.json'
nm_precinct_geojson = 'Users/garytran/416-data/output-files/nm_precinct_data.geojson'
calculate_election_data(
    nm_statewide_df, nm_statewide_json, nm_precinct_geojson
)

al_statewide_csv = 'DECENNIALCD1182020AL.P9_2024-04-24T014151/DECENNIALCD1182020.P9-Data.csv'
al_district_geojson = '/Users/garytran/416-data/output-files/al_district_data.geojson'
al_statewide_df = calculate_demographic_data(
    al_statewide_csv, al_district_geojson
)
al_statewide_json = 'Users/garytran/416-data/output-files/al_state_data.json'
al_precinct_geojson = 'Users/garytran/416-data/output-files/al_precinct_data.geojson'
calculate_election_data(
    al_statewide_df, al_statewide_json, al_precinct_geojson
)
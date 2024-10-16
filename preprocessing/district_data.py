import geopandas
import pandas


CSV_HEADER_ROW_INDEX = 1
COLUMN_AXIS = 1
SIMPLIFY_TOLERANCE = 0.001


def merge_district_data(district_shp_path, district_csv_path, district_geojson_path):
    district_boundary_gdf = geopandas.read_file('zip://' + district_shp_path)
    district_csv_columns = [
        'GEO_ID', 'P9_001N', 'P9_002N', 'P9_005N',
        'P9_006N', 'P9_007N', 'P9_008N', 'P9_010N'
    ]
    district_demographic_df = pandas.read_csv(
        district_csv_path,
        usecols=district_csv_columns,
        skiprows=[CSV_HEADER_ROW_INDEX]
    )
    for column in district_demographic_df.columns:
        if column != 'GEO_ID':
            district_demographic_df[column] = district_demographic_df[column].astype(int)

    merged_district_data_gdf = district_boundary_gdf.merge(
        district_demographic_df, left_on='GEOIDFQ', right_on='GEO_ID'
    )
    columns_to_drop = [
        'STATEFP', 'GEOID', 'GEOIDFQ', 'NAMELSAD', 'LSAD', 'LSY', 
        'MTFCC', 'FUNCSTAT', 'ALAND', 'AWATER', 'INTPTLAT', 'INTPTLON'
    ]
    merged_district_data_gdf.drop(columns_to_drop, inplace=True, axis=COLUMN_AXIS)
    columns_label_mapping = {
        'GEO_ID': 'geoID',
        'NAME': 'name',
        'P9_001N': 'totalPop',
        'P9_002N': 'hispanic',
        'P9_005N': 'white',
        'P9_006N': 'black',
        'P9_007N': 'natives',
        'P9_008N': 'asian',
        'P9_010N': 'other'
    }
    merged_district_data_gdf.rename(columns=columns_label_mapping, inplace=True)
    merged_district_data_gdf['geometry'] = merged_district_data_gdf['geometry'].simplify(SIMPLIFY_TOLERANCE)

    merged_district_data_gdf.to_file(district_geojson_path, driver='GeoJSON')


nm_district_shp = '/Users/garytran/416-data/district/tl_2023_35_sldl.zip'
nm_district_csv = '/Users/garytran/416-data/district/DECENNIALCD1182020NM.P9-Data.csv'
nm_district_geojson = '/Users/garytran/416-data/output-files/nm_simplified_district_data.geojson'
merge_district_data(nm_district_shp, nm_district_csv, nm_district_geojson)

al_district_shp = '/Users/garytran/416-data/district/tl_2023_01_sldl.zip'
al_district_csv = '/Users/garytran/416-data/district/DECENNIALCD1182020AL.P9-Data.csv'
al_district_geojson = '/Users/garytran/416-data/output-files/al_simplified_district_data.geojson'
merge_district_data(al_district_shp, al_district_csv, al_district_geojson)

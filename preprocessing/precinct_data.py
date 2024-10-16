import geopandas
import pandas
import maup


BLOCK_CSV_GEOID_PREFIX = '1000000US'
CSV_HEADER_ROW_INDEX = 1
INITIAL_DEMOGRAPHIC_VALUE = 0


def merge_block_data(block_shp_path, block_csv_path, block_geojson_path):
    block_boundary_gdf = geopandas.read_file('zip://' + block_shp_path)
    block_csv_columns = [
        'GEO_ID', 'P9_001N', 'P9_002N', 'P9_005N', 'P9_006N',
        'P9_007N', 'P9_008N', 'P9_010N', 'P9_011N'
    ]
    block_demographic_df = pandas.read_csv(
        block_csv_path,
        usecols=block_csv_columns,
        skiprows=[CSV_HEADER_ROW_INDEX]
    )
    renamed_column_labels = [
        'geoID', 'totalPop', 'hispanic', 'white', 'black', 
        'natives', 'asian', 'other', '2+races'
    ]
    block_df_column_mapping = dict(zip(block_csv_columns, renamed_column_labels))
    block_demographic_df.rename(columns=block_df_column_mapping, inplace=True)
    for column in block_df_column_mapping.values():
        if column != 'geoID':
            block_demographic_df[column] = block_demographic_df[column].astype(int)

    block_demographic_df['geoID'] = block_demographic_df['geoID'].str.replace(BLOCK_CSV_GEOID_PREFIX, '')
    merged_block_data_gdf = block_boundary_gdf.merge(
        block_demographic_df, left_on='GEOID20', right_on='geoID'
    )
    merged_block_data_gdf.to_file(block_geojson_path, driver='GeoJSON')


def cleanup_precinct_geometry(precinct_shp_path, precinct_geojson_path):
    precinct_data_gdf = geopandas.read_file('zip://' + precinct_shp_path)
    original_crs = precinct_data_gdf.crs
    projected_precinct_gdf = precinct_data_gdf.to_crs(
        precinct_data_gdf.estimate_utm_crs())

    maup.doctor(projected_precinct_gdf)
    precinct_boundary_gdf = geopandas.GeoDataFrame(
        geometry=projected_precinct_gdf['geometry'])
    precinct_boundary_repaired_df = maup.smart_repair(precinct_boundary_gdf)
    projected_precinct_gdf['geometry'] = precinct_boundary_repaired_df['geometry']

    repaired_precinct_data_gdf = projected_precinct_gdf.to_crs(original_crs)
    repaired_precinct_data_gdf.to_file(precinct_geojson_path, driver='GeoJSON')


def aggregate_precinct_demographics_data(precinct_geojson_path, block_geojson_path):
    precinct_data_gdf = geopandas.read_file(precinct_geojson_path)
    block_data_gdf = geopandas.read_file(block_geojson_path)
    original_crs = precinct_data_gdf.crs
    projected_precinct_gdf = precinct_data_gdf.to_crs(
        precinct_data_gdf.estimate_utm_crs())
    projected_block_gdf = block_data_gdf.to_crs(
        block_data_gdf.estimate_utm_crs())

    demographic_columns = [
        'totalPop', 'hispanic', 'white', 'black', 
        'natives', 'asian', 'other', '2+races'
    ]
    for column in demographic_columns:
        projected_precinct_gdf[column] = INITIAL_DEMOGRAPHIC_VALUE

    blocks_to_precincts_assignment = maup.assign(
        projected_block_gdf, projected_precinct_gdf
    )
    projected_precinct_gdf[demographic_columns] = projected_block_gdf[demographic_columns].groupby(
        blocks_to_precincts_assignment).sum()

    projected_precinct_gdf.to_crs(original_crs).to_file(
        precinct_geojson_path, driver='GeoJSON')


def assign_precincts_to_districts(precinct_geojson_path, district_geojson_path):
    precinct_data_gdf = geopandas.read_file(precinct_geojson_path)
    district_data_gdf = geopandas.read_file(district_geojson_path)
    original_crs = precinct_data_gdf.crs
    projected_precinct_gdf = precinct_data_gdf.to_crs(
        precinct_data_gdf.estimate_utm_crs())
    projected_district_gdf = district_data_gdf.to_crs(
        district_data_gdf.estimate_utm_crs())

    precincts_to_districts_assignment = maup.assign(
        projected_precinct_gdf, projected_district_gdf
    )
    district_mapping = projected_district_gdf['SLDLST'].iloc[precincts_to_districts_assignment].astype(int)
    projected_precinct_gdf['district'] = district_mapping.values

    projected_precinct_gdf.to_crs(original_crs).to_file(
        precinct_geojson_path, driver='GeoJSON')


nm_block_shp = '/Users/garytran/416-data/block/tl_2020_NM_tabblock20.zip'
nm_block_csv = '/Users/garytran/416-data/block/DECENNIALDHC2020NM.P9_2024-03-18T151821/DECENNIALDHC2020.P9-Data.csv'
nm_block_geojson = '/Users/garytran/416-data/output-files/al_block_data.geojson'
merge_block_data(nm_block_shp, nm_block_csv, nm_block_geojson)
nm_precinct_shp = '/Users/garytran/416-data/precinct/nm_vest_20.zip'
nm_precinct_geojson = '/Users/garytran/416-data/output-files/nm_precinct_data.geojson'
cleanup_precinct_geometry(nm_precinct_shp, nm_precinct_geojson)
aggregate_precinct_demographics_data(nm_precinct_geojson, nm_block_geojson)
nm_district_geojson = '/Users/garytran/416-data/output-files/nm_district_data.geojson'
assign_precincts_to_districts(nm_precinct_geojson, nm_district_geojson)

al_block_shp = '/Users/garytran/416-data/block/tl_2020_AL_tabblock20.zip'
al_block_csv = '/Users/garytran/416-data/block/DECENNIALDHC2020AL.P9_2024-03-18T151821/DECENNIALDHC2020.P9-Data.csv'
al_block_geojson = '/Users/garytran/416-data/output-files/al_block_data.geojson'
merge_block_data(al_block_shp, al_block_csv, al_block_geojson)
al_precinct_shp = '/Users/garytran/416-data/precinct/al_vest_20.zip'
al_precinct_geojson = '/Users/garytran/416-data/output-files/al_precinct_data.geojson'
cleanup_precinct_geometry(al_precinct_shp, al_precinct_geojson)
aggregate_precinct_demographics_data(al_precinct_geojson, al_block_geojson)
al_district_geojson = '/Users/garytran/416-data/output-files/al_district_data.geojson'
assign_precincts_to_districts(al_precinct_geojson, al_district_geojson)

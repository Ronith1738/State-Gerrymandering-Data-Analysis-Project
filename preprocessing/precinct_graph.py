import geopandas
import maup
import gerrychain


TWO_HUNDRED_FEET_IN_METERS = 60.69


def identify_precinct_neighbors(projected_precinct_gdf):
    precinct_adjacencies_gdf = maup.adjacencies(
        projected_precinct_gdf, adjacency_type='rook', output_type='geodataframe')

    return precinct_adjacencies_gdf[precinct_adjacencies_gdf['geometry'].length > TWO_HUNDRED_FEET_IN_METERS]


def create_precinct_graph(precinct_geojson_path, precinct_graph_json):
    precinct_data_gdf = geopandas.read_file(precinct_geojson_path)
    projected_precinct_gdf = precinct_data_gdf.to_crs(
        precinct_data_gdf.estimate_utm_crs())

    precinct_graph = gerrychain.Graph.from_geodataframe(
        projected_precinct_gdf, adjacency='rook')

    precinct_graph.to_json(precinct_graph_json)


nm_precinct_geojson = 'Users/garytran/416-data/output-files/nm_precinct_data.geojson'
nm_precinct_graph_json = 'Users/garytran/416-data/output-files/nm_precinct_graph.json'
create_precinct_graph(nm_precinct_geojson, nm_precinct_graph_json)

al_precinct_geojson = 'Users/garytran/416-data/output-files/al_precinct_data.geojson'
al_precinct_graph_json = 'Users/garytran/416-data/output-files/al_precinct_graph.json'
create_precinct_graph(al_precinct_geojson, al_precinct_graph_json)

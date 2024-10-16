import React, { useEffect, useState } from "react";
import { Stack, Button, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Dropdown from "./Dropdown";
import Loading from "./Loading";
import { mapAPI } from "../api/routes";
import GraphDropdown from "./graphs/GraphDropdown";

function StateMap({ state, handleReset, selectedDistrict, setSelectedDistrict, selectedPrecinct, setSelectedPrecinct, opportunityRace }) {
    const [race, setRace] = useState("NONE");
    const [geojson, setGeojson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mapType, setMapType] = useState("District");

    const handleMapTypeChange = (type) => {
        setLoading(true);
        setMapType(type);
    };

    const handleRaceChange = (event) => {
        setRace(event.target.value);
    };

    useEffect(() => {
        setSelectedDistrict("");
        setSelectedPrecinct("");
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await mapAPI.getHeatMap(state, mapType, race);
                setGeojson(response);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [state, mapType, race]);

    useEffect(() => {
        setRace("NONE");
    }, [state]);

    if (loading) {
        return <Loading size={100} />;
    }

    const getDistrictTitle = (feature) => {
        if (mapType === "District") {
            return getDistrictNumber(feature.properties.geoID);
        } else if (mapType === "Precinct") {
            return getPrecinctNumber(feature.properties.countyName, feature.properties.name);
        } else {
            return "";
        }
    };
    const onEachFeature = (feature, layer) => {
        let popUpString = `
            <h2>${mapType}: ${getDistrictTitle(feature)}</h2>
            <p>Population: ${feature.properties.totalPop}</p>
            <p>White: ${feature.properties.white}</p>
            <p>Black: ${feature.properties.black}</p>
            <p>Asian: ${feature.properties.asian}</p>
            <p>Native American: ${feature.properties.natives}</p>
        `;
        if (state === "New Mexico") {
            popUpString += `<p>Hispanic: ${feature.properties.hispanic}</p>`;
        }
        popUpString += `<p>Other: ${feature.properties.other}</p>`;
        if (feature.properties) {
            layer.bindPopup(popUpString);
        }
        layer.on({
            click: (e) => {
                if (mapType === "District") {
                    setSelectedDistrict(getDistrictNumber(e.target.feature.properties.geoID));
                } else if (mapType === "Precinct") {
                    setSelectedPrecinct(getPrecinctNumber(e.target.feature.properties.countyName, e.target.feature.properties.name));
                }
            },
        });
    };

    const getHeatMapColor = (geojson, race) => {
        let percentage = geojson.totalPop;
        if (race === "WHITE") {
            percentage = geojson.white / geojson.totalPop;
        } else if (race === "BLACK") {
            percentage = geojson.black / geojson.totalPop;
        } else if (race === "ASIAN") {
            percentage = geojson.asian / geojson.totalPop;
        } else if (race === "HISPANIC") {
            percentage = geojson.hispanic / geojson.totalPop;
        } else if (race === "NATIVE AMERICAN") {
            percentage = geojson.natives / geojson.totalPop;
        } else if (race === "OTHER") {
            percentage = geojson.other / geojson.totalPop;
        } else {
            percentage = 0.7;
        }
        if (percentage >= 0.8) {
            return "#a50f15";
        } else if (percentage >= 0.6) {
            return "#de2d26";
        } else if (percentage >= 0.4) {
            return "#fb6a4a";
        } else if (percentage >= 0.2) {
            return "#fcae91";
        } else {
            return "#fee5d9";
        }
    };

    const getIfOpportunity = (properties) => {
        if (/black/i.test(opportunityRace) && properties.black / properties.totalPop >= 0.5) {
            return true;
        } else if (/hispanic/i.test(opportunityRace) && properties.hispanic / properties.totalPop >= 0.5) {
            return true;
        } else if (/native/i.test(opportunityRace) && properties.natives / properties.totalPop >= 0.5) {
            return true;
        }
        return false;
    };

    const getDistrictNumber = (geoID) => {
        return parseInt(geoID.slice(-3));
    };

    const getPrecinctNumber = (countyName, name) => {
        let precinctName = countyName ? countyName + " " + name : name;
        return precinctName.replace(/PRECINCT/g, "Precinct");
    };

    const style = (feature) => {
        let heatOpacity = race !== "NONE" && race !== "" ? 1 : 0;
        let weight;
        let color;
        let heatColor = race !== "NONE" && race !== "" ? getHeatMapColor(feature.properties, race) : "#ffffff";

        if (mapType === "District") {
            weight = getDistrictNumber(feature.properties.geoID) === selectedDistrict ? 5 : 1;
            color = getDistrictNumber(feature.properties.geoID) === selectedDistrict ? "green" : "#000000";
            if (getIfOpportunity(feature.properties)) {
                weight = 5;
                color = "navy";
            }
        } else if (mapType === "Precinct") {
            weight = getPrecinctNumber(feature.properties.countyName, feature.properties.name) === selectedPrecinct ? 5 : 1;
            color = getPrecinctNumber(feature.properties.countyName, feature.properties.name) === selectedPrecinct ? "green" : "#000000";
        } else {
            weight = 1;
            color = "#000000";
        }
        return {
            fillColor: heatColor,
            weight: weight,
            opacity: 1,
            color: color,
            fillOpacity: heatOpacity,
        };
    };

    const center = state === "Alabama" ? [32, -86.5795] : [34, -106.5795];
    const dropdownOptions = [
        { value: "District", display: "District Map" },
        { value: "Precinct", display: "Precinct Map" },
        { value: "Constructed", display: "Constructed Districts" },
    ];

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", flexDirection: "column" }}>
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
                <div style={{ position: "absolute", zIndex: 99999, top: 15, left: 60 }}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" sx={{ color: "white", bgcolor: "#f44336", "&:hover": { bgcolor: "#aa2e25" } }} onClick={handleReset}>
                            Reset
                        </Button>
                        <Dropdown state={state} selectedRace={race} handleChange={handleRaceChange} constructed={mapType === "Constructed"} />
                        <GraphDropdown value={mapType} onSelectValue={handleMapTypeChange} options={dropdownOptions} solid={true} />
                    </Stack>
                </div>
                <div style={{ position: "absolute", zIndex: 99999, bottom: 15, left: 15 }}>
                    <Stack direction="row" spacing={0} sx={{ bgcolor: "rgba(255,255,255,1)", boxShadow: "0 0 15px rgba(0,0,0,0.2)", borderRadius: "5px" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: 80, height: 25, backgroundColor: "#fee5d9" }}></div>
                            <Typography>&lt;20%</Typography>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: 80, height: 25, backgroundColor: "#fcae91" }}></div>
                            <Typography>20-40%</Typography>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: 80, height: 25, backgroundColor: "#fb6a4a" }}></div>
                            <Typography>40-60%</Typography>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: 80, height: 25, backgroundColor: "#de2d26" }}></div>
                            <Typography>60-80%</Typography>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: 80, height: 25, backgroundColor: "#a50f15" }}></div>
                            <Typography>&gt;80%</Typography>
                        </div>
                    </Stack>
                </div>
                <MapContainer key={state} center={center} zoom={7} style={{ width: "100%", height: "100%" }}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <GeoJSON data={geojson} style={style} onEachFeature={onEachFeature} />
                </MapContainer>
            </div>
        </div>
    );
}
export default StateMap;

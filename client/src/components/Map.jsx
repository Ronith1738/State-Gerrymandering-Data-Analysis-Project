import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { mapAPI } from "../api/routes";
import Loading from "./Loading";

const Map = ({ handleStateChange }) => {
    const [stateBorderData, setStateBorderData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await mapAPI.getStateOutline();
                setStateBorderData(response);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading size={100} />;
    }

    const onEachState = (state, layer) => {
        layer.on({
            click: (event) => {
                handleStateChange(event.target.feature.properties.name);
            },
        });
    };

    return (
        <MapContainer center={[37.8283, -98.5795]} zoom={5} style={{ flexGrow: 1 }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON data={stateBorderData.features} onEachFeature={onEachState} />
        </MapContainer>
    );
};

export default Map;

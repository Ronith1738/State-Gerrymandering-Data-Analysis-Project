import React, { useState } from "react";
import { Box } from "@mui/material";
import StateTable from "./StateTable";
import StateMap from "./StateMap";

const StatePage = ({ state, handleReset }) => {
    const [selectedDistrict, setSelectedDistrict] = useState(-1);
    const [selectedPrecinct, setSelectedPrecinct] = useState(-1);
    const [opportunityRace, setOpportunityRace] = useState("");

    return (
        <Box sx={{ display: "flex", width: "100%", height: "100%", overflow: "hidden" }}>
            <Box sx={{ width: "50%" }}>
                <StateMap
                    state={state}
                    handleReset={handleReset}
                    selectedDistrict={selectedDistrict}
                    setSelectedDistrict={setSelectedDistrict}
                    selectedPrecinct={selectedPrecinct}
                    setSelectedPrecinct={setSelectedPrecinct}
                    opportunityRace={opportunityRace}
                />
            </Box>
            <Box sx={{ width: "50%" }}>
                <StateTable state={state} setSelectedDistrict={setSelectedDistrict} setOpportunityRace={setOpportunityRace} />
            </Box>
        </Box>
    );
};

export default StatePage;

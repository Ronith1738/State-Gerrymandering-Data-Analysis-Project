import { Box, FormControl, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import StateSummary from "./tables/StateSummary";
import BoxPlot from "./graphs/BoxPlot";
import EcologicalInference from "./graphs/EcologicalInference";
import Gingles from "./graphs/Gingles";
import RacialDistribution from "./graphs/RacialDistribution";
import VotingAgePopulation from "./graphs/VotingAgePopulation";
import RepresentativesInfo from "./tables/RepresentativesInfo";
import OpportunityDistricts from "./tables/OpportunityDistricts";
import VoteSeat from "./graphs/VoteSeat";

const StateTable = ({ state, setSelectedDistrict, setOpportunityRace }) => {
    const [tableType, setTableType] = useState("State Data");

    let initialRace = state === "Alabama" ? "Black" : "Hispanic";
    return (
        <Box sx={{ marginLeft: 1, marginTop: 1, height: "90vh", overflow: "auto" }}>
            <FormControl sx={{ minWidth: 200, mb: 2, mr: 2, mt: 1 }}>
                <Select
                    value={tableType}
                    onChange={(event) => {
                        setTableType(event.target.value);
                    }}
                >
                    <MenuItem value="State Data">State Summary Data</MenuItem>
                    <MenuItem value="District Data">Representative Data</MenuItem>
                    <MenuItem value="Opportunity Districts">Opportunity Districts</MenuItem>
                    <MenuItem value="Racial/Ethnic Distribution of State Assembly">Racial/Ethnic Distribution of State Assembly</MenuItem>
                    <MenuItem value="Racial Distribution of Voters">Racial Distribution of Voters</MenuItem>
                    <MenuItem value="Box & Whisker Analysis">Box & Whisker Analysis</MenuItem>
                    <MenuItem value="Gingles Precinct Analysis">Gingles Precinct Analysis</MenuItem>
                    <MenuItem value="Ecological Inference">Ecological Inference</MenuItem>
                    {state === "Alabama" && <MenuItem value="Vote Seat">Vote Share Seat Share</MenuItem>}
                </Select>
            </FormControl>
            {tableType === "State Data" && <StateSummary state={state} />}
            {tableType === "Racial/Ethnic Distribution of State Assembly" && <RacialDistribution state={state} />}
            {tableType === "Racial Distribution of Voters" && <VotingAgePopulation state={state} />}
            {tableType === "Box & Whisker Analysis" && <BoxPlot state={state} initialRace={initialRace} />}
            {tableType === "Gingles Precinct Analysis" && (
                <>
                    <Gingles state={state} />
                    <Gingles state={state} />
                </>
            )}
            {tableType === "Ecological Inference" && <EcologicalInference state={state} />}
            {tableType === "District Data" && <RepresentativesInfo state={state} setSelectedDistrict={setSelectedDistrict} />}
            {tableType === "Opportunity Districts" && <OpportunityDistricts state={state} setOpportunityRace={setOpportunityRace} />}
            {tableType === "Vote Seat" && <VoteSeat />}
        </Box>
    );
};

export default StateTable;

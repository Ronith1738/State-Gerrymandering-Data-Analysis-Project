import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EcologicalInference from "./graphs/EcologicalInference";
import Gingles from "./graphs/Gingles";
import VotingAgePopulation from "./graphs/VotingAgePopulation";
import RacialDistribution from "./graphs/RacialDistribution";
import BoxPlot from "./graphs/BoxPlot";
import { Chart as ChartJS } from "chart.js/auto";

const ComparePage = ({ compare, handleComparisonChange }) => {
    let newMexico = <p>New Mexico side graph</p>;
    let alabama = <p>Alabama side graph</p>;
    let description = "This is the description";
    switch (compare) {
        case "Racial Distribution of Voters":
            newMexico = <VotingAgePopulation state={"New Mexico"} />;
            alabama = <VotingAgePopulation state={"Alabama"} />;
            description =
                "The following graphs show the breakdown of the two states' voting-age population (citizens who are 18 or older) by race. Data taken from U.S. Census Bureau's American Community Survey, released in 2022.";
            break;

        case "Box & Whisker Analysis":
            newMexico = <BoxPlot state={"New Mexico"} initialRace={"Hispanic"} />;
            alabama = <BoxPlot state={"Alabama"} initialRace={"Black"} />;
            description =
                "The following graphs compare the minority group percentage in current district plans (sorted) in each state with the generated MCMC ensemble. By looking at how they deviate, we can have some evidence on identifying packed districts which purposely dilute the voting power of selected minority groups. Current district data gathered from the U.S. Census Bureau.";
            break;

        case "Racial/Ethnic Distribution of State Assembly":
            newMexico = <RacialDistribution state={"NewMexico"} />;
            alabama = <RacialDistribution state={"Alabama"} />;
            description =
                "The following graphs show the racial/ethnic breakdown of the two states' House of Representative members compared with their overall population. Data taken from various sources including NCSL, CAWP, Alabama and New Mexico Legislature websites and the Census Bureau.";
            break;

        case "Gingles Precinct Analysis":
            newMexico = <Gingles state={"New Mexico"} />;
            alabama = <Gingles state={"Alabama"} />;
            description =
                "The following graphs compare significant minority group population percentages in each state by precincts and how that affected the election results to analyze their political cohesiveness. We will be analyzing the Hispanic/Latino population in New Mexico and the Black/African American population in Alabama. The election we will be analyzing is the 2020 Presidential election of Trump vs. Biden.";
            break;

        case "Ecological Inference":
            newMexico = <EcologicalInference state={"New Mexico"} />;
            alabama = <EcologicalInference state={"Alabama"} />;
            description =
                "The following graphs show the voting expectations/behavior of different racial groups using ecological inference. Data gathered from VEST 2020 precinct-level election results for the presidential election.";
            break;
    }

    return (
        <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
            <Button
                size="large"
                onClick={() => {
                    handleComparisonChange("");
                }}
            >
                <CloseIcon sx={{ mr: 1 }} />
                Close
            </Button>
            <Box sx={{ mb: 3 }}>
                <Typography align="center" variant="h2">
                    {compare}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Typography align="center" sx={{ color: "gray", maxWidth: 1000 }}>
                        {description}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Box sx={{ width: "50vw", m: 1 }}>
                    <Typography align="center" variant="h5">
                        New Mexico
                    </Typography>
                    {newMexico}
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ width: "50vw", m: 1 }}>
                    <Typography align="center" variant="h5">
                        Alabama
                    </Typography>
                    {alabama}
                </Box>
            </Box>
        </Box>
    );
};

export default ComparePage;

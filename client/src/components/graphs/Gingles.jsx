import { Typography, Box, Stack } from "@mui/material";
import { plugins } from "chart.js";
import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import { graphAPI } from "../../api/routes";
import Loading from "../Loading";
import GraphDropdown from "./GraphDropdown";

const Gingles = ({ state }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [race, setRace] = useState("White");
    const [election, setElection] = useState("President");

    const handleRaceChange = (race) => {
        setLoading(true);
        setRace(race);
    };

    const handleElectionChange = (election) => {
        setLoading(true);
        setElection(election);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await graphAPI.getGingles(state, race, election);
                setData(response);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [race, election, state]);

    if (loading) {
        return <Loading size={100} />;
    }

    const replaceKeys = (jsonObj) => {
        let modifiedJsonStr = JSON.stringify(jsonObj);
        modifiedJsonStr = modifiedJsonStr.replace(/("datum"|"datan"|"datas")(:[^n])/g, '"data"$2');
        modifiedJsonStr = modifiedJsonStr.replace(/("xaxisID")/g, '"xAxisID"');
        modifiedJsonStr = modifiedJsonStr.replace(/("xAxisID":null)/g, '"xAxisID":"x"');
        const modifiedJsonObj = JSON.parse(modifiedJsonStr);
        return modifiedJsonObj;
    };

    let parsedData = replaceKeys(data);
    const ginglesOptions = {
        scales: {
            x: { min: 0, max: 1.0 },
            y: {
                min: 0,
                max: 1,
                ticks: {
                    stepSize: 0.1,
                },
                title: {
                    display: true,
                    text: "Vote Share",
                    font: {
                        family: "Roboto",
                        size: 16,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    filter: (legendItem, chartData) => {
                        return legendItem.datasetIndex > 1;
                    },
                },
            },
        },
    };

    let raceDropdownOptions = [{ value: "White", display: "White" }];
    if (state === "Alabama") {
        raceDropdownOptions.push({ value: "Black", display: "Black" });
    } else {
        raceDropdownOptions.push({ value: "Hispanic", display: "Hispanic/Latino" }, { value: "Native American", display: "Native American" });
    }

    let electionDropdownOptions = [
        { value: "President", display: "2020 Presidential Election" },
        { value: "Senate", display: "2020 U.S. Senate Election" },
    ];

    return (
        <>
            <Stack direction="row" spacing={2}>
                <GraphDropdown value={election} onSelectValue={handleElectionChange} options={electionDropdownOptions} />
                <GraphDropdown value={race} onSelectValue={handleRaceChange} options={raceDropdownOptions} />
            </Stack>
            <Scatter data={parsedData.data} options={ginglesOptions} />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography align="center">Percent {race}</Typography>
            </Box>
        </>
    );
};

export default Gingles;

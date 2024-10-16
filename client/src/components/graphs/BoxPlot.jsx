import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Loading from "../Loading";
import { graphAPI } from "../../api/routes";
import { Box, Stack } from "@mui/material";
import GraphDropdown from "./GraphDropdown";

const BoxPlot = ({ state, initialRace }) => {
    const [currentData, setCurrentData] = useState(null);
    const [ensemble, setEnsemble] = useState(null);
    const [loading, setLoading] = useState(true);
    const [race, setRace] = useState(initialRace);
    const [ensembleSize, setEnsembleSize] = useState("5000");

    const handleRaceChange = (race) => {
        setLoading(true);
        setRace(race);
    };

    const handleSizeChange = (size) => {
        setLoading(true);
        setEnsembleSize(size);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await graphAPI.getCurrentBox(state, race);
                const response2 = await graphAPI.getEnsembleBox(state, race, ensembleSize);

                setCurrentData(response1);
                setEnsemble(response2);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [state, race, ensembleSize]);

    if (loading) {
        return <Loading size={100} />;
    }

    let stateName = state === "Alabama" ? "alabama" : "newMexico";

    const series = [
        {
            name: "ensemble",
            type: "boxPlot",
            data: ensemble[stateName],
        },
        {
            name: "current",
            type: "scatter",
            data: currentData["values"],
        },
    ];
    const boxPlotOptions = {
        chart: {
            type: "boxPlot",
            height: 550,
        },
        plotOptions: {
            boxPlot: {
                colors: {
                    upper: "#008FFB",
                    lower: "#FEB019",
                },
            },
        },
        xaxis: {
            labels: {
                formatter: (value) => {
                    return value && value % 5 == 0 ? value : "";
                },
            },
            title: {
                text: "indexed districts",
                offsetY: -30,
            },
        },
        yaxis: {
            title: {
                text: "% population",
            },
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                },
            },
        },
    };

    let raceDropdownOptions = [];
    if (state === "Alabama") {
        raceDropdownOptions.push({ value: "Black", display: "Black" });
    } else {
        raceDropdownOptions.push({ value: "Hispanic", display: "Hispanic/Latino" }, { value: "Native American", display: "Native American" });
    }

    let sizeDropdownOptions = [
        { value: "250", display: "Small Ensemble (250 plans)" },
        { value: "5000", display: "Large Ensemble (5,000 plans)" },
    ];
    return (
        <Box sx={{ width: "95%" }}>
            <Stack spacing={1} direction="row">
                <GraphDropdown options={raceDropdownOptions} value={race} onSelectValue={handleRaceChange} />
                <GraphDropdown options={sizeDropdownOptions} value={ensembleSize} onSelectValue={handleSizeChange} />
            </Stack>
            <ReactApexChart options={boxPlotOptions} series={series} type="boxPlot" />
        </Box>
    );
};

export default BoxPlot;

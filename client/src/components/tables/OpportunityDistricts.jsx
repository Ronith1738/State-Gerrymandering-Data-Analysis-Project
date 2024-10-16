import React, { useState, useEffect } from "react";
import { graphAPI, tableAPI } from "../../api/routes";
import { Table, TableCell, TableBody, TableHead, TableRow, Box, Stack } from "@mui/material";
import Loading from "../Loading";
import { Bar } from "react-chartjs-2";
import GraphDropdown from "../graphs/GraphDropdown";

const OpportunityDistricts = ({ state, setOpportunityRace }) => {
    let initialRace = state === "Alabama" ? "Black" : "Hispanic";
    const [loading, setLoading] = useState(true);
    const [race, setRace] = useState(initialRace);
    const [ensembleSize, setEnsembleSize] = useState("5000");
    const [threshold, setThreshold] = useState("0.5");
    const [feasibleOpportunity, setFeasibleOpportunity] = useState(null);
    const [barData, setBarData] = useState(null);

    const handleRaceChange = (race) => {
        setLoading(true);
        setRace(race);
    };

    const handleSizeChange = (size) => {
        setLoading(true);
        setEnsembleSize(size);
    };

    const handleThresholdChange = (threshold) => {
        setLoading(true);
        setThreshold(threshold);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await tableAPI.getFeasibleOpportunity(state);
                const response2 = await graphAPI.getOppBar(state, race, ensembleSize, threshold);

                setFeasibleOpportunity(response1);
                setBarData(response2);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
        return () => {
            setOpportunityRace("");
        };
    }, [state, race, ensembleSize, threshold]);

    if (loading) {
        return <Loading size={100} />;
    }

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

    let thresholdDropdownOptions = [
        { value: "0.5", display: "0.5 Threshold" },
        { value: "0.45", display: "0.45 Threshold" },
        { value: "0.37", display: "0.37 Threshold" },
    ];

    let x = barData.datas.x;
    let y = barData.datas.y;
    let combined = x.map((value, index) => [value, y[index]]);
    combined.sort((a, b) => {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
    });
    let sortedX = combined.map((pair) => pair[0]);
    let sortedY = combined.map((pair) => pair[1]);

    let graphData = {
        labels: sortedX,
        datasets: [
            {
                label: "# district plans",
                data: sortedY,
                backgroundColor: "#008FFB",
            },
        ],
    };

    return (
        <>
            <Stack spacing={1} direction="row">
                <GraphDropdown options={raceDropdownOptions} value={race} onSelectValue={handleRaceChange} />
                <GraphDropdown options={sizeDropdownOptions} value={ensembleSize} onSelectValue={handleSizeChange} />
                <GraphDropdown options={thresholdDropdownOptions} value={threshold} onSelectValue={handleThresholdChange} />
            </Stack>
            <Bar data={graphData} />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Table sx={{ border: "2px solid black", marginTop: "15px", width: "70%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Racial/Ethnic Group</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Ideal District Pop.</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Population</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Current Opportunity Districts</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Maximum Opportunity Districts</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Average Opportunity Distrcts In Ensemble</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {feasibleOpportunity.datas.map((data, index) => (
                            <TableRow
                                key={index}
                                onClick={() => {
                                    setOpportunityRace(data.label);
                                }}
                                sx={{ cursor: "pointer" }}
                            >
                                <TableCell>{data.label}</TableCell>
                                <TableCell align="center">{data.idealPopulation}</TableCell>
                                <TableCell align="center">{data.populationValue}</TableCell>
                                <TableCell align="center">{data.oppDistricts}</TableCell>
                                <TableCell align="center">{data.maximumOppDistricts}</TableCell>
                                <TableCell align="center">{data.averageOppDistricts}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </>
    );
};

export default OpportunityDistricts;

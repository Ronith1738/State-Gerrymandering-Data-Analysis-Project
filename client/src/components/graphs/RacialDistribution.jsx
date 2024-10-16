import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Table, TableCell, TableBody, TableHead, TableRow, Box } from "@mui/material";
import Loading from "../Loading";
import { graphAPI } from "../../api/routes";

const RacialDistribution = ({ state }) => {
    const [housePopRaceNumber, setHousePopRaceNumber] = useState(null);
    const [housePopRacePercent, setHousePopRacePercent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await graphAPI.getRacialDistributionNumber();
                const response2 = await graphAPI.getRacialDistributionPercent();

                setHousePopRaceNumber(response1);
                setHousePopRacePercent(response2);
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

    let stateName = state === "Alabama" ? "alabama" : "newMexico";
    let barColors = ["#008FFB", "#FEB019"];
    for (let i = 0; i < housePopRacePercent[stateName].datasets.length; i++) {
        housePopRacePercent[stateName].datasets[i].backgroundColor = barColors[i];
    }

    return (
        <>
            <Bar
                data={{
                    labels: housePopRacePercent[stateName].labels,
                    datasets: housePopRacePercent[stateName].datasets,
                }}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Table sx={{ border: "2px solid black", marginTop: "15px", width: "70%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Racial/Ethnic Group</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Assembly Members</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Overall Population</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {housePopRaceNumber[stateName].map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{data.label}</TableCell>
                                <TableCell align="center">{data.assemblyValue}</TableCell>
                                <TableCell align="center">{data.populationValue}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </>
    );
};

export default RacialDistribution;

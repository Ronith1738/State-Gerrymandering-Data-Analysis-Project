import React, { useState, useEffect } from "react";
import { graphAPI } from "../../api/routes";
import { Table, TableCell, TableBody, TableHead, TableRow } from "@mui/material";
import Loading from "../Loading";

const EnsembleSummary = ({ state }) => {
    const [housePopRaceNumber, setHousePopRaceNumber] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await graphAPI.getRacialDistributionNumber();

                setHousePopRaceNumber(response1);
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

    return (
        <Table sx={{ border: "2px solid black", marginTop: "15px", width: "70%" }}>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Racial/Ethnic Group</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Assembly Members</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Overall Population</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {housePopRaceNumber[stateName].map((data, index) => (
                    <TableRow key={index}>
                        <TableCell>{data.label}</TableCell>
                        <TableCell align="right">{data.assemblyValue}</TableCell>
                        <TableCell align="right">{data.populationValue}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default EnsembleSummary;

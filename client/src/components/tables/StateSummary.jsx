import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import Loading from "../Loading";
import { graphAPI, tableAPI } from "../../api/routes";

const StateSummary = ({ state }) => {
    const [housePopRaceNumber, setHousePopRaceNumber] = useState(null);
    const [housePartyNumber, setHousePartyNumber] = useState(null);
    const [ensembleSummary, setEnsembleSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await graphAPI.getRacialDistributionNumber();
                const response2 = await tableAPI.getHouseParty();
                const response3 = await tableAPI.getEnsembleSummary();

                setHousePopRaceNumber(response1);
                setHousePartyNumber(response2);
                setEnsembleSummary(response3);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [state]);

    if (loading) {
        return <Loading size={100} />;
    }

    let stateName = state === "Alabama" ? "alabama" : "newMexico";
    return (
        <>
            <Table sx={{ border: "2px solid black" }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Racial/Ethnic Group</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Assembly Members
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Overall Population
                        </TableCell>
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
            <Table sx={{ border: "2px solid black", marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Party</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Assembly Members
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Seat Share
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {housePartyNumber[stateName].map((data, index) => (
                        <TableRow key={index}>
                            <TableCell>{data.label}</TableCell>
                            <TableCell align="center">{data.value}</TableCell>
                            <TableCell align="center">{data.percent}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Table sx={{ border: "2px solid black", marginTop: "15px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                            Type of Ensemble
                        </TableCell>
                        {state==="Alabama" && <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Total Black Opportunity Districts
                        </TableCell> }
                        {state==="New Mexico" && <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Total Hispanic Opportunity Districts
                        </TableCell>}
                        {state==="New Mexico" && <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Total Native Opportunity Districts
                        </TableCell>}
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Total Democratic Votes
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Total Republican Votes
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Population Equality Threshold
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{ensembleSummary[stateName].ensembleOne}</TableCell>
                        {state==="Alabama" && <TableCell align="center">{ensembleSummary[stateName].blackOpportunityOne}</TableCell>}
                        {state==="New Mexico" && <TableCell align="center">{ensembleSummary[stateName].hispanicOpportunityOne}</TableCell>}
                        {state==="New Mexico" && <TableCell align="center">{ensembleSummary[stateName].nativeOpportunityOne}</TableCell>}
                        <TableCell align="center">{ensembleSummary[stateName].democratVotesOne}</TableCell>
                        <TableCell align="center">{ensembleSummary[stateName].republicanVotesOne}</TableCell>
                        <TableCell align="center">{ensembleSummary[stateName].threshold}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{ensembleSummary[stateName].ensembleTwo}</TableCell>
                        {state==="Alabama" && <TableCell align="center">{ensembleSummary[stateName].blackOpportunityTwo}</TableCell>}
                        {state==="New Mexico" && <TableCell align="center">{ensembleSummary[stateName].hispanicOpportunityTwo}</TableCell>}
                        {state==="New Mexico" && <TableCell align="center">{ensembleSummary[stateName].nativeOpportunityTwo}</TableCell>}
                        <TableCell align="center">{ensembleSummary[stateName].democratVotesTwo}</TableCell>
                        <TableCell align="center">{ensembleSummary[stateName].republicanVotesTwo}</TableCell>
                        <TableCell align="center">{ensembleSummary[stateName].threshold}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
};

export default StateSummary;

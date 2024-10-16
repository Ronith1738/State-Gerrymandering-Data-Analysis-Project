import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Table, TableCell, TableBody, TableHead, TableRow, Box } from "@mui/material";
import Loading from "../Loading";
import { graphAPI } from "../../api/routes";

const VoteSeat = () => {
    const [voteSeatShare, setVoteSeatShare] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await graphAPI.getVoteSeat();

                setVoteSeatShare(response1);
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

    let options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Percentage of Seats",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Percentage of Votes",
                },
                min: 0,
                max: 100,

                type: "linear",
            },
        },
        interaction: {
            intersect: false,
            mode: "index",
        },
        elements: {
            point: {
                radius: 0,
            },
        },
    };
    return (
        <>
            <Line options={options} data={{ labels: voteSeatShare.labels, datasets: voteSeatShare.datasets }} />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Table sx={{ border: "2px solid black", marginTop: "15px", width: "70%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Partisan Bias</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Symmetry</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Responsiveness</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{voteSeatShare.partisanBias}%</TableCell>
                            <TableCell align="center">{voteSeatShare.symmetry}%</TableCell>
                            <TableCell align="center">{voteSeatShare.responsiveness}%</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </>
    );
};

export default VoteSeat;

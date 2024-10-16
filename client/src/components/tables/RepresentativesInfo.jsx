import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem, Table, TableHead, TableRow, TableBody, TableCell, Avatar, Stack, Typography, InputLabel } from "@mui/material";
import Loading from "../Loading";
import { tableAPI } from "../../api/routes";

const RepresentativesInfo = ({ state, setSelectedDistrict }) => {
    const [houseReps, setHouseReps] = useState(null);
    const [houseRepsFiltered, setHouseRepsFiltered] = useState(null);
    const [raceFilter, setRaceFilter] = useState("None");
    const [partyFilter, setPartyFilter] = useState("None");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response3 = await tableAPI.getRepresentativeInfo(state);

                setHouseReps(response3);
                setHouseRepsFiltered(response3.representatives);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
        return () => {
            setSelectedDistrict(-1);
        };
    }, [state]);

    if (loading) {
        return <Loading size={100} />;
    }

    const handleRaceFilterChange = (race) => {
        setRaceFilter(race);
        let filteredReps = filterRepresentatives(race, partyFilter);
        setHouseRepsFiltered(filteredReps);
    };

    const handlePartyFilterChange = (party) => {
        setPartyFilter(party);
        let filteredReps = filterRepresentatives(raceFilter, party);
        setHouseRepsFiltered(filteredReps);
    };

    const filterRepresentatives = (raceFilter, partyFilter) => {
        let filteredHouseReps = houseReps.representatives;

        if (raceFilter !== "None") {
            filteredHouseReps = filteredHouseReps.filter((rep) => rep.race === raceFilter);
        }
        if (partyFilter !== "None") {
            filteredHouseReps = filteredHouseReps.filter((rep) => rep.party === partyFilter);
        }

        return filteredHouseReps;
    };

    return (
        <>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>Filters:</Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems={"center"}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>
                        <Typography>Race</Typography>
                    </InputLabel>
                    <Select
                        value={raceFilter}
                        label="Race"
                        onChange={(event) => {
                            handleRaceFilterChange(event.target.value);
                        }}
                    >
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value="White">White</MenuItem>
                        <MenuItem value="Black">Black</MenuItem>
                        <MenuItem value="Hispanic/Latino">Hispanic/Latino</MenuItem>
                        <MenuItem value="Asian">Asian</MenuItem>
                        <MenuItem value="Native American">Native American</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>
                        <Typography>Party</Typography>
                    </InputLabel>
                    <Select
                        value={partyFilter}
                        label="Party"
                        onChange={(event) => {
                            handlePartyFilterChange(event.target.value);
                        }}
                    >
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value="Democratic">Democratic</MenuItem>
                        <MenuItem value="Republican">Republican</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Table sx={{ border: "2px solid black" }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>District</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}> </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Representative</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Party</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Race/Ethnicity</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>Vote Margin</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {houseRepsFiltered.map((data, index) => (
                        <TableRow
                            key={index}
                            onClick={() => {
                                setSelectedDistrict(parseInt(data.district));
                            }}
                            sx={{ cursor: "pointer", "&:hover": { border: "2px solid black" }, height: "100px" }}
                        >
                            <TableCell>{data.district}</TableCell>
                            <TableCell>
                                <Avatar alt={data.name} src={data.image} sx={{ height: "75px", width: "75px", "&:hover": { transform: "scale(2)" } }} />
                            </TableCell>
                            <TableCell align="center" >{data.name}</TableCell>
                            <TableCell align="center">{data.party}</TableCell>
                            <TableCell align="center">{data.race}</TableCell>
                            <TableCell align="center">{data.voteMargin}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default RepresentativesInfo;

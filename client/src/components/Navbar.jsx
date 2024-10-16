import React, { useState } from "react";
import { AppBar, Button, Box, FormControl, InputLabel, MenuItem, Select, Stack, Toolbar, Typography, Drawer, Divider, Link } from "@mui/material";

const Navbar = ({ state, handleStateChange, compare, handleComparisonChange }) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const drawerInfo = (
        <Box sx={{ maxWidth: "90vw", width: 600, m: 1 }}>
            <Typography variant="h3" sx={{ m: 1, textAlign: "center" }}>
                About Redistricting
            </Typography>
            <Divider sx={{ mx: 4 }} />
            <Box sx={{ my: 2, mx: 4 }}>
                <Typography sx={{ my: 1 }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;Redistricting is the process of redrawing district borders which changes who represents the people who live in those districts. This is necessary to reflect
                    the changes in population and ensuring fair and equal representation in the government. It's essential for district lines to uphold the principle of "one person, one vote" and
                    prevent gerrymandering (the manipulation of district boundaries for political advantage).
                </Typography>
                <Typography sx={{ my: 1 }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;In the United States, each state is reponsible for redistricting its legislative districts, including those for the state assembly. This process typically
                    occurs every 10 years, following the census. In most states, the state legislature are primarily responsible for the redistricting process, although specific procedures may vary
                    from state to state. For example, some states appoint advisory commissions to help advise the legislature on where the lines should be drawn. Some states have a backup commission
                    in case the legislature does not successfully pass a plan. Other states, such as New York, have an independent commission system which limits the direct participation of elected
                    officials in the planning process.
                </Typography>
                <Typography sx={{ my: 1 }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;The two states that we're comparing, Alabama and New Mexico, also have differences in their state redistricting procedure. Alabama's takes a traditional
                    approach, having the state legislature draw its own state legislative lines, subject to gubernatorial veto. New Mexico, on the other hand, have an advisory commission, with one
                    member appointed by each legislative leader, two members appointed by the state ethics commission, and one retured state judge or justice serving as the chair whose also appointed
                    by the state ethics commission.
                </Typography>
                <Typography sx={{ my: 1 }}>
                    Sources: <Link href="https://redistricting.lls.edu">redistricting.lls.edu</Link>
                </Typography>
            </Box>
        </Box>
    );

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Box
                        component="img"
                        sx={{
                            height: 50,
                            mr: 2,
                        }}
                        alt="Pistons Logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Logo_of_the_Detroit_Pistons_%282005%E2%80%932017%29.png"
                    />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Pistons
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <FormControl
                            sx={{
                                minWidth: 150,
                            }}
                        >
                            <InputLabel
                                sx={{
                                    color: "white",
                                }}
                            >
                                <Typography>Comparison</Typography>
                            </InputLabel>
                            <Select
                                label="Select Comparison"
                                value={compare}
                                onChange={(event) => {
                                    handleComparisonChange(event.target.value);
                                }}
                                sx={{
                                    color: "white",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        display: "none",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: "white",
                                    },
                                }}
                            >
                                <MenuItem value="Box & Whisker Analysis">Box & Whisker Analysis</MenuItem>
                                <MenuItem value="Gingles Precinct Analysis">Gingles Precinct Analysis</MenuItem>
                                <MenuItem value="Ecological Inference">Ecological Inference</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            sx={{
                                minWidth: 150,
                            }}
                        >
                            <InputLabel
                                sx={{
                                    color: "white",
                                }}
                            >
                                <Typography>Select State</Typography>
                            </InputLabel>
                            <Select
                                label="Select State"
                                value={state}
                                onChange={(event) => {
                                    handleStateChange(event.target.value);
                                }}
                                sx={{
                                    color: "white",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        display: "none",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: "white",
                                    },
                                }}
                            >
                                <MenuItem value="Alabama">Alabama</MenuItem>
                                <MenuItem value="New Mexico">New Mexico</MenuItem>
                            </Select>
                        </FormControl>
                        <Button sx={{ color: "inherit", textTransform: "none" }} onClick={toggleDrawer(true)}>
                            <Typography>Info</Typography>
                        </Button>
                        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
                            {drawerInfo}
                        </Drawer>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;

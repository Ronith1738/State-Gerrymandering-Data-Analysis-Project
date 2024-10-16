import React, { useState } from "react";
import Navbar from "./Navbar";
import Map from "./Map";
import ComparePage from "./ComparePage";
import { Box } from "@mui/material";
import StatePage from "./StatePage";

const MainPage = () => {
    const [state, setState] = useState("");
    const [compare, setCompare] = useState("");
    const handleReset = () => {
        setState("");
    };
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", m: 0 }}>
                <Navbar state={state} handleStateChange={setState} compare={compare} handleComparisonChange={setCompare} />
                {compare !== "" && <ComparePage compare={compare} handleComparisonChange={setCompare} />}
                {compare === "" && state !== "" && <StatePage state={state} handleReset={handleReset} />}
                {compare === "" && state === "" && <Map handleStateChange={setState} />}
            </Box>
        </>
    );
};

export default MainPage;

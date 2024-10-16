import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = ({ size }) => {
    return (
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress size={size} />
        </Box>
    );
};

export default Loading;

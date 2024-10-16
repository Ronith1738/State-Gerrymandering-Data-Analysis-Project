import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function Dropdown({ state, selectedRace, handleChange, constructed }) {
    let hispanic = <MenuItem value="HISPANIC">Hispanic/Latino</MenuItem>;
    let native = <MenuItem value="NATIVE AMERICAN">Native American</MenuItem>;
    let black = <MenuItem value="BLACK">Black</MenuItem>;

    return (
        <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: "white" }}>Select Race</InputLabel>
            <Select
                value={selectedRace}
                onChange={handleChange}
                displayEmpty
                sx={{
                    bgcolor: "#1976d2",
                    color: "white",
                }}
            >
                <MenuItem value="NONE">None</MenuItem>
                {constructed === false && <MenuItem value="WHITE">White</MenuItem>}
                {state === "Alabama" && black}
                {state === "New Mexico" && hispanic}
                {state === "New Mexico" && native}
            </Select>
        </FormControl>
    );
}
export default Dropdown;

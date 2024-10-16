import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const GraphDropdown = ({ value, onSelectValue, options, solid, margin }) => {
    return (
        <FormControl sx={{ minWidth: 200, marginTop: margin }}>
            <Select
                value={value}
                onChange={(event) => {
                    onSelectValue(event.target.value);
                }}
                sx={solid ? { bgcolor: "#1976d2", color: "white" } : {}}
            >
                {options.map((option, index) => (
                    <MenuItem value={option.value} key={index}>
                        {option.display}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default GraphDropdown;

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../Loading";
import { graphAPI } from "../../api/routes";

const VotingAgePopulation = ({ state }) => {
    const [voterRaceData, setVoterRaceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await graphAPI.getVotingAgePopulation();
                setVoterRaceData(response);
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
        <Bar
            data={{
                labels: voterRaceData[stateName].map((data) => data.label),
                datasets: [
                    {
                        label: "Voting Population",
                        backgroundColor: "#FEB019",
                        data: voterRaceData[stateName].map((data) => data.value),
                    },
                ],
            }}
        />
    );
};

export default VotingAgePopulation;

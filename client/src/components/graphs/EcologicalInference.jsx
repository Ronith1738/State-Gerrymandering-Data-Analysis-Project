import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { graphAPI } from "../../api/routes";
import Loading from "../Loading";
import GraphDropdown from "./GraphDropdown";

const EcologicalInference = ({ state }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [election, setElection] = useState("President");

    const handleElectionChange = (election) => {
        setLoading(true);
        setElection(election);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await graphAPI.getEcologicalInference(state, election);
                setData(response);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [election, state]);

    if (loading) {
        return <Loading size={100} />;
    }

    let candidate_series_1 = [];
    let candidate_series_2 = [];
    let candidate1;
    let candidate2;
    if (election === "President") {
        candidate1 = "Trump";
        candidate2 = "Biden";
    } else {
        if (state === "Alabama") {
            candidate1 = "Jones";
            candidate2 = "Tuberville";
        } else {
            candidate1 = "Lujan";
            candidate2 = "Ronchetti";
        }
    }
    if (state === "Alabama") {
        candidate_series_1 = [
            {
                name: "White",
                type: "area",
                data: data[`white${candidate1}`],
            },
            {
                name: "Black",
                type: "area",
                data: data[`black${candidate1}`],
            },
        ];
        candidate_series_2 = [
            {
                name: "White",
                type: "area",
                data: data[`white${candidate2}`],
            },
            {
                name: "Black",
                type: "area",
                data: data[`black${candidate2}`],
            },
        ];
    } else if (state === "New Mexico") {
        candidate_series_1 = [
            {
                name: "White",
                type: "area",
                data: data[`white${candidate1}`],
            },
            {
                name: "Hispanic",
                type: "area",
                data: data[`hispanic${candidate1}`],
            },
            {
                name: "Native American",
                type: "area",
                data: data[`native${candidate1}`],
            },
        ];
        candidate_series_2 = [
            {
                name: "White",
                type: "area",
                data: data[`white${candidate2}`],
            },
            {
                name: "Hispanic",
                type: "area",
                data: data[`hispanic${candidate2}`],
            },
            {
                name: "Native American",
                type: "area",
                data: data[`native${candidate2}`],
            },
        ];
    }

    const getOptions = (candidateName) => {
        return {
            chart: {
                type: "area",
                stacked: false,
            },
            title: {
                text: `Support For ${candidateName}`,
                align: "center",
                style: {
                    fontSize: "24px",
                },
            },
            stroke: {
                width: [0, 2, 5],
                curve: "smooth",
            },
            plotOptions: {
                bar: {
                    columnWidth: "100%",
                },
            },
            xaxis: {
                type: "numeric",
                min: 0,
                tickAmount: 10,
            },
            yaxis: {
                title: {
                    text: "Probability Density",
                },
                max: 100,
            },
            fill: {
                opacity: [0.85, 0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: "light",
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100],
                },
            },
        };
    };

    const dropdownOptions = [
        { value: "President", display: "2020 Presidential Election" },
        { value: "Senate", display: "2020 U.S. Senate Election" },
    ];

    let option1 = getOptions(candidate1);
    let option2 = getOptions(candidate2);
    return (
        <>
            <GraphDropdown margin={1} value={election} onSelectValue={handleElectionChange} options={dropdownOptions} />
            <ReactApexChart width={875} options={option1} series={candidate_series_1} type="line" />
            <ReactApexChart width={875} options={option2} series={candidate_series_2} type="line" />
        </>
    );
};

export default EcologicalInference;

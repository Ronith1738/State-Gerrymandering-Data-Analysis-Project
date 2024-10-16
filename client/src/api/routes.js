import axios from "axios";

const BASE_URL = "http://localhost:8080/";

const instance = axios.create({
    baseURL: BASE_URL,
    responseType: "json",
});

export const mapAPI = {
    getStateOutline: async () => {
        const response = await instance.get("map/stateOutline");
        return response.data;
    },

    getHeatMap: async (state, type, race) => {
        const response = await instance.get(`map/heatMap/${state}/${type}/${race}`);
        return response.data;
    },
};

export const graphAPI = {
    getEcologicalInference: async (state, election) => {
        const response = await instance.get(`graph/ecologicalInference/${state}/${election}`);
        return response.data;
    },

    getGingles: async (state, race, election) => {
        const response = await instance.get(`graph/gingles/${state}/${race}/${election}`);
        return response.data;
    },

    getVotingAgePopulation: async () => {
        const response = await instance.get(`graph/votingAgePopulation`);
        return response.data;
    },

    getRacialDistributionNumber: async () => {
        const response = await instance.get(`graph/racialDistributionNumber`);
        return response.data;
    },

    getRacialDistributionPercent: async () => {
        const response = await instance.get(`graph/racialDistributionPercent`);
        return response.data;
    },

    getCurrentBox: async (state, race) => {
        const response = await instance.get(`graph/currentBox/${state}/${race}`);
        return response.data;
    },

    getEnsembleBox: async (state, race, size) => {
        const response = await instance.get(`graph/ensembleBox/${state}/${race}/${size}`);
        return response.data;
    },

    getVoteSeat: async () => {
        const response = await instance.get(`graph/voteSeat`);
        return response.data;
    },

    getOppBar: async (state, race, ensembleSize, threshold) => {
        const response = await instance.get(`graph/opportunityBar/${state}/${race}/${ensembleSize}/${threshold}`);
        return response.data;
    },
};

export const tableAPI = {
    getHouseParty: async () => {
        const response = await instance.get(`table/houseParty`);
        return response.data;
    },

    getEnsembleSummary: async () => {
        const response = await instance.get(`table/ensembleSummary`);
        return response.data;
    },

    getRepresentativeInfo: async (state) => {
        const response = await instance.get(`table/representativeInfo/${state}`);
        return response.data;
    },

    getFeasibleOpportunity: async (state) => {
        const response = await instance.get(`table/feasibleOpportunity/${state}`);
        return response.data;
    },
};

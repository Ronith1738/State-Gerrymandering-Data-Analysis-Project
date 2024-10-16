package dev.pistons.stateanalysis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import dev.pistons.stateanalysis.model.EnsembleSummary;
import dev.pistons.stateanalysis.model.DistrictRepresentative;
import dev.pistons.stateanalysis.model.DistrictRepresentativeParty;
import dev.pistons.stateanalysis.model.FeasibleOpportunity;
import dev.pistons.stateanalysis.repository.EnsembleSummaryRepository;
import dev.pistons.stateanalysis.repository.DistrictRepresentativeRepository;
import dev.pistons.stateanalysis.repository.DistrictRepresentativePartyRepository;
import dev.pistons.stateanalysis.repository.FeasibleOpportunityRepository;

@Service
public class TableService {
    @Autowired
    private DistrictRepresentativePartyRepository districtRepresentativePartyRepository;
    @Autowired
    private DistrictRepresentativeRepository districtRepresentativeRepository;
    @Autowired
    private EnsembleSummaryRepository ensembleSummaryRepository;
    @Autowired
    private FeasibleOpportunityRepository feasibleOpportunityRepository;

    public DistrictRepresentativeParty housePartySplit() {
        return districtRepresentativePartyRepository.findByName("representative_party_totals");
    }

    public EnsembleSummary ensembleSummary() {
        return ensembleSummaryRepository.findByName("ensemble_summary");
    }

    @Cacheable
    public DistrictRepresentative representativeInfo(String state) {
        return districtRepresentativeRepository.findByName(
            state.equalsIgnoreCase("alabama") ? "al_representatives" : 
            state.equalsIgnoreCase("new mexico") ? "nm_representatives" : 
            null);
    }

    public FeasibleOpportunity feasibleOpportunity(String state) {
        return feasibleOpportunityRepository.findByName(
            state.equalsIgnoreCase("alabama") ? "al_feasible_opportunity" : 
            state.equalsIgnoreCase("new mexico") ? "nm_feasible_opportunity" : 
            null);
    }
}

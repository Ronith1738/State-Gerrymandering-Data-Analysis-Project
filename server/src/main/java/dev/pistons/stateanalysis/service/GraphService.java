package dev.pistons.stateanalysis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import dev.pistons.stateanalysis.model.VotingAgePopulation;
import dev.pistons.stateanalysis.model.EcologicalInference;
import dev.pistons.stateanalysis.model.RacialDistributionNumber;
import dev.pistons.stateanalysis.model.RacialDistributionPercent;
import dev.pistons.stateanalysis.model.VoteSeatShare;
import dev.pistons.stateanalysis.model.Gingles;
import dev.pistons.stateanalysis.model.CurrentBox;
import dev.pistons.stateanalysis.model.EnsembleBox;
import dev.pistons.stateanalysis.model.OpportunityBar;
import dev.pistons.stateanalysis.repository.VotingAgePopulationRepository;
import dev.pistons.stateanalysis.repository.EcologicalInferenceRepository;
import dev.pistons.stateanalysis.repository.RacialDistributionNumberRepository;
import dev.pistons.stateanalysis.repository.RacialDistributionPercentRepository;
import dev.pistons.stateanalysis.repository.VoteSeatShareRepository;
import dev.pistons.stateanalysis.repository.GinglesRepository;
import dev.pistons.stateanalysis.repository.CurrentBoxRepository;
import dev.pistons.stateanalysis.repository.EnsembleBoxRepository;
import dev.pistons.stateanalysis.repository.OpportunityBarRepository;

@Service
public class GraphService {
    @Autowired
    private VotingAgePopulationRepository votingAgePopulationRepository;
    @Autowired
    private RacialDistributionNumberRepository racialDistributionNumberRepository;
    @Autowired
    private RacialDistributionPercentRepository racialDistributionPercentRepository;
    @Autowired
    private VoteSeatShareRepository voteSeatShareRepository;
    @Autowired
    private EcologicalInferenceRepository ecologicalInferenceRepository;
    @Autowired
    private GinglesRepository ginglesRepository;
    @Autowired
    private CurrentBoxRepository currentBoxRepository;
    @Autowired
    private EnsembleBoxRepository ensembleBoxRepository;
    @Autowired
    private OpportunityBarRepository opportunityBarRepository;

    public VotingAgePopulation votingAgePopulation() {
        return votingAgePopulationRepository.findByName("voter_race_totals");
    }

    public RacialDistributionNumber racialDistributionNumber() {
        return racialDistributionNumberRepository.findByName("rep_pop_race_totals");
    }

    public RacialDistributionPercent racialDistributionPercent() {
        return racialDistributionPercentRepository.findByName("rep_pop_race_percents");
    }

    public VoteSeatShare voteSeatShare() {
        return voteSeatShareRepository.findByName("al_vote_seat_share_curve");
    }

    @Cacheable
    public EcologicalInference ecologicalInference(String state, String election) {
        if (state.equalsIgnoreCase("alabama")) {
            return ecologicalInferenceRepository.findByName(
                election.equalsIgnoreCase("president") ? "al_president_ei" :
                election.equalsIgnoreCase("senate") ? "al_senate_ei" : 
                null);
        } 
        else if (state.equalsIgnoreCase("new mexico")) {
            return ecologicalInferenceRepository.findByName(
                election.equalsIgnoreCase("president") ? "nm_president_ei" :
                election.equalsIgnoreCase("senate") ? "nm_senate_ei" :
                null);
        }
        return null;
    }

    @Cacheable
    public Gingles gingles(String state, String race, String election) {
        if (state.equalsIgnoreCase("alabama")) {
            if (election.equalsIgnoreCase("president")) {
                return ginglesRepository.findByName(
                    race.equalsIgnoreCase("white") ? "al_gingles_white_president" :
                    race.equalsIgnoreCase("black") ? "al_gingles_black_president" : 
                    null);
            }
            else if (election.equalsIgnoreCase("senate")) {
                return ginglesRepository.findByName(
                    race.equalsIgnoreCase("white") ? "al_gingles_white_senate" :
                    race.equalsIgnoreCase("black") ? "al_gingles_black_senate" : 
                    null);
            }
        } 
        else if (state.equalsIgnoreCase("new mexico")) {
            if (election.equalsIgnoreCase("president")) {
                return ginglesRepository.findByName(
                    race.equalsIgnoreCase("white") ? "nm_gingles_white_president" :
                    race.equalsIgnoreCase("hispanic") ? "nm_gingles_hispanic_president" :
                    race.equalsIgnoreCase("native american") ? "nm_gingles_native_president" : 
                    null);
            }
            else if (election.equalsIgnoreCase("senate")) {
                return ginglesRepository.findByName(
                    race.equalsIgnoreCase("white") ? "nm_gingles_white_senate" :
                    race.equalsIgnoreCase("hispanic") ? "nm_gingles_hispanic_senate" :
                    race.equalsIgnoreCase("native american") ? "nm_gingles_native_senate" : 
                    null);
            }
        }
        return null;
    }

    @Cacheable
    public CurrentBox currentBox(String state, String race) {
        if (state.equalsIgnoreCase("alabama")) {
            return currentBoxRepository.findByName(
                race.equalsIgnoreCase("white") ? "al_white_box_and_whisker" :
                race.equalsIgnoreCase("black") ? "al_black_box_and_whisker" : 
                null);
        } 
        else if (state.equalsIgnoreCase("new mexico")) {
            return currentBoxRepository.findByName(
                race.equalsIgnoreCase("white") ? "nm_white_box_and_whisker" :
                race.equalsIgnoreCase("hispanic") ? "nm_hispanic_box_and_whisker" :
                race.equalsIgnoreCase("native american") ? "nm_native_box_and_whisker" : 
                null);
        }
        return null;
    }

    @Cacheable
    public EnsembleBox ensembleBox(String state, String race, String size) {
        if (state.equalsIgnoreCase("alabama")) {
            if (size.equalsIgnoreCase("250")) {
                return ensembleBoxRepository.findByName(
                    race.equalsIgnoreCase("white") ? "al_white_box_and_whisker_250" :
                    race.equalsIgnoreCase("black") ? "al_black_box_and_whisker_250" : 
                    null);
            }
            else if (size.equalsIgnoreCase("5000")) {
                return ensembleBoxRepository.findByName(
                    race.equalsIgnoreCase("white") ? "al_white_box_and_whisker_5000" :
                    race.equalsIgnoreCase("black") ? "al_black_box_and_whisker_5000" : 
                    null);
            }
        } 
        else if (state.equalsIgnoreCase("new mexico")) {
            if (size.equalsIgnoreCase("250")) {
                return ensembleBoxRepository.findByName(
                    race.equalsIgnoreCase("white") ? "nm_white_box_and_whisker_250" :
                    race.equalsIgnoreCase("hispanic") ? "nm_hispanic_box_and_whisker_250" :
                    race.equalsIgnoreCase("native american") ? "nm_native_box_and_whisker_250" : 
                    null);
            }
            else if (size.equalsIgnoreCase("5000")) {
                return ensembleBoxRepository.findByName(
                    race.equalsIgnoreCase("white") ? "nm_white_box_and_whisker_5000" :
                    race.equalsIgnoreCase("hispanic") ? "nm_hispanic_box_and_whisker_5000" :
                    race.equalsIgnoreCase("native american") ? "nm_native_box_and_whisker_5000" : 
                    null);
            }
        }
        return null;
    }

    @Cacheable
    public OpportunityBar opportunityBar(String state, String race, String ensembleSize, String threshold) {
        if (state.equalsIgnoreCase("alabama")) {
            if (ensembleSize.equalsIgnoreCase("250")) {
                if (threshold.equalsIgnoreCase("0.37")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "al_white_37_250" :
                        race.equalsIgnoreCase("black") ? "al_black_37_250" : 
                        null);
                }
                else if (threshold.equalsIgnoreCase("0.45")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "al_white_45_250" :
                        race.equalsIgnoreCase("black") ? "al_black_45_250" : 
                        null);
                }
                else if (threshold.equalsIgnoreCase("0.5")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "al_white_50_250" :
                        race.equalsIgnoreCase("black") ? "al_black_50_250" : 
                        null);
                }
            }
            else if (ensembleSize.equalsIgnoreCase("5000")) {
                if (threshold.equalsIgnoreCase("0.37")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "al_white_37_5000" :
                        race.equalsIgnoreCase("black") ? "al_black_37_5000" : 
                        null);
                }
                else if (threshold.equalsIgnoreCase("0.45")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "al_white_45_5000" :
                        race.equalsIgnoreCase("black") ? "al_black_45_5000" : 
                        null);
                }
                else if (threshold.equalsIgnoreCase("0.5")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "al_white_50_5000" :
                        race.equalsIgnoreCase("black") ? "al_black_50_5000" : 
                        null);
                }
            }
        } 
        else if (state.equalsIgnoreCase("new mexico")) {
            if (ensembleSize.equalsIgnoreCase("250")) {
                if (threshold.equalsIgnoreCase("0.37")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "nm_white_37_250" :
                        race.equalsIgnoreCase("hispanic") ? "nm_hispanic_37_250" : 
                        race.equalsIgnoreCase("native american") ? "nm_native_37_250" :
                        null);
                }
                else if (threshold.equalsIgnoreCase("0.45")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "nm_white_45_250" :
                        race.equalsIgnoreCase("hispanic") ? "nm_hispanic_45_250" : 
                        race.equalsIgnoreCase("native american") ? "nm_native_45_250" :
                        null);
                }
                else if (threshold.equalsIgnoreCase("0.5")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "nm_white_50_250" :
                        race.equalsIgnoreCase("hispanic") ? "nm_hispanic_50_250" : 
                        race.equalsIgnoreCase("native american") ? "nm_native_50_250" :
                        null);
                }
            }
            else if (ensembleSize.equalsIgnoreCase("5000")) {
                if (threshold.equalsIgnoreCase("0.37")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "nm_white_37_5000" :
                        race.equalsIgnoreCase("hispanic") ? "nm_hispanic_37_5000" : 
                        race.equalsIgnoreCase("native american") ? "nm_native_37_5000" :
                        null);
                }
                else if (threshold.equalsIgnoreCase("0.45")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "nm_white_45_5000" :
                        race.equalsIgnoreCase("hispanic") ? "nm_hispanic_45_5000" : 
                        race.equalsIgnoreCase("native american") ? "nm_native_45_5000" :
                        null);
                }
                else if (threshold.equalsIgnoreCase("0.5")) {
                    return opportunityBarRepository.findByName(
                        race.equalsIgnoreCase("white") ? "nm_white_50_5000" :
                        race.equalsIgnoreCase("hispanic") ? "nm_hispanic_50_5000" : 
                        race.equalsIgnoreCase("native american") ? "nm_native_50_5000" :
                        null);
                }
            }
        }
        return null;
    }
}

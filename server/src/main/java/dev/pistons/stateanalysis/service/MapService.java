package dev.pistons.stateanalysis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import dev.pistons.stateanalysis.model.StateBoundary;
import dev.pistons.stateanalysis.model.HeatMapBoundary;
import dev.pistons.stateanalysis.repository.StateBoundaryRepository;
import dev.pistons.stateanalysis.repository.HeatMapBoundaryRepository;

@Service
public class MapService {
    @Autowired
    private StateBoundaryRepository stateBoundaryRepository;
    @Autowired
    private HeatMapBoundaryRepository heatMapBoundaryRepository;

    @Cacheable
    public StateBoundary stateBoundaries() {
        return stateBoundaryRepository.findByName("state_boundary");
    } 

    @Cacheable
    public HeatMapBoundary heatMapBoundaries(String state, String type, String race) {
        if (state.equalsIgnoreCase("alabama")) {
            if (type.equalsIgnoreCase("district")) {
                return heatMapBoundaryRepository.findByName("al_district_boundary");
            }
            else if (type.equalsIgnoreCase("precinct")) {
                return heatMapBoundaryRepository.findByName("al_precinct_boundary");
            }
            else if (type.equalsIgnoreCase("constructed")) {
                return heatMapBoundaryRepository.findByName(
                race.equalsIgnoreCase("black") ? "al_black_opportunity_district" :
                null);
            }
        } 
        else if (state.equalsIgnoreCase("new mexico")) {
            if (type.equalsIgnoreCase("district")) {
                return heatMapBoundaryRepository.findByName("nm_district_boundary");
            }
            else if (type.equalsIgnoreCase("precinct")) {
                return heatMapBoundaryRepository.findByName("nm_precinct_boundary");
            }
            else if (type.equalsIgnoreCase("constructed")) {
                return heatMapBoundaryRepository.findByName(
                race.equalsIgnoreCase("hispanic") ? "nm_hispanic_opportunity_district" :
                race.equalsIgnoreCase("native american") ? "nm_natives_opportunity_district" :
                null);
            }
        }
        return null;
    } 
}

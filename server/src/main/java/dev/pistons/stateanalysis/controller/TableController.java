package dev.pistons.stateanalysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pistons.stateanalysis.model.EnsembleSummary;
import dev.pistons.stateanalysis.model.DistrictRepresentative;
import dev.pistons.stateanalysis.model.DistrictRepresentativeParty;
import dev.pistons.stateanalysis.model.FeasibleOpportunity;
import dev.pistons.stateanalysis.service.TableService;

@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/table")
public class TableController {
    @Autowired
    private TableService tableService;

    @GetMapping("/houseParty")
    public ResponseEntity<DistrictRepresentativeParty> getHousePartySplit() {
        return new ResponseEntity<DistrictRepresentativeParty>(tableService.housePartySplit(), HttpStatus.OK);
    }

    @GetMapping("/ensembleSummary")
    public ResponseEntity<EnsembleSummary> getEnsembleSummary() {
        return new ResponseEntity<EnsembleSummary>(tableService.ensembleSummary(), HttpStatus.OK);
    }

    @GetMapping("/representativeInfo/{state}")
    public ResponseEntity<DistrictRepresentative> getRepresentativeInfo(@PathVariable String state) {
        return new ResponseEntity<DistrictRepresentative>(tableService.representativeInfo(state), HttpStatus.OK);
    }

    @GetMapping("/feasibleOpportunity/{state}")
    public ResponseEntity<FeasibleOpportunity> getFeasibleOpportunity(@PathVariable String state) {
        return new ResponseEntity<FeasibleOpportunity>(tableService.feasibleOpportunity(state), HttpStatus.OK);
    }
}

package dev.pistons.stateanalysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pistons.stateanalysis.model.VotingAgePopulation;
import dev.pistons.stateanalysis.model.EcologicalInference;
import dev.pistons.stateanalysis.model.RacialDistributionNumber;
import dev.pistons.stateanalysis.model.RacialDistributionPercent;
import dev.pistons.stateanalysis.model.VoteSeatShare;
import dev.pistons.stateanalysis.model.Gingles;
import dev.pistons.stateanalysis.model.CurrentBox;
import dev.pistons.stateanalysis.model.EnsembleBox;
import dev.pistons.stateanalysis.model.OpportunityBar;
import dev.pistons.stateanalysis.service.GraphService;

@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/graph")
public class GraphController {
    @Autowired
    private GraphService graphService;

    @GetMapping("/votingAgePopulation")
    public ResponseEntity<VotingAgePopulation> getVotingAgePopulation() {
        return new ResponseEntity<VotingAgePopulation>(graphService.votingAgePopulation(), HttpStatus.OK);
    }

    @GetMapping("/racialDistributionNumber")
    public ResponseEntity<RacialDistributionNumber> getRacialDistributionNumber() {
        return new ResponseEntity<RacialDistributionNumber>(graphService.racialDistributionNumber(), HttpStatus.OK);
    }

    @GetMapping("/racialDistributionPercent")
    public ResponseEntity<RacialDistributionPercent> getRacialDistributionPercent() {
        return new ResponseEntity<RacialDistributionPercent>(graphService.racialDistributionPercent(), HttpStatus.OK);
    }

    @GetMapping("/voteSeat")
    public ResponseEntity<VoteSeatShare> getVoteSeatShare() {
        return new ResponseEntity<VoteSeatShare>(graphService.voteSeatShare(), HttpStatus.OK);
    }

    @GetMapping("/ecologicalInference/{state}/{election}")
    public ResponseEntity<EcologicalInference> getEcologicalInference(@PathVariable String state, @PathVariable String election) {
        return new ResponseEntity<EcologicalInference>(graphService.ecologicalInference(state, election), HttpStatus.OK);
    }

    @GetMapping("/gingles/{state}/{race}/{election}")
    public ResponseEntity<Gingles> getGingles(@PathVariable String state, @PathVariable String race, @PathVariable String election) {
        return new ResponseEntity<Gingles>(graphService.gingles(state, race, election), HttpStatus.OK);
    }

    @GetMapping("/currentBox/{state}/{race}")
    public ResponseEntity<CurrentBox> getCurrentBox(@PathVariable String state, @PathVariable String race) {
        return new ResponseEntity<CurrentBox>(graphService.currentBox(state, race), HttpStatus.OK);
    }

    @GetMapping("/ensembleBox/{state}/{race}/{size}")
    public ResponseEntity<EnsembleBox> getEnsembleBox(@PathVariable String state, @PathVariable String race, @PathVariable String size) {
        return new ResponseEntity<EnsembleBox>(graphService.ensembleBox(state, race, size), HttpStatus.OK);
    }

    @GetMapping("/opportunityBar/{state}/{race}/{ensembleSize}/{threshold}")
    public ResponseEntity<OpportunityBar> getOpportunityBar(@PathVariable String state, @PathVariable String race, @PathVariable String ensembleSize, @PathVariable String threshold) {
        return new ResponseEntity<OpportunityBar>(graphService.opportunityBar(state, race, ensembleSize, threshold), HttpStatus.OK);
    }
}

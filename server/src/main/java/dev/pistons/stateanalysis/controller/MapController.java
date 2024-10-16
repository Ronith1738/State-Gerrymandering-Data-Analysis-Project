package dev.pistons.stateanalysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pistons.stateanalysis.model.StateBoundary;
import dev.pistons.stateanalysis.model.HeatMapBoundary;
import dev.pistons.stateanalysis.service.MapService;

@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/map")
public class MapController {
    @Autowired
    private MapService mapService;

    @GetMapping("/stateOutline")
    public ResponseEntity<StateBoundary> getStateBoundaries() {
        return new ResponseEntity<StateBoundary>(mapService.stateBoundaries(), HttpStatus.OK);
    }

    @GetMapping("/heatMap/{state}/{type}/{race}")
    public ResponseEntity<HeatMapBoundary> getHeatMapBoundaries(@PathVariable String state, @PathVariable String type, @PathVariable String race) {
        return new ResponseEntity<HeatMapBoundary>(mapService.heatMapBoundaries(state, type, race), HttpStatus.OK);
    }
}

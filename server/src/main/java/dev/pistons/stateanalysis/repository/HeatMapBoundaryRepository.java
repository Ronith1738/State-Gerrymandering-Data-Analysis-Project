package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.HeatMapBoundary;

@Repository
public interface HeatMapBoundaryRepository extends MongoRepository<HeatMapBoundary, ObjectId> {
    HeatMapBoundary findByName(String name);
}

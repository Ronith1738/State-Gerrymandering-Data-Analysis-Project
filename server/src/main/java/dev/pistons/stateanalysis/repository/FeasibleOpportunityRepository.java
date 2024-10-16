package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.FeasibleOpportunity;

@Repository
public interface FeasibleOpportunityRepository extends MongoRepository<FeasibleOpportunity, ObjectId> {
    FeasibleOpportunity findByName(String name);
}

package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.OpportunityBar;

@Repository
public interface OpportunityBarRepository extends MongoRepository<OpportunityBar, ObjectId> {
    OpportunityBar findByName(String name);
}

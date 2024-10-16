package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.EnsembleBox;

@Repository
public interface EnsembleBoxRepository extends MongoRepository<EnsembleBox, ObjectId> {
    EnsembleBox findByName(String name);
}

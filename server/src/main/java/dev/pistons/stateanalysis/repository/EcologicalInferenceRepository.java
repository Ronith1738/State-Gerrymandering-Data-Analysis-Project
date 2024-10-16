package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.EcologicalInference;

@Repository
public interface EcologicalInferenceRepository extends MongoRepository<EcologicalInference, ObjectId> {
    EcologicalInference findByName(String name);
}

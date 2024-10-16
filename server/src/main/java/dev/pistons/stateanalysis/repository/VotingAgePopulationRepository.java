package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.VotingAgePopulation;

@Repository
public interface VotingAgePopulationRepository extends MongoRepository<VotingAgePopulation, ObjectId> {
    VotingAgePopulation findByName(String name);
}

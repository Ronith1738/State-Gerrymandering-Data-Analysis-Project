package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.RacialDistributionPercent;

@Repository
public interface RacialDistributionPercentRepository extends MongoRepository<RacialDistributionPercent, ObjectId> {
    RacialDistributionPercent findByName(String name);
}

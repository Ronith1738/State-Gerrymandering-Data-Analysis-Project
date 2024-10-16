package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.RacialDistributionNumber;

@Repository
public interface RacialDistributionNumberRepository extends MongoRepository<RacialDistributionNumber, ObjectId> {
    RacialDistributionNumber findByName(String name);
}

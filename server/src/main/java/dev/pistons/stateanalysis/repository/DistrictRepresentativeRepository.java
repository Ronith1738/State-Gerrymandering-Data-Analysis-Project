package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.DistrictRepresentative;

@Repository
public interface DistrictRepresentativeRepository extends MongoRepository<DistrictRepresentative, ObjectId> {
    DistrictRepresentative findByName(String name);
}

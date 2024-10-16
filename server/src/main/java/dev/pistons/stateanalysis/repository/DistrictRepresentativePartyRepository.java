package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.DistrictRepresentativeParty;

@Repository
public interface DistrictRepresentativePartyRepository extends MongoRepository<DistrictRepresentativeParty, ObjectId> {
    DistrictRepresentativeParty findByName(String name);
}

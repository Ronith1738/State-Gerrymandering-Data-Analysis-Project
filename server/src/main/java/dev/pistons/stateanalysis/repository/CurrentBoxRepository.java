package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.CurrentBox;

@Repository
public interface CurrentBoxRepository extends MongoRepository<CurrentBox, ObjectId> {
    CurrentBox findByName(String name);
}

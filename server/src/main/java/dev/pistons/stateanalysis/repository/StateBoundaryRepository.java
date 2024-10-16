package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.StateBoundary;

@Repository
public interface StateBoundaryRepository extends MongoRepository<StateBoundary, ObjectId> {
    StateBoundary findByName(String name);
}

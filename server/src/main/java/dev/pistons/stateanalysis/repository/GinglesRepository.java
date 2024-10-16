package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.Gingles;

@Repository
public interface GinglesRepository extends MongoRepository<Gingles, ObjectId> {
    Gingles findByName(String name);
}

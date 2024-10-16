package dev.pistons.stateanalysis.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.pistons.stateanalysis.model.VoteSeatShare;

@Repository
public interface VoteSeatShareRepository extends MongoRepository<VoteSeatShare, ObjectId> {
    VoteSeatShare findByName(String name);
}

package dev.pistons.stateanalysis.model;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "vote_share_seat_share")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoteSeatShare {
    @Id
    private ObjectId id;
    private double[] labels;
    private Set<Datasets> datasets;
    private double partisanBias;    
    private double responsiveness;    
    private double symmetry;    
    private String name;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Datasets {
        private String label;
        private double[] data;
    }
}

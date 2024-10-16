package dev.pistons.stateanalysis.model;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "box_and_whisker_ensemble")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnsembleBox {
    @Id
    private ObjectId id;
    private Set<Alabama> alabama;
    private Set<NewMexico> newMexico;
    private String name;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Alabama {
        private int x;
        private double[] y;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class NewMexico {
        private int x;
        private double[] y;
    }
}

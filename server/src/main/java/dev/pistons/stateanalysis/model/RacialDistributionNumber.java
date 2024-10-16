package dev.pistons.stateanalysis.model;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "racial_distribution_state_assembly_table")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RacialDistributionNumber {
    @Id
    private ObjectId id;
    private Set<Alabama> alabama;
    private Set<NewMexico> newMexico;
    private String name;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Alabama {
        private String label;
        private int assemblyValue;
        private String populationValue;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class NewMexico {
        private String label;
        private int assemblyValue;
        private String populationValue;
    }
}

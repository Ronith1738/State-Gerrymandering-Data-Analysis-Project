package dev.pistons.stateanalysis.model;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "racial_distribution_state_assembly_graph")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RacialDistributionPercent {
    @Id
    private ObjectId id;
    private Alabama alabama;
    private NewMexico newMexico;
    private String name;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Alabama {
        private String[] labels;
        private Set<Datasets> datasets;
        
        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Datasets {
            private String label;
            private double[] data;
        }
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class NewMexico {
        private String[] labels;
        private Set<Datasets> datasets;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Datasets {
            private String label;
            private double[] data;
        }
    }
}

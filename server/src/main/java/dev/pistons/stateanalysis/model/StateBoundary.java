package dev.pistons.stateanalysis.model;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "state_boundary")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StateBoundary {
    @Id
    private ObjectId id;
    private String type;
    private Set<Feature> features;
    private String name;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Feature {
        private String type;
        private Properties properties;
        private Geometry geometry;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Properties {
            private String id;
            private String name;
            private double density;
        }
        
        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Geometry {
            private String type;
            private double[][][] coordinates;
        }
    }
}

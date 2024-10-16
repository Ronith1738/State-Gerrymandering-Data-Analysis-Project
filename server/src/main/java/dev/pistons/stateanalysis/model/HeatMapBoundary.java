package dev.pistons.stateanalysis.model;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "heat_map_boundaries")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HeatMapBoundary {
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
            private String geoID;
            private String name;
            private String county;
            private String countyName;
            private int totalPop;
            private int hispanic;
            private int white;
            private int black;
            private int natives;
            private int asian;
            private int other;
        }
        
        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Geometry {
            private String type;
            private double[][][][] coordinates;
        }
    }
}

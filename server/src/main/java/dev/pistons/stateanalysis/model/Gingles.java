package dev.pistons.stateanalysis.model;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "gingles")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Gingles {
    @Id
    private ObjectId id;
    private Datum datum;
    private String name;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Datum {
        private double[] labels;
        private Set<Datasets> datasets;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Datasets {
            private String type;
            private String label;
            private String borderColor;
            private String backgroundColor;
            private String xAxisID;
            private double[] datas;
            private Set<Datan> datan;

            @Data
            @AllArgsConstructor
            @NoArgsConstructor
            public static class Datan {
                private double x;
                private double y;
            }
        }
    }
}
package dev.pistons.stateanalysis.model;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "box_and_whisker")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CurrentBox {
    @Id
    private ObjectId id;
    private Set<Values> values;
    private String name;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Values {
        private int x;
        private double y;
    }
}

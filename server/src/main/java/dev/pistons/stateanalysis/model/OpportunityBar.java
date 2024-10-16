package dev.pistons.stateanalysis.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "opportunity_districts_bar")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpportunityBar {
    @Id
    private ObjectId id;
    private Datas datas;
    private String name;
    
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Datas {
        private String[] x;
        private int[] y;
    }
}

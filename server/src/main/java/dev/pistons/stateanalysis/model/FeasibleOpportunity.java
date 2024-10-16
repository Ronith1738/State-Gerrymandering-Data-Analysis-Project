package dev.pistons.stateanalysis.model;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "feasible_opp_districts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeasibleOpportunity {
    @Id
    private ObjectId id;
    private Set<Datas> datas;
    private String name;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Datas {
        private String label;
        private String idealPopulation;
        private String populationValue;
        private String oppDistricts;
        private String maximumOppDistricts;
        private String averageOppDistricts;
    }
}

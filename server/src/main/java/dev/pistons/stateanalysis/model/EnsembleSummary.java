package dev.pistons.stateanalysis.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "ensemble_summary")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnsembleSummary {
    @Id
    private ObjectId id;
    private Alabama alabama;
    private NewMexico newMexico;
    private String name;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Alabama {
        private String ensembleOne;
        private String ensembleTwo;
        private String blackOpportunityOne;
        private String blackOpportunityTwo;
        private String democratVotesOne;
        private String democratVotesTwo;
        private String republicanVotesOne;
        private String republicanVotesTwo;
        private String threshold;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class NewMexico {
        private String ensembleOne;
        private String ensembleTwo;
        private String hispanicOpportunityOne;
        private String hispanicOpportunityTwo;
        private String nativeOpportunityOne;
        private String nativeOpportunityTwo;
        private String democratVotesOne;
        private String democratVotesTwo;
        private String republicanVotesOne;
        private String republicanVotesTwo;
        private String threshold;
    }
}

package dev.pistons.stateanalysis.model;

import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "district_representatives")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DistrictRepresentative {
    @Id
    private ObjectId id;
    private Set<Representative> representatives;
    private String name;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Representative {
        private String id;
        private String name;
        private String party;
        private int district;
        private String image;
        private String race;
        private String voteMargin;
    }
}

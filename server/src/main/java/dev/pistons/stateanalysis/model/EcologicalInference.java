package dev.pistons.stateanalysis.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "ecological_inference")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EcologicalInference {
    @Id
    private ObjectId id;
    private double[] whiteBiden;
    private double[] whiteTrump;
    private double[] whiteOther;
    private double[] blackBiden;
    private double[] blackTrump;
    private double[] blackOther;
    private double[] hispanicBiden;
    private double[] hispanicTrump;
    private double[] hispanicOther;
    private double[] nativeBiden;
    private double[] nativeTrump;
    private double[] nativeOther;
    private double[] otherBiden;
    private double[] otherTrump;
    private double[] otherOther;
    private double[] whiteTuberville;
    private double[] whiteJones;
    private double[] blackTuberville;
    private double[] blackJones;
    private double[] hispanicLujan;
    private double[] hispanicRonchetti;
    private double[] whiteLujan;
    private double[] whiteRonchetti;
    private double[] nativeLujan;
    private double[] nativeRonchetti;
    private String name;
}

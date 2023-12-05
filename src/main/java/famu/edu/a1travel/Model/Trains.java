package famu.edu.a1travel.Model;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.annotation.DocumentId;
import com.google.firebase.database.annotations.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Trains {
    @DocumentId
    private @Nullable String trainId;
    private String arriveLocation;
    private Timestamp arriveTime;
    private Timestamp departTime;
    private String departLocation;
    private String duration;
    private String status;
    private Double price;
    private int stops;

    public void setArriveTime(Timestamp timestamp) {
        this.arriveTime = timestamp;
    }
    public void setDepartTime(Timestamp timestamp) {
        this.departTime = timestamp;
    }

}

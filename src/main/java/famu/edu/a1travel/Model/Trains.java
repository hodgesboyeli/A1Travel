package famu.edu.a1travel.Model;
import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Trains {
    private String arriveLocation;
    private Timestamp arriveTime;
    private Timestamp departTime;
    private String departLocation;
    private String duration;
    private String status;
    private Double price;
    private int stops;

    /*public void setArriveTime(String arriveTime) throws ParseException {
        this.arriveTime = Timestamp.fromProto(Timestamps.parse(arriveTime));
    }

    public void setDepartTime(String departTime) throws ParseException {
        this.departTime = Timestamp.fromProto(Timestamps.parse(departTime));
    }*/

    public void setArriveTime(Timestamp timestamp) {
        this.arriveTime = timestamp;
    }


    public void setDepartTime(Timestamp timestamp) {
        this.departTime = timestamp;
    }

}

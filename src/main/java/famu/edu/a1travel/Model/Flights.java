package famu.edu.a1travel.Model;
import com.google.cloud.Timestamp;
import com.google.protobuf.util.Timestamps;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flights {
    private String airline;
    private String arriveLocation;
    private Timestamp arriveTime;
    private String departLocation;
    private Timestamp departTime;
    private String duration;
    private float price;
    private String status;
    private int stops;

    public void setArriveTime(String arriveTime) throws ParseException {
        this.arriveTime = Timestamp.fromProto(Timestamps.parse(arriveTime));
    }

    public void setDepartTime(String departTime) throws ParseException {
        this.departTime = Timestamp.fromProto(Timestamps.parse(departTime));
    }
}

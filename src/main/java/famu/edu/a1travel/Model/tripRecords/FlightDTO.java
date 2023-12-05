package famu.edu.a1travel.Model.tripRecords;

import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightDTO {
    String flightID;
    String arriveLocation;
    Timestamp arriveTime;
    String departLocation;
    Timestamp departTime;
    Double price;
}

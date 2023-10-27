package famu.edu.a1travel.Model;
import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}

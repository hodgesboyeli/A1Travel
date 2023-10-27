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
    private float price;
    private int stops;
}

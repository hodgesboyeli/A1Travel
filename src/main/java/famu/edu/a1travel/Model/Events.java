package famu.edu.a1travel.Model;
import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Events {
    private int capacity;
    private String description;
    private Timestamp eventEnd;
    private String eventName;
    private Timestamp eventStart;
    private String eventType;
    private String image;
    private String location;
    private String organizer;
    private float price;
    private int registrations;
}

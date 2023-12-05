package famu.edu.a1travel.Model.tripRecords;

import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
    String eventID;
    String eventName;
    Timestamp eventStart;
    Timestamp eventEnd;
    Double price;
}
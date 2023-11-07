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
    private String phoneNumber;
    private String email;
    public void setEventEnd(String eventEnd) throws ParseException {
        this.eventEnd = Timestamp.fromProto(Timestamps.parse(eventEnd));
    }

    public void setEventStart(String eventStart) throws ParseException {
        this.eventStart = Timestamp.fromProto(Timestamps.parse(eventStart));
    }
}

package famu.edu.a1travel.Model;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.annotation.DocumentId;
import com.google.firebase.database.annotations.Nullable;
import com.google.protobuf.util.Timestamps;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Events {
    @DocumentId
    private @Nullable String eventId;
    private int capacity;
    private String description;
    @JsonFormat(pattern = "MMMM dd, yyyy 'at' hh:mm:ss a 'UTC-5'", timezone = "UTC-5")
    private Timestamp eventEnd;
    public void setEventEnd(String eventEnd) throws ParseException {
        this.eventEnd = Timestamp.fromProto(Timestamps.parse(eventEnd));
    }

    private String eventName;

    @JsonFormat(pattern = "MMMM dd, yyyy 'at' hh:mm:ss a 'UTC-5'", timezone = "UTC-5")
    private Timestamp eventStart;
    public void setEventStart(String eventStart) throws ParseException {
        this.eventStart = Timestamp.fromProto(Timestamps.parse(eventStart));
    }

    private String eventType;
    private String image;
    private String address;
    private String cityState;
    private String organizer;
    private float price;
    private int registrations;
    private String phoneNumber;
    private String email;
}

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
    private Timestamp eventEnd;
    private String eventName;
    private Timestamp eventStart;
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

package famu.edu.a1travel.Model;
import com.google.cloud.Timestamp;
import com.google.protobuf.util.Timestamps;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;
import java.util.concurrent.TimeoutException;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseAnnouncements {
    private String body;
    private String header;
    private Timestamp timestamp;
    private String type;
}

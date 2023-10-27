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
public class BaseMessages {
    private String messageContent;
    private Timestamp timestamp;

    public void setTimestamp(String timestamp) throws ParseException {
        this.timestamp = Timestamp.fromProto(Timestamps.parse(timestamp));
    }
}

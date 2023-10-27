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
public class BaseReceipts {
    private Timestamp dateIssued;
    private float totalAmount;

    public void setDateIssued(String dateIssued) throws ParseException {
        this.dateIssued = Timestamp.fromProto(Timestamps.parse(dateIssued));
    }
}

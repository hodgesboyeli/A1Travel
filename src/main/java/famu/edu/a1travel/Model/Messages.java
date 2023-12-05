package famu.edu.a1travel.Model;

import com.google.cloud.Timestamp;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Messages extends BaseMessages {
    private String receiverID;
    private String senderID;

    public Messages(String messageId, String messageContent, Timestamp timestamp, String receiverID, String senderID) {
        super(messageId, messageContent, timestamp);
        this.receiverID = receiverID;
        this.senderID = senderID;
    }
}

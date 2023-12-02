package famu.edu.a1travel.Model;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class RestMessages extends BaseMessages {
    private DocumentReference receiverID;
    private DocumentReference senderID;

    public RestMessages(String messageId, String messageContent, Timestamp timestamp, DocumentReference receiverID, DocumentReference senderID) {
        super(messageId, messageContent, timestamp);
        this.receiverID = receiverID;
        this.senderID = senderID;
    }
}

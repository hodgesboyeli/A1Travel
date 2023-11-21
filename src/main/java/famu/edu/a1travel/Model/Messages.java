package famu.edu.a1travel.Model;

import com.google.cloud.Timestamp;

public class Messages extends BaseMessages {
    private Users receiverID;
    private Users senderID;

    public Messages() {
    }

    public Messages(String messageContent, Timestamp timestamp, Users receiverID, Users senderID) {
        super(messageContent, timestamp);
        this.receiverID = receiverID;
        this.senderID = senderID;
    }
}

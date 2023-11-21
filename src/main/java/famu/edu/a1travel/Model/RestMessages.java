package famu.edu.a1travel.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class RestMessages extends BaseMessages {
    private DocumentReference receiverID;
    private DocumentReference senderID;

    public RestMessages(String messageContent, Timestamp timestamp, DocumentReference receiverID, DocumentReference senderID) {
        super(messageContent, timestamp);
        this.receiverID = receiverID;
        this.senderID = senderID;
    }

    public void setReceiverID(String receiver) {
        Firestore db = FirestoreClient.getFirestore();
        this.receiverID = db.collection("Users").document(receiver);
    }

    public void setSenderID(String sender) {
        Firestore db = FirestoreClient.getFirestore();
        this.senderID = db.collection("Users").document(sender);
    }
}

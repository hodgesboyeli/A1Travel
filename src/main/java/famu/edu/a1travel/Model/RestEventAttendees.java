package famu.edu.a1travel.Model;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

public class RestEventAttendees extends BaseEventAttendees {
    private DocumentReference eventID;
    private DocumentReference userID;

    public RestEventAttendees(DocumentReference eventID, DocumentReference userID) {
        this.eventID = eventID;
        this.userID = userID;
    }

    public void setUserID(String user) {
        Firestore db = FirestoreClient.getFirestore();
        this.userID = db.collection("Users").document(user);
    }

    public void setEventID(String event) {
        Firestore db = FirestoreClient.getFirestore();
        this.eventID = db.collection("Events").document(event);
    }
}

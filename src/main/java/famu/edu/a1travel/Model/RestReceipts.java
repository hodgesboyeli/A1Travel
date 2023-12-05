package famu.edu.a1travel.Model;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RestReceipts extends BaseReceipts {
    private DocumentReference tripID;
    private DocumentReference userID;

    public RestReceipts(Timestamp dateIssued, float totalAmount, DocumentReference tripID, DocumentReference userID) {
        super(dateIssued, totalAmount);
        this.tripID = tripID;
        this.userID = userID;
    }

    public void setTripID(String trip) {
        Firestore db = FirestoreClient.getFirestore();
        this.tripID = db.collection("Trips").document(trip);
    }

    public void setUserID(String user) {
        Firestore db = FirestoreClient.getFirestore();
        this.userID = db.collection("Users").document(user);
    }
}

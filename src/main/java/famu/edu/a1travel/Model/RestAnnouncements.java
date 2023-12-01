package famu.edu.a1travel.Model;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RestAnnouncements extends BaseAnnouncements {
    private DocumentReference adminID;

    public RestAnnouncements(String body, String header, Timestamp timestamp, String type, DocumentReference adminID) {
        super(body, header, timestamp, type);
        this.adminID = adminID;
    }

    public void setAdminID(String admin) {
        Firestore db = FirestoreClient.getFirestore();
        this.adminID = db.collection("Users").document(admin);
    }
}
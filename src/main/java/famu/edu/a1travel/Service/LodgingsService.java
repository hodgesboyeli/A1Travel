package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.Lodgings;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
@Service
public class LodgingsService {
    private final Firestore db = FirestoreClient.getFirestore();
    public Lodgings getLodgingById(String id) throws ExecutionException, InterruptedException {
        DocumentReference doc = db.collection("Lodgings").document(id);
        ApiFuture<DocumentSnapshot> future = doc.get();
        return future.get().toObject(Lodgings.class);
    }
}

package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import famu.edu.a1travel.Model.Lodgings;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
@Service
public class LodgingsService {
    private final Firestore db;
    public LodgingsService(Firestore db){
        this.db = db;
    }
    public Lodgings getLodgingById(String id) throws ExecutionException, InterruptedException {
        DocumentReference doc = db.collection("Lodgings").document(id);
        ApiFuture<DocumentSnapshot> future = doc.get();
        return future.get().toObject(Lodgings.class);
    }
    public Lodgings getLodgingByRef(DocumentReference ref) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = ref.get();
        return future.get().toObject(Lodgings.class);
    }
}

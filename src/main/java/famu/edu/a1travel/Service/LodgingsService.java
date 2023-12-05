package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.Lodgings;
import famu.edu.a1travel.Model.Users;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public Lodgings getLodgingByCityState(String cityState) throws ExecutionException, InterruptedException {
        CollectionReference lodgingsCollection = db.collection("Lodgings");
        Query query = lodgingsCollection.whereEqualTo("cityState", cityState);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if (!documents.isEmpty()) {
            System.out.println("All good with get lodgings by cityState");
            return documents.get(0).toObject(Lodgings.class);
        }
        System.out.println("Get lodging by cityState NOT working!");
        return null; // Lodging not found
    }
    public Lodgings getLodgingByRef(DocumentReference ref) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = ref.get();
        return future.get().toObject(Lodgings.class);
    }
}

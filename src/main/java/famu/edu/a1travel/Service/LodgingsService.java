package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.Events;
import famu.edu.a1travel.Model.Lodgings;
import famu.edu.a1travel.Model.Lodgings;
import famu.edu.a1travel.Model.Lodgings;
import famu.edu.a1travel.Model.Users;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
@Service
public class LodgingsService {
    private final Firestore db;
    public LodgingsService(Firestore db){
        this.db = db;
    }

    public String createLodging(Lodgings lodging) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentReference> future = db.collection("Lodgings").add(lodging);
        DocumentReference lodgingRef = future.get();
        return lodgingRef.getId();
    }
  
    public ArrayList<Lodgings> getLodgings() throws ExecutionException, InterruptedException {
        CollectionReference lodgingsCollection = db.collection("Lodgings");
        ApiFuture<QuerySnapshot> future = lodgingsCollection.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if (!documents.isEmpty()) {
            ArrayList<Lodgings> lodgings = new ArrayList<>();
            for (QueryDocumentSnapshot doc : documents)
            {
                lodgings.add(doc.toObject(Lodgings.class));
            }
            return lodgings;
        }
        return null;
    }
  
    public Lodgings getLodgingById(String id) throws ExecutionException, InterruptedException {
        DocumentReference doc = db.collection("Lodgings").document(id);
        ApiFuture<DocumentSnapshot> future = doc.get();
        return future.get().toObject(Lodgings.class);
    }
    public ArrayList<Lodgings> getLodgingsByCityState(String cityState, String type) throws ExecutionException, InterruptedException {
        CollectionReference lodgingsCollection = db.collection("Lodgings");
        Query query = lodgingsCollection.whereEqualTo("cityState", cityState).whereEqualTo("type", type);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if (!documents.isEmpty()) {
            System.out.println("All good with get lodgings by cityState");
            ArrayList<Lodgings> lodgings = new ArrayList<>();
            for (QueryDocumentSnapshot document : documents) {
                lodgings.add(document.toObject(Lodgings.class));
                System.out.println("Document data: " + document.getData());
            }

            return lodgings;

        }
        System.out.println("Get lodging by cityState NOT working!");
        return null; // Lodging not found
    }
    public Lodgings getLodgingByRef(DocumentReference ref) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = ref.get();
        return future.get().toObject(Lodgings.class);
    }
}

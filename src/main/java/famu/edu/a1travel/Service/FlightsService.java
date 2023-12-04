package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import famu.edu.a1travel.Model.Flights;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class FlightsService {
    private final Firestore db;
    public FlightsService(Firestore db){
        this.db = db;
    }
    public Flights getFlightById(String id) throws ExecutionException, InterruptedException {
        DocumentReference ref = db.collection("Flights").document(id);
        ApiFuture<DocumentSnapshot> future = ref.get();
        return future.get().toObject(Flights.class);
    }
    public Flights getFlightByRef(DocumentReference ref) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = ref.get();
        return future.get().toObject(Flights.class);
    }
}

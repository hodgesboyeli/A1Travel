package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.Events;
import famu.edu.a1travel.Model.Flights;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
@Service
public class FlightsService {
    private Firestore db = FirestoreClient.getFirestore();
    public String createFlight(Flights flight) throws ExecutionException, InterruptedException {
        String flightId = null;

        ApiFuture<DocumentReference> future = db.collection("Flights").add(flight);
        DocumentReference eventRef = future.get();
        flightId = eventRef.getId();

        return flightId;
    }
}

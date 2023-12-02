package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.Trips;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

//get all, get all by id, etc.
@Service
public class TripsService {
    private Firestore db = FirestoreClient.getFirestore();
    public String createTrip(Trips trip) throws ExecutionException, InterruptedException {
        String tripId = null;

        ApiFuture<DocumentReference> future = db.collection("Trips").add(trip);
        DocumentReference tripRef = future.get();
        tripId = tripRef.getId();

        return tripId;
    }
}

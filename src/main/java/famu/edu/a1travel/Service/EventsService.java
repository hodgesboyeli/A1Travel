package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.Events;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class EventsService {
    private Firestore db = FirestoreClient.getFirestore();
    public String createEvent(Events event) throws ExecutionException, InterruptedException {
        String eventId = null;

        ApiFuture<DocumentReference> future = db.collection("Events").add(event);
        DocumentReference eventRef = future.get();
        eventId = eventRef.getId();

        return eventId;
    }
}

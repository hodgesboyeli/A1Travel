package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import famu.edu.a1travel.Model.Events;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class EventsService {
    private final Firestore db;
    public EventsService(Firestore db){
        this.db = db;
    }
    public String createEvent(Events event) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentReference> future = db.collection("Events").add(event);
        DocumentReference eventRef = future.get();
        return eventRef.getId();
    }
}

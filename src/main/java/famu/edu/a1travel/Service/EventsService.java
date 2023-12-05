package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.Events;
import famu.edu.a1travel.Model.Flights;
import famu.edu.a1travel.Model.Lodgings;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public Events getEventsByCityState(String cityState) throws ExecutionException, InterruptedException {
        CollectionReference eventsCollection = db.collection("Events");
        Query query = eventsCollection.whereEqualTo("cityState", cityState);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if (!documents.isEmpty()) {
            System.out.println("All good with get events by cityState");
            return documents.get(0).toObject(Events.class);
        }
        System.out.println("Get events by cityState NOT working!");
        return null;
    }
}

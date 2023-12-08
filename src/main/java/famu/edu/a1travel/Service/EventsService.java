package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.Events;
import famu.edu.a1travel.Model.Flights;
import famu.edu.a1travel.Model.Lodgings;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public ArrayList<Events> getEventsByCityState(String cityState) throws ExecutionException, InterruptedException {
        Query eventsCollection = db.collection("Events");
        if (!cityState.isEmpty()) {
            eventsCollection = eventsCollection.whereGreaterThanOrEqualTo("cityState", cityState)
                    .whereLessThan("cityState", cityState + "\uf8ff");
        }
        ApiFuture<QuerySnapshot> future = eventsCollection.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        //returns empty array if no docs in documents
        ArrayList<Events> events = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            events.add(doc.toObject(Events.class));
        }
        return events;
    }
}

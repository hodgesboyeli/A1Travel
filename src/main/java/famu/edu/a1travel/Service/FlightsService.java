package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.Flights;
import famu.edu.a1travel.Model.Lodgings;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public Flights getFlightsByArriveLocation(String arriveLocation) throws ExecutionException, InterruptedException {
        Query flightsCollection = db.collection("Flights");
        if (!arriveLocation.isEmpty()) {
            flightsCollection = flightsCollection.whereGreaterThanOrEqualTo("arriveLocation", arriveLocation)
                    .whereLessThan("arriveLocation", arriveLocation + "\uf8ff");
        }
        ApiFuture<QuerySnapshot> future = flightsCollection.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if (!documents.isEmpty()) {
            System.out.println("All good with get flights by arriveLocation");
            return documents.get(0).toObject(Flights.class);
        }
        System.out.println("Get flights by arriveLocation NOT working!");
        return null;
    }

    /*
    public ArrayList<Users> getUsers(String searchField, String value) throws ExecutionException, InterruptedException {
        Query query = db.collection("Users");
        if (!searchField.isEmpty() && !value.isEmpty()) {
            query = query.whereGreaterThanOrEqualTo(searchField, value)
                    .whereLessThan(searchField, value + "\uf8ff");
        }
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Users> users = !documents.isEmpty() ? new ArrayList<>() : null;

        for (QueryDocumentSnapshot doc : documents)
            users.add(doc.toObject(Users.class));

        return users;
    }
     */

    public String createFlight(Flights flight) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentReference> future = db.collection("Flights").add(flight);
        DocumentReference eventRef = future.get();
        return eventRef.getId();
    }
}

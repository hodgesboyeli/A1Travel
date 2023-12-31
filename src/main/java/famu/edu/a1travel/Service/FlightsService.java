package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.Flights;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public ArrayList<Flights> getFlights() throws ExecutionException, InterruptedException {
        CollectionReference flightsCollection = db.collection("Flights");
        Query query = flightsCollection;
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if (!documents.isEmpty()) {
            ArrayList<Flights> flights = new ArrayList<>();
            for (QueryDocumentSnapshot doc : documents)
            {
                flights.add(doc.toObject(Flights.class));
            }
            return flights;
        }
        return null;
    }

    public List<String> getFlightLocations() throws ExecutionException, InterruptedException {
        CollectionReference flightsCollection = db.collection("Flights");
        Query query = flightsCollection;
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if (!documents.isEmpty()) {
            List<String> locationsList = new ArrayList<>();
            for (QueryDocumentSnapshot doc : documents) {
                Flights flight = doc.toObject(Flights.class);
                addToUniqueList(locationsList, flight.getArriveLocation());
                addToUniqueList(locationsList, flight.getDepartLocation());
            }
            return locationsList;
        }
        return null;
    }

    private void addToUniqueList(List<String> list, String value) {
        if (value != null && !list.contains(value)) {
            list.add(value);
        }
    }


    public ArrayList<Flights> getFlightsByArriveLocation(String arriveLocation) throws ExecutionException, InterruptedException {
        CollectionReference flightsCollection = db.collection("Flights");
        Query query = flightsCollection.whereEqualTo("arriveLocation", arriveLocation);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if (!documents.isEmpty()) {
            ArrayList<Flights> flights = new ArrayList<>();
            for (QueryDocumentSnapshot doc : documents)
            {
                flights.add(doc.toObject(Flights.class));
            }
            System.out.println("All good with get flights by arriveLocation");
            return flights;
        }
        System.out.println("Get flights by arriveLocation NOT working!");
        return null;
    }

    public ArrayList<Flights> getFlightsFromArriveLocation(String arriveLocation) throws ExecutionException, InterruptedException {
        CollectionReference flightsCollection = db.collection("Flights");
        Query query = flightsCollection.whereEqualTo("departLocation", arriveLocation);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if (!documents.isEmpty()) {
            ArrayList<Flights> flights = new ArrayList<>();
            for (QueryDocumentSnapshot doc : documents)
            {
                flights.add(doc.toObject(Flights.class));
            }
            System.out.println("All good with get flights from arriveLocation");
            return flights;
        }
        System.out.println("Get flights from arriveLocation NOT working!");
        return null;
    }

    public String createFlight(Flights flight) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentReference> future = db.collection("Flights").add(flight);
        DocumentReference eventRef = future.get();
        return eventRef.getId();
    }
}

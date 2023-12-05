package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

//get all, get all by id, etc.
@Service
public class TripsService {
    private final Firestore db;
    private final UsersService usersService;
    public TripsService(Firestore db) {
        usersService = new UsersService(db);
        this.db = db;
    }

    public String createTrip(RestTrips trip) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentReference> future = db.collection("Trips").add(trip);
        DocumentReference tripRef = future.get();
        return tripRef.getId();
    }

    public Trips getTrip(DocumentSnapshot doc) throws ExecutionException, InterruptedException {
        // Get the User
        DocumentReference userRef = (DocumentReference) doc.get("userID");
        Users user = null;
        if (userRef != null){
            user = userRef.get().get().toObject(Users.class);
        }

        // Get the Car
        DocumentReference carRef = (DocumentReference) doc.get("carID");
        Cars car = null;
        if (carRef != null){
            car = carRef.get().get().toObject(Cars.class);
        }

        // Get the Events
        ArrayList<Events> events = new ArrayList<>();
        List<DocumentReference> eventRefs = (List<DocumentReference>) doc.get("eventID");
        if (eventRefs != null) {
            for (DocumentReference ref : eventRefs) {
                events.add(ref.get().get().toObject(Events.class));
            }
        }

        // Get the Flights
        ArrayList<Flights> flights = new ArrayList<>();
        List<DocumentReference> flightRefs = (List<DocumentReference>) doc.get("flightID");
        if (flightRefs != null) {
            for (DocumentReference ref : flightRefs) {
                flights.add(ref.get().get().toObject(Flights.class));
            }
        }

        // Get the Lodging
        DocumentReference lodgingRef = (DocumentReference) doc.get("lodgingID");
        Lodgings lodging = null;
        if (lodgingRef != null){
            lodging = lodgingRef.get().get().toObject(Lodgings.class);
        }

        // Get the Trains
        ArrayList<Trains> trains = new ArrayList<>();
        List<DocumentReference> trainRefs = (List<DocumentReference>) doc.get("trainID");
        if (trainRefs != null) {
            for (DocumentReference ref : trainRefs) {
                trains.add(ref.get().get().toObject(Trains.class));
            }
        }

        // Create and return the Trips object
        return new Trips(doc.getId(), doc.getDouble("budget"), doc.getDouble("cartTotal"), doc.getString("destination"), user, car, lodging, events, flights, trains);
    }

    public ArrayList<Trips> getTrips() throws ExecutionException, InterruptedException {
        Query query = db.collection("Trips");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Trips> trips = new ArrayList<>();
        for(QueryDocumentSnapshot doc : documents)
        {
            trips.add(getTrip(doc));
        }
        return trips;
    }

    public ArrayList<Trips> getTripsByUser(String userId) throws ExecutionException, InterruptedException {
        Query query = db.collection("Trips");

        // Assuming "userID" is a string field in your Trips documents
        query = query.whereEqualTo("userID", userId);

        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        // Process the documents and convert them to Trips objects
        ArrayList<Trips> trips = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            trips.add(getTrip(doc));
        }
        return trips;
    }
}

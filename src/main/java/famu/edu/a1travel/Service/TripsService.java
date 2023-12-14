package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.*;
import org.springframework.cache.annotation.Cacheable;
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

    private Trips getTrip(DocumentSnapshot doc) throws ExecutionException, InterruptedException {

        // Use batch retrieval for subdocuments
        List<ApiFuture<DocumentSnapshot>> futures = new ArrayList<>();
        DocumentReference userRef = (DocumentReference) doc.get("userID");
        DocumentReference carRef = (DocumentReference) doc.get("carID");
        DocumentReference lodgingRef = (DocumentReference) doc.get("lodgingID");
        List<DocumentReference> eventRefs = (List<DocumentReference>) doc.get("eventID");
        List<DocumentReference> flightRefs = (List<DocumentReference>) doc.get("flightID");
        List<DocumentReference> trainRefs = (List<DocumentReference>) doc.get("trainID");

        if (userRef != null) futures.add(userRef.get());
        if (carRef != null) futures.add(carRef.get());
        if (lodgingRef != null) futures.add(lodgingRef.get());
        for (DocumentReference ref : eventRefs) futures.add(ref.get());
        for (DocumentReference ref : flightRefs) futures.add(ref.get());
        for (DocumentReference ref : trainRefs) futures.add(ref.get());

        // Process the futures
        Users user = null;
        Cars car = null;
        Lodgings lodging = null;
        ArrayList<Events> events = new ArrayList<>();
        ArrayList<Flights> flights = new ArrayList<>();
        ArrayList<Trains> trains = new ArrayList<>();

        for (ApiFuture<DocumentSnapshot> future : futures) {
            DocumentSnapshot subDoc = future.get();
            if (subDoc.getReference().equals(userRef)) {
                user = subDoc.toObject(Users.class);
            } else if (subDoc.getReference().equals(carRef)) {
                car = subDoc.toObject(Cars.class);
            } else if (subDoc.getReference().equals(lodgingRef)) {
                lodging = subDoc.toObject(Lodgings.class);
            } else if (eventRefs.contains(subDoc.getReference())) {
                events.add(subDoc.toObject(Events.class));
            } else if (flightRefs.contains(subDoc.getReference())) {
                flights.add(subDoc.toObject(Flights.class));
            } else if (trainRefs.contains(subDoc.getReference())) {
                trains.add(subDoc.toObject(Trains.class));
            }
        }

        // Create and return the Trips object
        return new Trips(doc.getId(), doc.getDouble("budget"), doc.getDouble("cartTotal"), doc.getString("destination"), user, car, lodging, events, flights, trains);
    }

    public String createTrip(Trips trip) throws ExecutionException, InterruptedException {
        //create new thing
        RestTrips restTrip = new RestTrips(
                trip.getTripId(),trip.getBudget(),trip.getCartTotal(),trip.getDestination(),
                null,null,null,new ArrayList<>(),new ArrayList<>(),new ArrayList<>());

        ArrayList<String> eventIds = new ArrayList<>();
        ArrayList<String> flightIds = new ArrayList<>();
        ArrayList<String> trainIds = new ArrayList<>();
        //set fields using string ids
        //user id
        if (trip.getUserID() != null){

        String userId = trip.getUserID().getUserId();
        if (userId != null) {
            restTrip.setUserID(userId);
        }
        }
        //car id
        if (trip.getCarID() != null){
            String carId = trip.getCarID().getCarId();
            if (carId != null) {
                restTrip.setCarID(carId);
            }
        }
        //lodgings id
        if (trip.getLodgingID() != null){

        String lodgingId = trip.getLodgingID().getLodgingId();
        if (lodgingId != null){
            restTrip.setLodgingID(lodgingId);
        }
        }
        //event strings
        if (trip.getEventID() != null){

        for (Events e : trip.getEventID()) {
            if (e.getEventId() != null) {
                eventIds.add(e.getEventId());
            }
        }
        restTrip.setEventID(eventIds);
        }
        //flight strings
        if (trip.getFlightID() != null){

        for (Flights e : trip.getFlightID()) {
            if (e.getFlightId() != null) {
                flightIds.add(e.getFlightId());
            }
        }
        restTrip.setFlightID(flightIds);
        }

        //train strings
        if (trip.getTrainID() != null){

        for (Trains e : trip.getTrainID()) {
            if (e.getTrainId() != null) {
                trainIds.add(e.getTrainId());
            }
        }
        restTrip.setTrainID(trainIds);
        }

        ApiFuture<DocumentReference> future = db.collection("Trips").add(restTrip);
        DocumentReference tripRef = future.get();
        return tripRef.getId();
    }
    public ArrayList<Trips> getTrips(String user) throws ExecutionException, InterruptedException {
        Query query = db.collection("Trips");
        if (!user.isEmpty()){
            DocumentReference doc = usersService.getUserDocByEmail(user);
            query = query.whereEqualTo("userID",doc);
        }
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Trips> trips = new ArrayList<>();
        for(QueryDocumentSnapshot doc : documents)
        {
            trips.add(getTrip(doc));
        }
        return trips;
    }

    public ArrayList<Trips> getTripsByDestination(String destination) throws ExecutionException, InterruptedException {
        Query query = db.collection("Trips").whereEqualTo("destination", destination);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Trips> trips = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            trips.add(getTrip(doc));
        }
        return trips;
    }

    public Double getTripAvgBudget() throws ExecutionException, InterruptedException {
        Query query = db.collection("Trips");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        double totalBudget = 0.0;
        int numTrips = 0;

        for (QueryDocumentSnapshot doc : documents) {
            totalBudget += doc.getDouble("budget");
            numTrips++;
        }

        if (numTrips > 0) {
            return totalBudget / numTrips;
        } else {
            return 0.0; // Handle the case where there are no trips to avoid division by zero
        }
    }

    public Double getTripRevenue() throws ExecutionException, InterruptedException {
        Query query = db.collection("Trips");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        double totalRevenue = 0.0;

        for (QueryDocumentSnapshot doc : documents) {
            totalRevenue += doc.getDouble("cartTotal");
        }

        return totalRevenue;
    }

    public int getTripsWithinBudget() throws ExecutionException, InterruptedException {
        Query query = db.collection("Trips");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        int count = 0;

        for (QueryDocumentSnapshot doc : documents) {

            if (doc.getDouble("cartTotal") != null && doc.getDouble("budget") != null && doc.getDouble("cartTotal") <= doc.getDouble("budget")) {
                count++;
            }
        }

        return count;
    }

    public int getTripsOverBudget() throws ExecutionException, InterruptedException {
        Query query = db.collection("Trips");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        int count = 0;

        for (QueryDocumentSnapshot doc : documents) {

            if (doc.getDouble("cartTotal") != null && doc.getDouble("budget") != null && doc.getDouble("cartTotal") > doc.getDouble("budget")) {
                count++;
            }
        }

        return count;
    }
}

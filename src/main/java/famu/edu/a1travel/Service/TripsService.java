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

    UsersService usersService;
    CarsService carsService;

    LodgingsService lodgingsService;


    private final Firestore db;
    public TripsService(Firestore db, UsersService usersService, CarsService carsService, LodgingsService lodgingsService) {
        this.db = db;
        this.usersService = usersService;
        this.carsService = carsService;
        this.lodgingsService = lodgingsService;
    }


    public String createTrip(RestTrips trip) throws ExecutionException, InterruptedException {
        String tripId = null;

        ApiFuture<DocumentReference> future = db.collection("Trips").add(trip);
        DocumentReference tripRef = future.get();
        tripId = tripRef.getId();

        return tripId;
    }

    private Trips getTrip(DocumentSnapshot doc) throws ExecutionException, InterruptedException {


        DocumentReference recDoc = (DocumentReference) doc.get("userID");

        Users user = usersService.getUserById(recDoc.getId());

        DocumentReference carDoc = (DocumentReference) doc.get("carID");

        Cars car = carsService.getCarById(carDoc.getId());

        ArrayList<Events> events = new ArrayList<>();
        ArrayList<DocumentReference> eventRefs = (ArrayList<DocumentReference>) doc.get("eventID");
        for(DocumentReference ref : eventRefs)
        {
            ApiFuture<DocumentSnapshot> eventQuery = ref.get();
            DocumentSnapshot eventDoc = eventQuery.get();
            Events event = eventDoc.toObject(Events.class);
            events.add(event);
        }

        ArrayList<Flights> flights = new ArrayList<>();
        ArrayList<DocumentReference> flightRefs = (ArrayList<DocumentReference>) doc.get("flightID");
        for(DocumentReference ref : flightRefs)
        {
            ApiFuture<DocumentSnapshot> flightQuery = ref.get();
            DocumentSnapshot flightDoc = flightQuery.get();
            Flights flight = flightDoc.toObject(Flights.class);
            flights.add(flight);
        }

        DocumentReference lodgingDoc = (DocumentReference) doc.get("lodgingID");

        Lodgings lodging = lodgingsService.getLodgingById(lodgingDoc.getId());

        ArrayList<Trains> trains = new ArrayList<>();
        ArrayList<DocumentReference> trainRefs = (ArrayList<DocumentReference>) doc.get("trainID");
        for(DocumentReference ref : trainRefs)
        {
            ApiFuture<DocumentSnapshot> trainQuery = ref.get();
            DocumentSnapshot trainDoc = trainQuery.get();
            Trains train = trainDoc.toObject(Trains.class);
            trains.add(train);
        }

        return new Trips(doc.getId(),
                         doc.getDouble("budget"),
                         doc.getDouble("cartTotal"),
                         doc.getString("destination"),
                         user,
                         car,
                         lodging,
                         (ArrayList<Events>) doc.get("eventID"),
                         (ArrayList<Flights>) doc.get("flightID"),
                         (ArrayList<Trains>) doc.get("trainID"));
    }


    public ArrayList<Trips> getTrips() throws ExecutionException, InterruptedException {


        Query query = db.collection("Trips");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Trips> trips = (documents.size() > 0) ?  new ArrayList<>() : null;

        for(QueryDocumentSnapshot doc : documents)
        {

            trips.add(getTrip(doc));
        }

        return trips;
    }


}

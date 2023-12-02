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

    private final Firestore db;
    public TripsService(Firestore db){
        this.db = db;
        this.usersService = new UsersService(db);
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

        CarsService carsService = new CarsService();
        Cars car = carsService.getCarById(doc.getString("carID"));

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

        ArrayList<Lodgings> lodgings = new ArrayList<>();
        ArrayList<DocumentReference> lodgingRefs = (ArrayList<DocumentReference>) doc.get("lodgingID");
        for(DocumentReference ref : lodgingRefs)
        {
            ApiFuture<DocumentSnapshot> lodgingQuery = ref.get();
            DocumentSnapshot lodgingDoc = lodgingQuery.get();
            Lodgings lodging = lodgingDoc.toObject(Lodgings.class);
            lodgings.add(lodging);
        }

        ArrayList<Trains> trains = new ArrayList<>();
        ArrayList<DocumentReference> trainRefs = (ArrayList<DocumentReference>) doc.get("trainID");
        for(DocumentReference ref : trainRefs)
        {
            ApiFuture<DocumentSnapshot> trainQuery = ref.get();
            DocumentSnapshot trainDoc = trainQuery.get();
            Trains train = trainDoc.toObject(Trains.class);
            trains.add(train);
        }

        return new Trips(doc.getId(), doc.getDouble("budget"), doc.getDouble("cartTotal"),
                        doc.getString("destination"), user, car,
                (ArrayList<Events>) doc.get("eventID"), (ArrayList<Flights>) doc.get("flightID"), (ArrayList<Lodgings>) doc.get("lodgingID"),
                (ArrayList<Trains>) doc.get("trainID"));
    }


    public ArrayList<Trips> getTrips() throws ExecutionException, InterruptedException {


        Query query = db.collection("Trips");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Trips> posts = (documents.size() > 0) ?  new ArrayList<>() : null;

        for(QueryDocumentSnapshot doc : documents)
        {

            posts.add(getTrip(doc));
        }

        return posts;
    }


}

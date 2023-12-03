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

        //System.out.println("Fetched user: " + user);

        //DocumentReference carDoc = (DocumentReference) doc.get("carID");
        //Cars car = carsService.getCarById(carDoc.getId());

        ArrayList<Events> events = getOptionalList(doc, "eventID", Events.class);
        ArrayList<Flights> flights = getOptionalList(doc, "flightID", Flights.class);
        Cars car = getOptionalObject(doc, "carID", Cars.class);
        Lodgings lodging = getOptionalObject(doc, "lodgingID", Lodgings.class);
        ArrayList<Trains> trains = getOptionalList(doc, "trainID", Trains.class);

        return new Trips(
                doc.getId(),
                doc.getDouble("budget"),
                doc.getDouble("cartTotal"),
                doc.getString("destination"),
                user,
                car,
                lodging,
                events,
                flights,
                trains
        );
    }

    // Generic method to fetch a list of related objects from DocumentReferences
    private <T> ArrayList<T> getOptionalList(DocumentSnapshot doc, String fieldName, Class<T> objectClass)
            throws ExecutionException, InterruptedException {
        ArrayList<T> objects = new ArrayList<>();
        if (doc.contains(fieldName)) {
            ArrayList<DocumentReference> refs = (ArrayList<DocumentReference>) doc.get(fieldName);

            // Log statements for debugging
            //System.out.println("Fetching optional list for field: " + fieldName);
            //System.out.println("References: " + refs);

            for (DocumentReference ref : refs) {
                ApiFuture<DocumentSnapshot> query = ref.get();
                DocumentSnapshot objectDoc = query.get();
                T object = objectDoc.toObject(objectClass);

                // Log statements for debugging
                //System.out.println("Fetched optional object: " + object);

                objects.add(object);
            }
        }
        return objects;
    }

    private <T> T getOptionalObject(DocumentSnapshot doc, String fieldName, Class<T> objectClass)
            throws ExecutionException, InterruptedException {
        if (doc.contains(fieldName)) {
            DocumentReference ref = (DocumentReference) doc.get(fieldName);

            // Log statements for debugging
            //System.out.println("Fetching optional object for field: " + fieldName);
            //System.out.println("Reference: " + ref);

            ApiFuture<DocumentSnapshot> query = ref.get();
            DocumentSnapshot objectDoc = query.get();
            T object = objectDoc.toObject(objectClass);

            // Log statements for debugging
            //System.out.println("Fetched optional object: " + object);

            return object;
        }
        return null;
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

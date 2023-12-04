package famu.edu.a1travel.Model;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class RestTrips extends BaseTrips {
    private DocumentReference userID;
    private DocumentReference carID;
    private ArrayList<DocumentReference> eventID;
    private ArrayList<DocumentReference> flightID;
    private ArrayList<DocumentReference> lodgingID;
    private ArrayList<DocumentReference> trainID;

    public RestTrips(String tripId, Double budget, Double cartTotal, String destination, DocumentReference userID, DocumentReference carID, ArrayList<DocumentReference> eventID, ArrayList<DocumentReference> flightID, ArrayList<DocumentReference> lodgingID, ArrayList<DocumentReference> trainID) {
        super(tripId, budget, cartTotal, destination);
        this.userID = userID;
        this.carID = carID;
        this.eventID = eventID;
        this.flightID = flightID;
        this.lodgingID = lodgingID;
        this.trainID = trainID;
    }

    public void setUserID(String user) {
        Firestore db = FirestoreClient.getFirestore();
        this.userID = db.collection("Users").document(user);
    }

    public void setCarID(String car) {
        Firestore db = FirestoreClient.getFirestore();
        this.carID = db.collection("Cars").document(car);
    }

    public void setEventID(ArrayList<String> eventID) {
        Firestore db = FirestoreClient.getFirestore();
        this.eventID = new ArrayList<>();
        for(String cat : eventID) {
            this.eventID.add(db.collection("Events").document(cat));
        }
    }

    public void setFlightID(ArrayList<String> flightID) {
        Firestore db = FirestoreClient.getFirestore();
        this.flightID = new ArrayList<>();
        for(String cat : flightID) {
            this.flightID.add(db.collection("Flights").document(cat));
        }
    }

    public void setLodgingID(ArrayList<String> lodgingID) {
        Firestore db = FirestoreClient.getFirestore();
        this.lodgingID = new ArrayList<>();
        for(String cat : lodgingID) {
            this.lodgingID.add(db.collection("Lodgings").document(cat));
        }
    }

    public void setTrainID(ArrayList<String> trainID) {
        Firestore db = FirestoreClient.getFirestore();
        this.trainID = new ArrayList<>();
        for(String cat : trainID) {
            this.trainID.add(db.collection("Trains").document(cat));
        }
    }
}

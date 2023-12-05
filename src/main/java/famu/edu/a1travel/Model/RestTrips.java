package famu.edu.a1travel.Model;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class RestTrips extends BaseTrips {
    private DocumentReference userID;
    private DocumentReference carID;
    private DocumentReference lodgingID;
    private ArrayList<DocumentReference> eventID;
    private ArrayList<DocumentReference> flightID;
    private ArrayList<DocumentReference> trainID;

    public RestTrips(@Nullable String tripId, Double budget, Double cartTotal, String destination, DocumentReference userID, DocumentReference carID, DocumentReference lodgingID, ArrayList<DocumentReference> eventID, ArrayList<DocumentReference> flightID, ArrayList<DocumentReference> trainID) {
        super(tripId, budget, cartTotal, destination);
        this.userID = userID;
        this.carID = carID;
        this.lodgingID = lodgingID;
        this.eventID = eventID;
        this.flightID = flightID;
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

    public void setLodgingID(String lodgingID) {
        Firestore db = FirestoreClient.getFirestore();
        this.lodgingID = db.collection("Lodgings").document(lodgingID);
    }

    public void setTrainID(ArrayList<String> trainID) {
        Firestore db = FirestoreClient.getFirestore();
        this.trainID = new ArrayList<>();
        for(String cat : trainID) {
            this.trainID.add(db.collection("Trains").document(cat));
        }
    }
}

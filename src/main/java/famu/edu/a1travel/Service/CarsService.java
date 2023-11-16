package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.Cars;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
@Service
public class CarsService {
    private Firestore db = FirestoreClient.getFirestore();
    public String createCar(Cars car) throws ExecutionException, InterruptedException {
        String carId = null;

        ApiFuture<DocumentReference> future = db.collection("Cars").add(car);
        DocumentReference eventRef = future.get();
        carId = eventRef.getId();

        return carId;
    }
}

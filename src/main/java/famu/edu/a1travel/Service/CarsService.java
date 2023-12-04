package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import famu.edu.a1travel.Model.Cars;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
@Service
public class CarsService {
    private final Firestore db;
    public CarsService(Firestore db){
        this.db = db;
    }
    public String createCar(Cars car) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentReference> future = db.collection("Cars").add(car);
        DocumentReference eventRef = future.get();
        return eventRef.getId();
    }
}

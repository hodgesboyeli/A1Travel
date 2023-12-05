package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
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
    public Cars getCarByRef(DocumentReference ref) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = ref.get();
        return future.get().toObject(Cars.class);
    }
    public Cars getCarById(String id) throws ExecutionException, InterruptedException {
        DocumentReference doc = db.collection("Cars").document(id);
        ApiFuture<DocumentSnapshot> future = doc.get();
        return future.get().toObject(Cars.class);
    }
    public String createCar(Cars car) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentReference> future = db.collection("Cars").add(car);
        DocumentReference eventRef = future.get();
        return eventRef.getId();
    }
}

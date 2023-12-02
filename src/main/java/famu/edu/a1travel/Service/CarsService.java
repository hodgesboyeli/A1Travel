package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.Cars;
import famu.edu.a1travel.Model.Users;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class CarsService {

    private final Firestore db = FirestoreClient.getFirestore();
    public Cars getCarById(String id) throws ExecutionException, InterruptedException {
        DocumentReference doc = db.collection("Cars").document(id);
        ApiFuture<DocumentSnapshot> future = doc.get();
        return future.get().toObject(Cars.class);
    }
}

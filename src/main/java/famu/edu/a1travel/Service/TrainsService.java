package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.Flights;
import famu.edu.a1travel.Model.Trains;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
@Service
public class TrainsService {
    private Firestore db = FirestoreClient.getFirestore();
    public String createTrain(Trains train) throws ExecutionException, InterruptedException {
        String trainId = null;

        ApiFuture<DocumentReference> future = db.collection("Trains").add(train);
        DocumentReference eventRef = future.get();
        trainId = eventRef.getId();

        return trainId;
    }

}

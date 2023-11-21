package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.Destinations;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class DestinationsService {
    private final Firestore db;
    public DestinationsService(Firestore db){
        this.db = db;
    }

    public ArrayList<Destinations> getDestinations(int limit) throws ExecutionException, InterruptedException {
        Query query = db.collection("Destinations");
        if (limit > 0)
            query = query.limit(limit);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Destinations> destinations = new ArrayList<>();

        for (QueryDocumentSnapshot doc : documents)
            destinations.add(doc.toObject(Destinations.class));

        return destinations;
    }

    public Destinations getDestinationById(String id) throws ExecutionException, InterruptedException {
        DocumentReference doc = db.collection("Destinations").document(id);
        ApiFuture<DocumentSnapshot> future = doc.get();
        return future.get().toObject(Destinations.class);
    }
}

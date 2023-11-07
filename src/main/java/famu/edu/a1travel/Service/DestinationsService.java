package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.Destinations;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class DestinationsService {
    private final Firestore db = FirestoreClient.getFirestore();

    public ArrayList<Destinations> getDestinations() throws ExecutionException, InterruptedException {
        Query query = db.collection("Destinations");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Destinations> destinations = (documents.size() > 0) ? new ArrayList<>() : null;

        for (QueryDocumentSnapshot doc : documents)
            destinations.add(doc.toObject(Destinations.class));

        return destinations;
    }

    public Destinations getDestinationById(String id) throws ExecutionException, InterruptedException {
        Destinations destinations = null;

        DocumentReference doc = db.collection("Destinations").document(id);
        ApiFuture<DocumentSnapshot> future = doc.get();
        destinations = future.get().toObject(Destinations.class);

        return destinations;
    }
}

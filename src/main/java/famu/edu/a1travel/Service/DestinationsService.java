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
    private final Firestore db;
    public DestinationsService(Firestore db){
        this.db = db;
    }
    private boolean doesFieldExist(String field) throws ExecutionException, InterruptedException {
        //field can not be empty
        if (field.isEmpty())
            return false;
        //get reference
        CollectionReference collectionReference = db.collection("Destinations");
        ApiFuture<QuerySnapshot> future = collectionReference.limit(1).get();
        QuerySnapshot querySnapshot = future.get();

        //return if no document
        if (querySnapshot.isEmpty()){
            return false;
        }
        //
        DocumentSnapshot docSnap = querySnapshot.getDocuments().get(0);
        return docSnap.contains(field);
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
        Destinations destinations = null;

        DocumentReference doc = db.collection("Destinations").document(id);
        ApiFuture<DocumentSnapshot> future = doc.get();
        destinations = future.get().toObject(Destinations.class);

        return destinations;
    }
}

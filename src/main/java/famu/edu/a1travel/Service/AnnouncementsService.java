package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.RestAnnouncements;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class AnnouncementsService {
    private final Firestore db;
    public AnnouncementsService(Firestore db){
        this.db = db;
    }
    public ArrayList<RestAnnouncements> getAnnouncements() throws ExecutionException, InterruptedException {

        Query query = db.collection("Announcements");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<RestAnnouncements> destinations = (documents.size() > 0) ? new ArrayList<>() : null;

        for (QueryDocumentSnapshot doc : documents)
            destinations.add(doc.toObject(RestAnnouncements.class));

        return destinations;
    }
}

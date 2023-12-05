package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.RestAnnouncements;
import famu.edu.a1travel.Model.Users;
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
    public RestAnnouncements getAnnouncements(QueryDocumentSnapshot doc) throws ExecutionException, InterruptedException {
        UsersService usersService = new UsersService(db);

        DocumentReference admin = (DocumentReference) doc.get("userID");

        return new RestAnnouncements(
                doc.getString("body"),
                doc.getString("header"),
                doc.getTimestamp("timestamp"),
                doc.getString("type"),
                admin
        );
    }

    public ArrayList<RestAnnouncements> getAnnouncements() throws ExecutionException, InterruptedException {
        Query query = db.collection("Announcements");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<RestAnnouncements> announcements = new ArrayList<>();

        for (QueryDocumentSnapshot doc : documents) {
            announcements.add(getAnnouncements(doc));
        }

        return announcements;
    }

}

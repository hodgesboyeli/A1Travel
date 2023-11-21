package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.RestAnnouncements;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class AnnouncementsService {
    private final Firestore db;
    public AnnouncementsService(Firestore db){
        this.db = db;
    }
    public String createAnnouncement(RestAnnouncements announcement) throws ExecutionException, InterruptedException{
        String announcementID = null;

        ApiFuture<DocumentReference> future = db.collection("Announcements").add(announcement);
        DocumentReference announcementRef = future.get();
        announcementID = announcementRef.getId();

        return announcementID;
    }
}

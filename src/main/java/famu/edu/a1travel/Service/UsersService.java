package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.Users;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UsersService {
    private final Firestore db = FirestoreClient.getFirestore();

    public ArrayList<Users> getUsers() throws ExecutionException, InterruptedException {
        Query query = db.collection("Users");
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Users> users = (documents.size() > 0) ? new ArrayList<>() : null;

        for (QueryDocumentSnapshot doc : documents)
            users.add(doc.toObject(Users.class));

        return users;


    }

    public Users getUserById(String id) throws ExecutionException, InterruptedException {
        Users user = null;

        DocumentReference doc = db.collection("Users").document(id);
        ApiFuture<DocumentSnapshot> future = doc.get();
        user = future.get().toObject(Users.class);

        return user;
    }
}

package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.Users;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class UsersService {
    private final Firestore db;

    public UsersService(Firestore db){
        this.db = db;
    }

    public ArrayList<Users> getUsers(String searchField, String value) throws ExecutionException, InterruptedException {
        Query query = db.collection("Users");
        if (!searchField.isEmpty() && !value.isEmpty()) {
            query = query.whereGreaterThanOrEqualTo(searchField, value)
                    .whereLessThan(searchField, value + "\uf8ff");
        }
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Users> users = !documents.isEmpty() ? new ArrayList<>() : null;

        for (QueryDocumentSnapshot doc : documents)
            users.add(doc.toObject(Users.class));

        return users;
    }

    public Users getUserById(String id) throws ExecutionException, InterruptedException {
        DocumentReference doc = db.collection("Users").document(id);
        ApiFuture<DocumentSnapshot> future = doc.get();
        return future.get().toObject(Users.class);
    }

    public String createUser(Users user) throws ExecutionException, InterruptedException {
        user.setCreatedAt(Timestamp.now());
        //user.setLastLogin(Timestamp.now());

        ApiFuture<DocumentReference> future = db.collection("Users").add(user);
        DocumentReference userRef = future.get();

        return userRef.getId();
    }

    public void updateUser(String id, Map<String, String> updateValues) {
        String[] allowed = {"email", "firstName", "lastName"};
        List<String> list = Arrays.asList(allowed);
        Map<String, Object> formattedValues = new HashMap<>();

        for (Map.Entry<String, String> entry : updateValues.entrySet()) {
            String key = entry.getKey();
            if (list.contains(key))
                formattedValues.put(key, entry.getValue());
        }

        DocumentReference userDoc = db.collection("Users").document(id);
        userDoc.update(formattedValues);
    }

    public void deleteUser(String userId) {
        DocumentReference userDoc = db.collection("Users").document(userId);
        userDoc.delete();
    }

    public Users getUserByUid(String uid) throws ExecutionException, InterruptedException {
        DocumentReference doc = db.collection("Users").document(uid);
        ApiFuture<DocumentSnapshot> future = doc.get();

        return future.get().toObject(Users.class);
    }

    public Users getUserByEmail(String email) throws ExecutionException, InterruptedException {
        CollectionReference usersCollection = db.collection("Users");

        Query query = usersCollection.whereEqualTo("email", email);
        ApiFuture<QuerySnapshot> future = query.get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        if (!documents.isEmpty()) {
            // Assuming email is unique, there should be at most one user
            QueryDocumentSnapshot document = documents.get(0);
            return document.toObject(Users.class);
        } else {
            return null; // User not found
        }
    }
}

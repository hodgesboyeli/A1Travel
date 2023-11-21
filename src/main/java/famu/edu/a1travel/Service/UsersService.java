package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.Users;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class UsersService {
    private final Firestore db = FirestoreClient.getFirestore();
    private boolean doesFieldExist(String field) throws ExecutionException, InterruptedException {
        //field can not be empty
        if (field.isEmpty())
            return false;
        //get reference
        CollectionReference collectionReference = db.collection("Users");
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

    public ArrayList<Users> getUsers(String searchField, String value) throws ExecutionException, InterruptedException {
        //get query of users
        Query query = db.collection("Users");
        //apply
        if (doesFieldExist(searchField)) {
            query = query.whereGreaterThanOrEqualTo(searchField, value)
                    .whereLessThan(searchField, value + "\uf8ff");
        }

        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        ArrayList<Users> users = new ArrayList<>();
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

    public void updateUser(String id, Map<String, Object> updateValues) {
        /*String[] allowed = {"email", "firstName", "lastName", "isActive"};
        List<String> list = Arrays.asList(allowed);
        Map<String, Object> formattedValues = new HashMap<>();

        for (Map.Entry<String, Object> entry : updateValues.entrySet()) {
            String key = entry.getKey();
            if (list.contains(key))
                formattedValues.put(key, entry.getValue());
        }*/

        DocumentReference userDoc = db.collection("Users").document(id);
        userDoc.update(updateValues);
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


    /*public void updateLastLogin(String id) {
        DocumentReference docRef = db.collection("Users").document(id);
        ApiFuture<WriteResult> writeResult = docRef.update("lastLogin", FieldValue.serverTimestamp());


    }*/
}

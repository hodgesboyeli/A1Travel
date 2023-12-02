package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.Messages;
import famu.edu.a1travel.Model.RestMessages;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

@Service
public class MessagesService {
    private final Firestore db;
    public MessagesService (Firestore db){
        this.db = db;
    }
    private Messages getMessage(DocumentSnapshot doc) throws ExecutionException, InterruptedException {
        //getUserById function needed
        UsersService usersService = new UsersService(db);

        //get id of reference field in doc
        DocumentReference recDoc = (DocumentReference) doc.get("receiverID");
        //acquire receiver email
        String receiver = usersService.getUserById(Objects.requireNonNull(recDoc).getId()).getEmail();

        //vice versa for sender
        DocumentReference sendDoc = (DocumentReference) doc.get("senderID");
        String sender = usersService.getUserById(Objects.requireNonNull(sendDoc).getId()).getEmail();
        return new Messages(
                doc.getId(),
                doc.getString("messageContent"),
                doc.getTimestamp("timestamp"),
                receiver,
                sender);
    }
    public ArrayList<Messages> getMessagesForUser(String receiverID) throws ExecutionException, InterruptedException {
        // Create a query to filter messages based on the receiverID field
        DocumentReference user = db.collection("Users").document(receiverID);
        Query query = db.collection("Messages").whereEqualTo("receiverID",user);

        // Execute the query
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        // Process the documents and convert them to Messages objects
        ArrayList<Messages> messages = new ArrayList<>();

        for (QueryDocumentSnapshot doc : documents) {
            messages.add(getMessage(doc));
        }
        return messages;
    }

    public ArrayList<Messages> getSentMessagesForUser(String senderID) throws ExecutionException, InterruptedException {
        // Create a query to filter messages based on the receiverID field
        DocumentReference user = db.collection("Users").document(senderID);
        Query query = db.collection("Messages").whereEqualTo("senderID", user);

        // Execute the query
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        // Process the documents and convert them to Messages objects
        ArrayList<Messages> messages = new ArrayList<>();

        for (QueryDocumentSnapshot doc : documents) {
            messages.add(getMessage(doc));
        }

        return messages;
    }

    public String createMessage(RestMessages message) throws ExecutionException, InterruptedException {
        message.setTimestamp(Timestamp.now());
        ApiFuture<DocumentReference> future = db.collection("Messages").add(message);
        DocumentReference messageRef = future.get();
        return messageRef.getId();
    }
}

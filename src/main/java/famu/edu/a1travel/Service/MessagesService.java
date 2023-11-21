package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
import famu.edu.a1travel.Model.Messages;
import famu.edu.a1travel.Model.Messages;
import famu.edu.a1travel.Model.RestMessages;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class MessagesService {
    private final Firestore db;
    public MessagesService (Firestore db){
        this.db = db;
    }

    public ArrayList<Messages> getMessagesForUser(String receiverID) throws ExecutionException, InterruptedException {
        // Create a query to filter messages based on the receiverID field
        Query query = db.collection("Messages").whereEqualTo("receiverID", db.collection("Users").document(receiverID));

        // Execute the query
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        // Process the documents and convert them to Messages objects
        ArrayList<Messages> messages = !documents.isEmpty() ? new ArrayList<>() : null;

        for (QueryDocumentSnapshot doc : documents) {
            messages.add(doc.toObject(Messages.class));
        }

        return messages;
    }

    /*public String createMessage(RestMessages message, String receiverId) throws ExecutionException, InterruptedException {
        String messageId = null;
        message.setTimestamp(Timestamp.now());
        message.setReceiverID(receiverId);

        ApiFuture<DocumentReference> future = db.collection("Messages").add(message);
        DocumentReference messageRef = future.get();
        messageId = messageRef.getId();

        return messageId;
    }*/

    public String createMessage(RestMessages message, String receiverEmail) throws ExecutionException, InterruptedException {
        String messageId = null;

        // Get the user ID based on the email
        String receiverId = getUserIdFromEmail(receiverEmail);

        if (receiverId != null) {
            message.setTimestamp(Timestamp.now());
            message.setReceiverID(receiverId);

            ApiFuture<DocumentReference> future = db.collection("Messages").add(message);
            DocumentReference messageRef = future.get();
            messageId = messageRef.getId();
        }

        return messageId;
    }

    private String getUserIdFromEmail(String email) {
        try {
            UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(email);
            return userRecord.getUid();
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return null;
        }
    }

    /*private String getLoggedInUserId() {
        try {
            FirebaseToken token = FirebaseAuth.getInstance().verifyIdToken();
            return token.getUid();
        } catch (FirebaseAuthException e) {
            // Handle exceptions (e.g., invalid or expired token)
            return null;
        }
    }*/



}

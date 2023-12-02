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
    public ArrayList<Messages> getMessages(String receiverId, String senderId) throws ExecutionException, InterruptedException {
        // Create a query to filter messages based on the receiverID field
        Query query = db.collection("Messages");

        //check to make sure at least one of the id strings provided isn't empty, else return an empty array
        if (!receiverId.isEmpty() && !senderId.isEmpty()) {
            // Both receiverId and senderId are provided
            DocumentReference receiverRef = db.collection("Users").document(receiverId);
            DocumentReference senderRef = db.collection("Users").document(senderId);
            query = query.whereEqualTo("receiverID", receiverRef).whereEqualTo("senderID", senderRef);
        } else if (!receiverId.isEmpty()) {
            // Only receiverId is provided
            DocumentReference receiverRef = db.collection("Users").document(receiverId);
            query = query.whereEqualTo("receiverID", receiverRef);
        } else if (!senderId.isEmpty()) {
            // Only senderId is provided
            DocumentReference senderRef = db.collection("Users").document(senderId);
            query = query.whereEqualTo("senderID", senderRef);
        } else {
            // If both IDs are empty, return an empty list
            return new ArrayList<>();
        }

        // Execute query
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        // Process the documents and convert them to Messages objects
        ArrayList<Messages> messages = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            messages.add(getMessage(doc));
        }
        return messages;
    }

    public String createMessage(Messages message) throws ExecutionException, InterruptedException {
        //create actual RestMessages object based on passed Messages param
        RestMessages restMessage = new RestMessages();
        restMessage.setMessageContent(message.getMessageContent());

        //Use function from UsersService
        UsersService usersService = new UsersService(db);
        //set the references based on email
        String rId = usersService.getUserIdByEmail(message.getReceiverID());
        restMessage.setReceiverID(rId,db);

        String sId = usersService.getUserIdByEmail(message.getSenderID());
        restMessage.setSenderID(sId,db);

        //set timestamp to this current moment
        restMessage.setTimestamp(Timestamp.now());

        ApiFuture<DocumentReference> future = db.collection("Messages").add(restMessage);
        DocumentReference messageRef = future.get();
        return messageRef.getId();
    }

    public void deleteMessage(String messageID){
        DocumentReference postDoc = db.collection("Messages").document(messageID);
        postDoc.delete();
    }
}

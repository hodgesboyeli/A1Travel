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
    private final UsersService usersService;
    public MessagesService (Firestore db){
        usersService = new UsersService(db);
        this.db = db;
    }
    //create Messages object
    private Messages getMessage(DocumentSnapshot doc) throws ExecutionException, InterruptedException {
        //get id of reference field in doc
        DocumentReference recDoc = (DocumentReference) doc.get("receiverID");
        //acquire receiver email
        String receiver = "";
        if (recDoc != null) {
            receiver = usersService.getUserById(Objects.requireNonNull(recDoc).getId()).getEmail();
        }
        //vice versa for sender
        DocumentReference sendDoc = (DocumentReference) doc.get("senderID");
        String sender = "";
        if (sendDoc != null) {
            sender = usersService.getUserById(Objects.requireNonNull(sendDoc).getId()).getEmail();
        }
        return new Messages(
                doc.getId(),
                doc.getString("messageContent"),
                doc.getTimestamp("timestamp"),
                receiver, sender);
    }
    public ArrayList<Messages> getMessages(String receiverEmail, String senderEmail) throws ExecutionException, InterruptedException {
        // Create a query to filter messages
        Query query = db.collection("Messages");

        //check to make sure at least one of the id strings provided isn't empty, else return an empty array
        if (!receiverEmail.isEmpty() && !senderEmail.isEmpty()) {
            // Both receiverEmail and senderEmail are provided
            DocumentReference receiverRef = usersService.getUserDocByEmail(receiverEmail);
            DocumentReference senderRef = usersService.getUserDocByEmail(senderEmail);
            query = query.whereEqualTo("receiverID", receiverRef).whereEqualTo("senderID", senderRef);
        } else if (!receiverEmail.isEmpty()) {
            // Only receiverEmail is provided
            DocumentReference receiverRef = usersService.getUserDocByEmail(receiverEmail);
            query = query.whereEqualTo("receiverID", receiverRef);
        } else if (!senderEmail.isEmpty()) {
            // Only senderEmail is provided
            DocumentReference senderRef = usersService.getUserDocByEmail(senderEmail);
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

    public Messages createMessage(Messages message) throws ExecutionException, InterruptedException {
        //create actual RestMessages object based on passed Messages param
        Timestamp rn = Timestamp.now();
        RestMessages restMessage = new RestMessages(message.getMessageId(), message.getMessageContent(), rn, null, null);
        message.setTimestamp(rn);

        //set the references based on email
        String rId = usersService.getUserIdByEmail(message.getReceiverID());
        restMessage.setReceiverID(rId,db);
        String sId = usersService.getUserIdByEmail(message.getSenderID());
        restMessage.setSenderID(sId,db);

        ApiFuture<DocumentReference> future = db.collection("Messages").add(restMessage);
        message.setMessageId(future.get().getId());
        return message;
    }

    public void deleteMessage(String messageID){
        DocumentReference postDoc = db.collection("Messages").document(messageID);
        postDoc.delete();
    }
}

package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import com.google.cloud.firestore.Firestore;
import famu.edu.a1travel.Model.Messages;
import famu.edu.a1travel.Service.MessagesService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/message")
public class MessagesController {
    private final MessagesService messagesService;
    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "MessagesService";
    public MessagesController(Firestore firestore) {
        messagesService = new MessagesService(firestore);
        payload = null;
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> getMessagesForUser(
            @RequestParam(name = "receiver", required = false, defaultValue = "") String receiverEmail,
            @RequestParam(name = "sender", required = false, defaultValue = "") String senderEmail) {
        Map<String,Object> returnVal = new HashMap<>();
        statusCode = 500;
        try {
            payload = messagesService.getMessages(receiverEmail,senderEmail);
            statusCode = 200;
            returnVal.put("messages", payload);
        } catch (ExecutionException | InterruptedException e) {
            returnVal.put("error", "Cannot fetch messages from database: "+ Arrays.toString(e.getStackTrace()));
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }

    @PostMapping("/")
    public ResponseEntity<Map<String, Object>> createMessage(@RequestBody Messages message) {
        Map<String,Object> returnVal = new HashMap<>();
        statusCode = 500;
        try {
            payload = messagesService.createMessage(message); // Pass the email instead of receiverId
            statusCode = 201;
            returnVal.put("message",payload);
        } catch (ExecutionException | InterruptedException e) {
            returnVal.put("error","Cannot create a new message in the database: "+ Arrays.toString(e.getStackTrace()));
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,Object>> deleteMessage(@PathVariable(name = "id") String id){
        Map<String,Object> returnVal = new HashMap<>();
        statusCode = 500;

        try{
            messagesService.deleteMessage(id);
            statusCode = 200;
            returnVal.put("message","Deleted message with id "+id);
        } catch (Exception e) {
            returnVal.put("error","Cannot delete message with id "+id+": "+ Arrays.toString(e.getStackTrace()));
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }
}
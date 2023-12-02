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
            @RequestParam(name = "receiver", required = false, defaultValue = "") String receiverID,
            @RequestParam(name = "sender", required = false, defaultValue = "") String senderID) {
        try {
            payload = messagesService.getMessages(receiverID,senderID);
            statusCode = 200;
            name = "messages";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch messages from database", CLASS_NAME,
                    Arrays.toString(e.getStackTrace()));
        }

        response = new ResponseWrapper(statusCode, name, payload);
        return response.getResponse();
    }

    @PostMapping("/")
    public ResponseEntity<Map<String, Object>> createMessage(@RequestBody Messages message) {
        try {
            payload = messagesService.createMessage(message); // Pass the email instead of receiverId
            statusCode = 201;
            name = "messageId";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot create a new message in the database.", CLASS_NAME, e.toString());
            name = "error";
        }

        response = new ResponseWrapper(statusCode, name, payload);

        return response.getResponse();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,Object>> deleteMessage(@PathVariable(name = "id") String id){
        Map<String,Object> returnVal = new HashMap<>();
        int sCode = 500;

        try{
            messagesService.deleteMessage(id);
            sCode = 204;
            returnVal.put("message","Deleted message with id "+id);
        } catch (Exception e) {
            returnVal.put("error","Cannot delete message with id "+id+": "+ Arrays.toString(e.getStackTrace()));
        }
        return ResponseEntity.status(sCode).body(returnVal);
    }
}

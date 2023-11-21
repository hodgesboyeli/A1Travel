package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import com.google.cloud.firestore.Firestore;
import famu.edu.a1travel.Model.Messages;
import famu.edu.a1travel.Model.RestMessages;
import famu.edu.a1travel.Service.MessagesService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{receiverId}")
    public ResponseEntity<Map<String, Object>> getMessagesForUser(@PathVariable(name = "receiverId") String receiverID) {
        try {
            payload = messagesService.getMessagesForUser(receiverID);
            statusCode = 200;
            name = "messages";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch messages from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }

        response = new ResponseWrapper(statusCode, name, payload);
        return response.getResponse();
    }


    /*@PostMapping("/{receiverId}")
    public ResponseEntity<Map<String, Object>> createMessage(@RequestBody RestMessages message, @PathVariable(name = "receiverId") String receiverID) {
        try {
            payload = messagesService.createMessage(message, receiverID); // Pass both message and receiverId
            statusCode = 201;
            name = "messageId";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot create a new message in the database.", CLASS_NAME, e.toString());
            name = "error";
        }

        response = new ResponseWrapper(statusCode, name, payload);

        return response.getResponse();
    }*/

    @PostMapping("/{receiverEmail}")
    public ResponseEntity<Map<String, Object>> createMessage(@RequestBody RestMessages message, @PathVariable(name = "receiverEmail") String receiverEmail) {
        try {
            payload = messagesService.createMessage(message, receiverEmail); // Pass the email instead of receiverId
            statusCode = 201;
            name = "messageId";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot create a new message in the database.", CLASS_NAME, e.toString());
            name = "error";
        }

        response = new ResponseWrapper(statusCode, name, payload);

        return response.getResponse();
    }
}

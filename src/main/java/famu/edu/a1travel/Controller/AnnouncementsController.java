package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import com.google.cloud.firestore.Firestore;
import famu.edu.a1travel.Model.RestAnnouncements;
import famu.edu.a1travel.Service.AnnouncementsService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/announcement")
public class AnnouncementsController {
    private final AnnouncementsService announcementsService;
    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "AnnouncementsService";
    public AnnouncementsController(AnnouncementsService announcementsService) {
        this.announcementsService = announcementsService;
        payload = null;
    }

    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> createAnnouncement(@RequestBody RestAnnouncements announcement){
        Map<String,Object> returnVal = new HashMap<>();
        statusCode = 500;
        try{
            payload = announcementsService.createAnnouncement(announcement);
            statusCode = 201;
            returnVal.put("announcementID",payload);
        } catch (ExecutionException | InterruptedException e) {
            returnVal.put("error","Cannot create new announcement in database: "+ Arrays.toString(e.getStackTrace()));
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }

    @GetMapping("/")
    public ResponseEntity<Map<String,Object>> getAnnouncements()
    {
        try {
            payload = announcementsService.getAnnouncements();
            statusCode = 200;
            name = "announcements";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch announcements from database", CLASS_NAME,
                    Arrays.toString(e.getStackTrace()));
        }

        response = new ResponseWrapper(statusCode, name, payload);
        return response.getResponse();
    }
}

package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import famu.edu.a1travel.Model.RestAnnouncements;
import famu.edu.a1travel.Service.AnnouncementsService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public AnnouncementsController(Firestore firestore) {
        announcementsService = new AnnouncementsService(firestore);
        payload = null;
    }

    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> createAnnouncement(@RequestBody RestAnnouncements announcement){
        try{
            payload = announcementsService.createAnnouncement(announcement);
            statusCode = 201;
            name = "announcementID";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot create new announcement in database.", CLASS_NAME, e.toString());
        }

        response = new ResponseWrapper(statusCode,name, payload);

        return response.getResponse();
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
                    e.getStackTrace().toString());
        }

        response = new ResponseWrapper(statusCode, name, payload);
        return response.getResponse();
    }
}

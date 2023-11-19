package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import famu.edu.a1travel.Model.Announcements;
import famu.edu.a1travel.Model.BaseAnnouncements;
import famu.edu.a1travel.Model.RestAnnouncements;
import famu.edu.a1travel.Service.AnnouncementsService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

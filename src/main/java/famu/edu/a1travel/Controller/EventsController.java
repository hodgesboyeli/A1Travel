package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import famu.edu.a1travel.Model.Events;
import famu.edu.a1travel.Model.Lodgings;
import famu.edu.a1travel.Service.EventsService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ExecutionException;
@RestController
@RequestMapping("/api/event")
public class EventsController {
    private final EventsService eventsService;
    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "EventsService";
    public EventsController(EventsService eventsService) {
        this.eventsService = eventsService;
        payload = null;
    }

    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> createEvent(@RequestBody Events event){
        try{
            payload = eventsService.createEvent(event);
            statusCode = 201;
            name = "eventId";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot create new event in database.", CLASS_NAME, e.toString());
        }

        response = new ResponseWrapper(statusCode,name, payload);

        return response.getResponse();
    }

    @GetMapping("/")
    public ResponseEntity<Map<String,Object>> getEventsByCityState(@RequestParam(name = "cityState", required = false, defaultValue = "") String cityState) {
        payload = new Events();
        try {
            payload = eventsService.getEventsByCityState(cityState);
            statusCode = 200;
            name = "events";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch events with cityState" + cityState + " from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }

        response = new ResponseWrapper(statusCode, name, payload);
        return response.getResponse();
    }
}

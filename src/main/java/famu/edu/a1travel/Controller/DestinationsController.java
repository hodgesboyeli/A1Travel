package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import com.google.cloud.firestore.Firestore;
import famu.edu.a1travel.Service.DestinationsService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/api/destination")
public class DestinationsController {
    private final DestinationsService destinationsService;
    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "DestinationsService";
    public DestinationsController(Firestore db) {
        this.destinationsService = new DestinationsService(db);
        payload = null;
    }

    @GetMapping("/")
    public ResponseEntity<Map<String,Object>> getDestinations(
            @RequestParam(name="limit", required = false, defaultValue = "0") int limit){
        try {
            payload = destinationsService.getDestinations(limit);
            statusCode = 200;
            name = "destinations";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch destinations from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }

        response = new ResponseWrapper(statusCode, name, payload);
        return response.getResponse();
    }

    @GetMapping("/{destinationId}")
    public ResponseEntity<Map<String,Object>> getDestination(@PathVariable(name = "destinationId") String id){
        try {
            payload = destinationsService.getDestinationById(id);
            statusCode = 200;
            name = "destination";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch destination with id" + id + " from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }

        response = new ResponseWrapper(statusCode, name, payload);
        return response.getResponse();
    }
}

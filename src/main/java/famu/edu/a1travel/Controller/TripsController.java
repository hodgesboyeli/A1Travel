package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import famu.edu.a1travel.Model.RestTrips;
import famu.edu.a1travel.Service.TripsService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/trip")
public class TripsController {
    private final TripsService tripsService;
    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "TripsService";
    public TripsController(Firestore firestore) {
        tripsService = new TripsService(firestore);
        payload = null;
    }

    @GetMapping("/")
    public ResponseEntity<Map<String,Object>> getTrips()
    {
        try {
            payload = tripsService.getTrips();
            statusCode = 200;
            name = "trips";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch trips from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }

        response = new ResponseWrapper(statusCode, name, payload);
        return response.getResponse();
    }

    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> createTrip(@RequestBody RestTrips trip){
        try{
            payload = tripsService.createTrip(trip);
            statusCode = 201;
            name = "tripID";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot create new trip in database.", CLASS_NAME, e.toString());
        }

        response = new ResponseWrapper(statusCode,name, payload);

        return response.getResponse();
    }
}

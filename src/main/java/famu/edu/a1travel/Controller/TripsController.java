package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import com.google.cloud.firestore.Firestore;
import famu.edu.a1travel.Model.RestTrips;
import famu.edu.a1travel.Model.Trips;
import famu.edu.a1travel.Service.TripsService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
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
    public TripsController(TripsService tripsService) {
        this.tripsService = tripsService;
        payload = null;
    }
    @GetMapping("/")
    public ResponseEntity<Map<String,Object>> getTrips(
            @RequestParam(name="user", required = false, defaultValue = "") String user)
    {
        Map<String, Object> returnVal = new HashMap<>();
        statusCode = 500;
        try{
            payload = tripsService.getTrips(user);
            statusCode = 200;
            returnVal.put("trips",payload);
        } catch (Exception e) {
            returnVal.put("error","Cannot get trips: "+Arrays.toString(e.getStackTrace()));
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }
    @GetMapping("/destination/")
    public ResponseEntity<Map<String, Object>> getTripsByDestination(
            @RequestParam(name = "destination", required = true, defaultValue = "") String destination)
    {
        Map<String, Object> returnVal = new HashMap<>();
        statusCode = 500;
        try {
            payload = tripsService.getTripsByDestination(destination);
            statusCode = 200;
            returnVal.put("trips", payload);
        } catch (Exception e) {
            returnVal.put("error", "Cannot get trips by destination: " + Arrays.toString(e.getStackTrace()));
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }
    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> createTrip(@RequestBody Trips trip){
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

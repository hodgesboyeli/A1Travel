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

    @GetMapping("/avg-budget")
    public ResponseEntity<Map<String, Object>> getTripAvgBudget() {
        Map<String, Object> returnVal = new HashMap<>();
        statusCode = 500;

        try {
            payload = tripsService.getTripAvgBudget();
            statusCode = 200;
            returnVal.put("averageBudget", payload);
        } catch (Exception e) {
            returnVal.put("error", "Cannot get average budget: " + Arrays.toString(e.getStackTrace()));
        }

        return ResponseEntity.status(statusCode).body(returnVal);
    }

    @GetMapping("/revenue")
    public ResponseEntity<Map<String, Object>> getTripRevenue() {
        Map<String, Object> returnVal = new HashMap<>();
        statusCode = 500;

        try {
            payload = tripsService.getTripRevenue();
            statusCode = 200;
            returnVal.put("totalRevenue", payload);
        } catch (Exception e) {
            returnVal.put("error", "Cannot get total revenue: " + Arrays.toString(e.getStackTrace()));
        }

        return ResponseEntity.status(statusCode).body(returnVal);
    }

    @GetMapping("/within-budget")
    public ResponseEntity<Map<String, Object>> getTripsWithinBudget() {
        Map<String, Object> returnVal = new HashMap<>();
        statusCode = 500;

        try {
            payload = tripsService.getTripsWithinBudget();
            statusCode = 200;
            returnVal.put("totalWithinBudget", payload);
        } catch (Exception e) {
            returnVal.put("error", "Cannot get total trips within budget: " + Arrays.toString(e.getStackTrace()));
        }

        return ResponseEntity.status(statusCode).body(returnVal);
    }

    @GetMapping("/over-budget")
    public ResponseEntity<Map<String, Object>> getTripsOverBudget() {
        Map<String, Object> returnVal = new HashMap<>();
        statusCode = 500;

        try {
            payload = tripsService.getTripsOverBudget();
            statusCode = 200;
            returnVal.put("totalOverBudget", payload);
        } catch (Exception e) {
            returnVal.put("error", "Cannot get total trips over budget: " + Arrays.toString(e.getStackTrace()));
        }

        return ResponseEntity.status(statusCode).body(returnVal);
    }
}

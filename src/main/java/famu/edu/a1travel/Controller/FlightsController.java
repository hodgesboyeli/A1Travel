package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import famu.edu.a1travel.Model.Flights;
import famu.edu.a1travel.Service.FlightsService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
@RestController
@RequestMapping("/api/flight")
public class FlightsController {
    private final FlightsService flightsService;
    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "FlightsService";
    public FlightsController(FlightsService flightsService) {
        this.flightsService = flightsService;
        payload = null;
    }

    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> createFlight(@RequestBody Flights flight){
        try{
            payload = flightsService.createFlight(flight);
            statusCode = 201;
            name = "flightId";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot create new flight in database.", CLASS_NAME, e.toString());
        }

        response = new ResponseWrapper(statusCode,name, payload);

        return response.getResponse();
    }

    @GetMapping("/{arriveLocation}")
    public ResponseEntity<Map<String,Object>> getFlightsByArriveLocation(@PathVariable String arriveLocation){
        Map<String, Object> returnVal = new HashMap<>();
        statusCode = 500;
        try {
            payload = flightsService.getFlightsByArriveLocation(arriveLocation);
            statusCode = 200;
            returnVal.put("flights",payload);
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch flights with cityState" + arriveLocation + " from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }
}

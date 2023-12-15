package famu.edu.a1travel.Controller;

import famu.edu.a1travel.Model.Lodgings;
import famu.edu.a1travel.Service.LodgingsService;
import com.google.api.client.util.Value;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/api/lodging")
public class LodgingsController {
    private final LodgingsService lodgingsService;

    private static final Logger logger = LoggerFactory.getLogger(LodgingsController.class);

    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "LodgingsService";
    public LodgingsController(LodgingsService lodgingsService) {
        this.lodgingsService = lodgingsService;
        payload = null;
    }

    @GetMapping("/")
    public ResponseEntity<Map<String,Object>> getLodgings(){
        Map<String, Object> returnVal = new HashMap<>();
        statusCode = 500;
        try {
            payload = lodgingsService.getLodgings();
            statusCode = 200;
            returnVal.put("lodgings",payload);
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch lodgings from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }
    
    @GetMapping("id/{lodgingId}")
    public ResponseEntity<Map<String,Object>> getLodging(@PathVariable(name = "lodgingId") String id) {
        logger.info("getLodging function is working!");
        payload = new Lodgings();
        try {
            payload = lodgingsService.getLodgingById(id);
            statusCode = 200;
            name = "lodging";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch lodging with id" + id + " from database", CLASS_NAME,
                    Arrays.toString(e.getStackTrace()));
        }

        response = new ResponseWrapper(statusCode, name, payload);
        return response.getResponse();
    }

    @GetMapping("cityState/")
    public ResponseEntity<Map<String,Object>> getLodgingsByCityState(
            @RequestParam (name = "cityState") String cityState,
            @RequestParam(name = "type") String type) {
        Map<String, Object> returnVal = new HashMap<>();
        statusCode = 500;
        try {
            payload = lodgingsService.getLodgingsByCityState(cityState, type);
            statusCode = 200;
            returnVal.put("lodgings",payload);
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch lodgings with cityState" + cityState + " from database", CLASS_NAME,
                    Arrays.toString(e.getStackTrace()));
        }
        System.out.println(ResponseEntity.status(statusCode).body(returnVal));
        return ResponseEntity.status(statusCode).body(returnVal);
    }
}

package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import famu.edu.a1travel.Model.Trains;
import famu.edu.a1travel.Service.TrainsService;
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
@RequestMapping("/api/train")
public class TrainsController {
    private final TrainsService trainsService;
    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "TrainsService";
    public TrainsController(TrainsService trainsService) {
        this.trainsService = trainsService;
        payload = null;
    }

    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> createTrain(@RequestBody Trains train){
        try{
            payload = trainsService.createTrain(train);
            statusCode = 201;
            name = "trainId";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot create new train in database.", CLASS_NAME, e.toString());
        }

        response = new ResponseWrapper(statusCode,name, payload);

        return response.getResponse();
    }
}

package famu.edu.a1travel.Controller;


import famu.edu.a1travel.Model.Cars;
import famu.edu.a1travel.Service.CarsService;
import com.google.api.client.util.Value;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/api/car")
public class CarsController {
    private final CarsService carsService;
    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "CarsService";
    public CarsController(CarsService carsService) {
        this.carsService = carsService;
        payload = null;
    }

    @GetMapping("/")
    public ResponseEntity<Map<String,Object>> getCars(){
        Map<String, Object> returnVal = new HashMap<>();
        statusCode = 500;
        try {
            payload = carsService.getCars();
            statusCode = 200;
            returnVal.put("cars",payload);
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch cars from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }
  
    @GetMapping("id/{carId}")
    public ResponseEntity<Map<String,Object>> getCar(@PathVariable(name = "carId") String id) {
        payload = new Cars();
        try {
            payload = carsService.getCarById(id);
            statusCode = 200;
            name = "car";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch car with id" + id + " from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }
        response = new ResponseWrapper(statusCode, name, payload);
      return response.getResponse();
    }
    @GetMapping("/{pickupLocation}")
    public ResponseEntity<Map<String,Object>> getCarsByPickupLocation(@PathVariable String pickupLocation){
        Map<String, Object> returnVal = new HashMap<>();
        statusCode = 500;
        try {
            payload = carsService.getCarsByPickupLocation(pickupLocation);
            statusCode = 200;
            returnVal.put("cars",payload);
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch cars with pickupLocation" + pickupLocation + " from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }
  
    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> createCar(@RequestBody Cars car){
        try{
            payload = carsService.createCar(car);
            statusCode = 201;
            name = "carId";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot create new car in database.", CLASS_NAME, e.toString());
        }

        response = new ResponseWrapper(statusCode,name, payload);
        return response.getResponse();
    }
}

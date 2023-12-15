package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import famu.edu.a1travel.Model.Specials;
import famu.edu.a1travel.Service.SpecialsService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/special")
public class SpecialsController {
    private final SpecialsService specialsService;
    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "SpecialsService";
    public SpecialsController(SpecialsService specialsService) {
        this.specialsService = specialsService;
        payload = null;
    }

    @PostMapping("/")
    public ResponseEntity<Map<String,Object>> createSpecial(@RequestBody Specials special){
        try{
            payload = specialsService.createSpecial(special);
            statusCode = 201;
            name = "specialId";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot create new special in database.", CLASS_NAME, e.toString());
        }

        response = new ResponseWrapper(statusCode,name, payload);

        return response.getResponse();
    }
}

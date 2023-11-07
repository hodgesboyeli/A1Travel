package famu.edu.a1travel.Controller;

import famu.edu.a1travel.Service.UsersService;
import com.google.api.client.util.Value;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping("/api/user")
public class UsersController {
    private final UsersService usersService;
    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "UsersService";
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
        payload = null;
    }

    @GetMapping("/")
    public ResponseEntity<Map<String,Object>> getUsers(
            @RequestParam(name="field",required = false,defaultValue = "") String field,
            @RequestParam(name="value",required = false,defaultValue = "") String value)
    {
        try {
            payload = usersService.getUsers(field,value);
            statusCode = 200;
            name = "users";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch users from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }

        response = new ResponseWrapper(statusCode, name, payload);
        return response.getResponse();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String,Object>> getUser(@PathVariable(name = "userId") String id){
        try {
            payload = usersService.getUserById(id);
            statusCode = 200;
            name = "user";
        } catch (ExecutionException | InterruptedException e) {
            payload = new ErrorMessage("Cannot fetch user with id" + id + " from database", CLASS_NAME,
                    e.getStackTrace().toString());
        }

        response = new ResponseWrapper(statusCode, name, payload);
        return response.getResponse();
    }
}

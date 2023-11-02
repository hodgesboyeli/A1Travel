package famu.edu.a1travel.Controller;

import com.google.api.client.util.Value;
import com.google.cloud.Timestamp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import famu.edu.a1travel.Model.Users;
import famu.edu.a1travel.Security.FirebaseUserDetails;
import famu.edu.a1travel.Service.UsersService;
import famu.edu.a1travel.Util.ErrorMessage;
import famu.edu.a1travel.Util.JwtUtil;
import famu.edu.a1travel.Util.LoginRequest;
import famu.edu.a1travel.Util.ResponseWrapper;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080")
public class AuthenticationController {

    private final FirebaseAuth firebaseAuth = FirebaseAuth.getInstance();

    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "Authentication";

    private final Log logger = LogFactory.getLog(this.getClass());

    public AuthenticationController(AuthenticationManager authenticationManager) {
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody Map<String,Object> userValues) {
        final UsersService usersService = new UsersService();
        try{
            Users user = new Users();
            UserRecord.CreateRequest request = new UserRecord.CreateRequest();
            for (Map.Entry<String,Object> entry : userValues.entrySet()){
                switch (entry.getKey()){
                    case "email":
                        user.setEmail((String) entry.getValue());
                        request.setEmail((String) entry.getValue());
                        break;
                    case "password":
                        request.setPassword((String) entry.getValue());
                        break;
                    case "firstName":
                        user.setFirstName((String) entry.getValue());
                        break;
                    case "lastName":
                        user.setLastName((String) entry.getValue());
                        break;
                    case "username":
                        user.setUsername((String) entry.getValue());
                        request.setDisplayName((String) entry.getValue());
                        break;
                }
            }
            user.setRole("Customer");
            user.setCreatedAt(Timestamp.now());
            user.setActive(Boolean.TRUE);

            //create new user
            UserRecord userRecord = firebaseAuth.createUser(request);
            //TODO Return a JWT so after registration you log in
            payload = user;
            statusCode = 201;

            name = "Successfully created new user: "+userRecord.getUid();
        } catch (FirebaseAuthException e) {
            payload = new ErrorMessage("Cannot create new user in database.", CLASS_NAME, e.toString());
        }
        response = new ResponseWrapper(statusCode,name, payload);
        return response.getResponse();
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest loginRequest) {
        statusCode = 401;
        String token;
        HttpHeaders headers = new HttpHeaders();
        try {
            //verify user exists based on email
            UserRecord userRecord = firebaseAuth.getUserByEmail(loginRequest.getEmail());

            logger.info(userRecord.getUid());
            UserDetails userDetails = new FirebaseUserDetails(userRecord);
            token = JwtUtil.generateToken(userDetails);
            payload = token;
            //logger.info(token);

            statusCode = 200;
            name = "jwt";
            headers.add("X-Auth-Token", token);
            Instant now = Instant.now();
            Instant expiryDate = now.plus(1, ChronoUnit.HOURS);
            headers.add("Expires", String.valueOf(expiryDate.toEpochMilli()));

        } catch (FirebaseAuthException e) {
            payload = new ErrorMessage("Error authenticating user: ", CLASS_NAME, e.toString());
        }
        response = new ResponseWrapper(statusCode, name, payload, headers);
        return response.getResponse();
    }

    @GetMapping("/logout")
    public String logout() {
        SecurityContextHolder.getContext().setAuthentication(null);
        return "Logged out successfully";
    }
}

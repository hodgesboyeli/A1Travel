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
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    private final FirebaseAuth firebaseAuth = FirebaseAuth.getInstance();
    private final AuthenticationManager authenticationManager;

    @Value("${response.status}")
    private int statusCode;
    @Value("${response.name}")
    private String name;
    private Object payload;
    private ResponseWrapper response;
    private static final String CLASS_NAME = "Authentication";


    private final Log logger = LogFactory.getLog(this.getClass());

    public AuthenticationController(AuthenticationManager authenticationManager) {

        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody Map<String,Object> userValues) throws FirebaseAuthException {
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
                }
            }
            user.setCreatedAt(Timestamp.now());
            user.setActive(Boolean.TRUE);
            payload = usersService.createUser(user);
            statusCode = 201;

            UserRecord userRecord = firebaseAuth.createUser(request);
            name = "Successfully created new user: "+userRecord.getUid();
        } catch (Exception e) {
            payload = new ErrorMessage("Cannot create new user in database.", CLASS_NAME, e.toString());
        }

        response = new ResponseWrapper(statusCode,name, payload);

        return response.getResponse();
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest loginRequest) throws FirebaseAuthException {
        String token = "";
        HttpHeaders headers = new HttpHeaders();

        try {
            UserRecord userRecord = firebaseAuth.getUserByEmail(loginRequest.getEmail());
            //logger.info(userRecord.getUid());

            UserDetails userDetails = new FirebaseUserDetails(userRecord);
            //logger.info(userDetails);
            token = JwtUtil.generateToken(userDetails);
            //logger.info(token);
            UsersService service = new UsersService();
            Users user = service.getUserByUid(userRecord.getUid());
            payload = Objects.requireNonNullElseGet(user, Users::new);
            //service.updateLastLogin(user.getUid() );

            statusCode = 200;
            name = "user";
            headers.add("X-Auth-Token", token);
            Instant now = Instant.now();
            Instant expiryDate = now.plus(1, ChronoUnit.HOURS);
            headers.add("Expires", String.valueOf(expiryDate.toEpochMilli()));

        } catch (InterruptedException | ExecutionException e) {

            payload = new ErrorMessage("Error signing in", CLASS_NAME, e.toString());
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

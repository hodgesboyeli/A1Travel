package famu.edu.a1travel.Controller;

import com.google.cloud.Timestamp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import famu.edu.a1travel.Model.Users;
import famu.edu.a1travel.Security.FirebaseUserDetails;
import famu.edu.a1travel.Service.UsersService;
import famu.edu.a1travel.Util.JwtUtil;
import famu.edu.a1travel.Util.LoginRequest;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "localhost:3000")
public class AuthenticationController {
    private final FirebaseAuth firebaseAuth;
    private final Log logger = LogFactory.getLog(this.getClass());
    public AuthenticationController(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    @PostMapping("/register")
    public String register(@RequestBody Map<String,Object> userValues) throws ExecutionException, InterruptedException, FirebaseAuthException {
        final UsersService usersService = new UsersService();

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

        //create user document and set auth uid to the user doc id
        request.setUid(usersService.createUser(user));
        //create new user
        UserRecord userRecord = firebaseAuth.createUser(request);

            //TODO Return a JWT so after registration you log in
        return userRecord.getUid();
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) throws FirebaseAuthException {
        //verify user exists based on email
        UserRecord userRecord = firebaseAuth.getUserByEmail(loginRequest.getEmail());

        logger.info(userRecord.getUid());
        UserDetails userDetails = new FirebaseUserDetails(userRecord);
        return JwtUtil.generateToken(userDetails);
    }

    @GetMapping("/logout")
    public String logout() {
        SecurityContextHolder.getContext().setAuthentication(null);
        return "Logged out successfully";
    }
}

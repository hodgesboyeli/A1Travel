package famu.edu.a1travel.Controller;

import com.google.api.services.storage.Storage;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.Firestore;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "localhost:3000")
public class AuthenticationController {
    private final FirebaseAuth firebaseAuth;
    private final UsersService usersService;
    private final Log logger = LogFactory.getLog(this.getClass());
    public AuthenticationController(FirebaseAuth firebaseAuth, UsersService usersService) {
        this.firebaseAuth = firebaseAuth;
        this.usersService = usersService;
    }

    @PostMapping("/register")
    public String register(@RequestBody Map<String,Object> userValues) throws ExecutionException, InterruptedException, FirebaseAuthException {
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
                case "":
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

    @PutMapping("/account/{email}")
    public Boolean accountSwitchActive(@PathVariable String email,
                                       @RequestParam(name="set", defaultValue = "true") boolean set) throws FirebaseAuthException, ExecutionException, InterruptedException {
        //toggle disable user in auth
        UserRecord userRecord = firebaseAuth.getUserByEmail(email);
        UserRecord.UpdateRequest update = userRecord.updateRequest().setDisabled(set);
        firebaseAuth.updateUser(update);
        //update Users document field isActive
        String uid = usersService.getUserByEmail(email).getUserId();
        Map<String,Object> updates = new HashMap<>();
        updates.put("isActive", !set);
        usersService.updateUser(uid,updates);
        return set;
    }

    @GetMapping("/account/users/")
    public ResponseEntity<Map<String,Object>> getAuthUsers(){
        Map<String,Object> returnVal = new HashMap<>();
        int statusCode = 500;
        try {
            returnVal.put("users", firebaseAuth.listUsers("0"));
            statusCode = 200;
        } catch (FirebaseAuthException e) {
            returnVal.put("error", e.getStackTrace());
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }

    @PutMapping("/account/update/{uid}")
    public ResponseEntity<Map<String,Object>> updateUser(@PathVariable String uid,@RequestBody Map<String,Object> obj){
        Map<String,Object> returnVal = new HashMap<>();
        int statusCode = 500;
        try {
            UserRecord.UpdateRequest updateRequest = new UserRecord.UpdateRequest(uid);
            updateRequest.setPhotoUrl((String) obj.get("photoUrl"));
            returnVal.put("user", firebaseAuth.updateUser(updateRequest));
            statusCode = 200;
        } catch (FirebaseAuthException e) {
            returnVal.put("error", e.getStackTrace());
        }
        return ResponseEntity.status(statusCode).body(returnVal);
    }
}
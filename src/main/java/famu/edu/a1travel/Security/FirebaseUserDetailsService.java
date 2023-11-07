package famu.edu.a1travel.Security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;

public class FirebaseUserDetailsService implements UserDetailsService {

    private final FirebaseAuth firebaseAuth;

    public FirebaseUserDetailsService(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    @Override
    public UserDetails loadUserByUsername(String token) throws UsernameNotFoundException {
        try {
            FirebaseToken decodedToken = firebaseAuth.verifyIdToken(token);
            String uid = decodedToken.getUid();
            return User.builder()
                    .username(uid)
                    .password("")
                    .authorities(Collections.emptyList())
                    .build();
        } catch (FirebaseAuthException e) {
            throw new UsernameNotFoundException("User not found");
        }
    }
}

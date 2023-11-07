package famu.edu.a1travel;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@SpringBootApplication
public class A1TravelApplication {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(A1TravelApplication.class, args);
    }

}

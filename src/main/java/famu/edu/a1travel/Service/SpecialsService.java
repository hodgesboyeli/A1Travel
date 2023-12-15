package famu.edu.a1travel.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import famu.edu.a1travel.Model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
@Service
public class SpecialsService {
    private final Firestore db;
    public SpecialsService(Firestore db){
        this.db = db;
    }
    public String createSpecial(Specials special) throws ExecutionException, InterruptedException {
        special.setActive(true);
        ApiFuture<DocumentReference> future = db.collection("Specials").add(special);
        DocumentReference specialRef = future.get();
        return specialRef.getId();
    }

}

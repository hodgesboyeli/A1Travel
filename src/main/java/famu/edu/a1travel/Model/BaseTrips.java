package famu.edu.a1travel.Model;
import com.google.cloud.firestore.annotation.DocumentId;
import org.springframework.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseTrips {
    @DocumentId
    private @Nullable String tripId;
    private @Nullable double budget;
    private double cartTotal;
    private String destination;
}

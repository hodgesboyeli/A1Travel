package famu.edu.a1travel.Model;
import com.google.cloud.firestore.annotation.DocumentId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lodgings {
    @DocumentId
    private @Nullable String lodgingId;
    private String name;
    private String cityState;
    private String address;
    private String details;
    private Double price;
    private String type;
}

package famu.edu.a1travel.Model;
import org.springframework.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseTrips {
    private @Nullable float budget;
    private float cartTotal;
    private String destination;
}

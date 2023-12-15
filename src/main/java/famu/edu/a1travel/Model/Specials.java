package famu.edu.a1travel.Model;
import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Specials {
    private String code;
    private int discount;
    private boolean isActive;
    private String name;

    public boolean getIsActive() {
        return isActive;
    }
}

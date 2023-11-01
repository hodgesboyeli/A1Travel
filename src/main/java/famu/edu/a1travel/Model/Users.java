package famu.edu.a1travel.Model;

import com.google.cloud.Timestamp;
import com.google.cloud.firestore.annotation.DocumentId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    @DocumentId
    private @Nullable String userId;
    private @Nullable String uid;
    private Timestamp createdAt;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String username;

    private boolean isActive;

    public boolean getIsActive() {
        return isActive;
    }
}

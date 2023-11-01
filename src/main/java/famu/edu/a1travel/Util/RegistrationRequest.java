package famu.edu.a1travel.Util;

import com.google.firebase.database.annotations.Nullable;
import lombok.Data;

@Data
public class RegistrationRequest {
    private String email;
    private String password;
    private @Nullable String displayName;
}

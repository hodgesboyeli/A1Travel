package famu.edu.a1travel.Util;
import com.google.firebase.database.annotations.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class ResponseWrapper {
    private @NonNull int statusCode;
    private @NonNull String name;
    private @NonNull Object payload;
    private @Nullable HttpHeaders headers = null;

    public ResponseEntity getResponse()
    {
        return ResponseEntity.status(statusCode).headers(headers).body(Collections.singletonMap(name, payload));
    }
}

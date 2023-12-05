package famu.edu.a1travel.Model;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.annotation.DocumentId;
import com.google.firebase.database.annotations.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseMessages {
    @DocumentId
    protected @Nullable String messageId;
    protected String messageContent;
    protected @Nullable Timestamp timestamp;
}
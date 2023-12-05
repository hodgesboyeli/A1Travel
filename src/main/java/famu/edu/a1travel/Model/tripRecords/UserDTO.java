package famu.edu.a1travel.Model.tripRecords;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    String userID;
    String firstName;
    String lastName;
    String email;
}
package famu.edu.a1travel.Model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lodgings {
    private String address;
    private String details;
    private float price;
    private String type;
}

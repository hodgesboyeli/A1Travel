package famu.edu.a1travel.Model;
import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cars {
    private String color;
    private String make;
    private String model;
    private Timestamp pickupDate;
    private String pickupLocation;
    private float price;
    private Timestamp returnDate;
    private String returnLocation;
    private int year;
}

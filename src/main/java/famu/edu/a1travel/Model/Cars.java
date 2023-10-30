package famu.edu.a1travel.Model;
import com.google.cloud.Timestamp;
import com.google.protobuf.util.Timestamps;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;

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

    public void setPickupDate(String pickupDate) throws ParseException {
        this.pickupDate = Timestamp.fromProto(Timestamps.parse(pickupDate));
    }

    public void setReturnDate(String returnDate) throws ParseException {
        this.returnDate = Timestamp.fromProto(Timestamps.parse(returnDate));
    }
}

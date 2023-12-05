package famu.edu.a1travel.Model.tripRecords;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarDTO {
    String carID;
    String color;
    String make;
    String model;
}

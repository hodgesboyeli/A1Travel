package famu.edu.a1travel.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.util.ArrayList;

@Data
@NoArgsConstructor
public class Trips extends BaseTrips {
    private Users userID;
    private Cars carID;
    private ArrayList<Events> eventID;
    private ArrayList<Flights> flightID;
    private ArrayList<Lodgings> lodgingID;
    private ArrayList<Trains> trainID;

    public Trips(@Nullable String tripID, float budget, float cartTotal, String destination, Users userID, Cars carID, ArrayList<Events> eventID, ArrayList<Flights> flightID, ArrayList<Lodgings> lodgingID, ArrayList<Trains> trainID) {
        super(tripID, budget, cartTotal, destination);
        this.userID = userID;
        this.carID = carID;
        this.eventID = eventID;
        this.flightID = flightID;
        this.lodgingID = lodgingID;
        this.trainID = trainID;
    }
}

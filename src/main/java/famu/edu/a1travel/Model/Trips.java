package famu.edu.a1travel.Model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)

@Data
@NoArgsConstructor
public class Trips extends BaseTrips {
    private Users userID;
    private Cars carID;
    private Lodgings lodgingID;
    private ArrayList<Events> eventID;
    private ArrayList<Flights> flightID;
    private ArrayList<Trains> trainID;

    public Trips(String tripId, Double budget, Double cartTotal, String destination, Users userID, Cars carID, Lodgings lodgingID, ArrayList<Events> eventID, ArrayList<Flights> flightID, ArrayList<Trains> trainID) {
        super(tripId, budget, cartTotal, destination);
        this.userID = userID;
        this.carID = carID;
        this.lodgingID = lodgingID;
        this.eventID = eventID;
        this.flightID = flightID;
        this.trainID = trainID;
    }
}

package famu.edu.a1travel.Model;


import com.google.cloud.Timestamp;

public class Receipts extends BaseReceipts {
    private Trips tripID;
    private Users userID;

    public Receipts(Timestamp dateIssued, float totalAmount, Trips tripID, Users userID) {
        super(dateIssued, totalAmount);
        this.tripID = tripID;
        this.userID = userID;
    }
}

package famu.edu.a1travel.Model;

public class EventAttendees {
    private Events eventID;
    private Users userID;

    public EventAttendees(Events eventID, Users userID) {
        this.eventID = eventID;
        this.userID = userID;
    }
}

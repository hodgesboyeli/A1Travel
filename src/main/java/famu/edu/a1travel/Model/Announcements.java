package famu.edu.a1travel.Model;

import com.google.cloud.Timestamp;

public class Announcements extends BaseAnnouncements {
    private Users adminID;

    public Announcements(String body, String header, Timestamp timestamp, String type, Users adminID) {
        super(body, header, timestamp, type);
        this.adminID = adminID;
    }
}

package famu.edu.a1travel.Model;

import com.google.cloud.Timestamp;

public class Reports extends BaseReports {
    private Users adminID;

    public Reports(String content, Timestamp timestamp, Users adminID) {
        super(content, timestamp);
        this.adminID = adminID;
    }
}

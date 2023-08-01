import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FriendRequest extends Request {
    // Constructors
    public FriendRequest() {
    }

    public FriendRequest(int requestId, int senderId, int recipientId, String requestDate, Status status) {
        super(requestId, senderId, recipientId, requestDate, status);
    }

    public static void sendFriendRequest(Connection connection, FriendRequest friendRequest) throws SQLException {
        String sql = "INSERT INTO friend_requests (sender_id, recipient_id, request_date, status) VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, friendRequest.getSenderId());
            stmt.setInt(2, friendRequest.getRecipientId());
            stmt.setString(3, friendRequest.getRequestDate());
            stmt.setString(4, friendRequest.getStatus().name());
            stmt.executeUpdate();
        }
    }

    // Retrieve a friend request by ID
    public static FriendRequest getFriendRequestById(Connection connection, int requestId) throws SQLException {
        String sql = "SELECT * FROM friend_requests WHERE request_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, requestId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    // Populate the FriendRequest object with data from the ResultSet
                    return createFriendRequestFromResultSet(rs);
                }
            }
        }
        return null;
    }

    // Update friend request information
    public static void updateFriendRequest(Connection connection, FriendRequest friendRequest) throws SQLException {
        String sql = "UPDATE friend_requests SET status = ? WHERE request_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, friendRequest.getStatus().name());
            stmt.setInt(2, friendRequest.getRequestId());
            stmt.executeUpdate();
        }
    }

    private static FriendRequest createFriendRequestFromResultSet(ResultSet rs) throws SQLException {
        int requestId = rs.getInt("request_id");
        int senderId = rs.getInt("sender_id");
        int recipientId = rs.getInt("recipient_id");
        String requestDate = rs.getString("request_date");
        String statusString = rs.getString("status");
        Status status = Status.valueOf(statusString);
        return new FriendRequest(requestId, senderId, recipientId, requestDate, status);
    }

    // Retrieve all friend requests received by a user
    public static List<FriendRequest> getReceivedFriendRequests(Connection connection, int recipientId) throws SQLException {
        List<FriendRequest> receivedRequests = new ArrayList<>();
        String sql = "SELECT * FROM friend_requests WHERE recipient_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, recipientId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    receivedRequests.add(createFriendRequestFromResultSet(rs));
                }
            }
        }
        return receivedRequests;
    }

    // Delete a friend request by ID
    public static void deleteFriendRequest(Connection connection, int requestId) throws SQLException {
        String sql = "DELETE FROM friend_requests WHERE request_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, requestId);
            stmt.executeUpdate();
        }
    }

    // Method to display friend requests
    public static void displayFriendRequests(Connection connection, int recipientId) throws SQLException {
        List<FriendRequest> friendRequests = getReceivedFriendRequests(connection, recipientId);
        System.out.println("Received Friend Requests:");
        for (FriendRequest request : friendRequests) {
            System.out.println(request.toString());
        }
    }

    // Override the toString method to provide a custom string representation
    @Override
    public String toString() {
        return "FriendRequest{" +
                "requestId=" + getRequestId() +
                ", senderId=" + getSenderId() +
                ", recipientId=" + getRecipientId() +
                ", requestDate=" + getRequestDate() +
                ", status=" + getStatus() +
                '}';
    }
}
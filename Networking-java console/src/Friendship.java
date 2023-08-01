import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class Friendship {
    private int friendshipId;
    private int userId; // Foreign key to link one user
    private int friendId; // Foreign key to link the friend (another user)
    private String friendshipDate;

    // Constructors
    public Friendship() {
    }

    public Friendship(int friendshipId, int userId, int friendId, String friendshipDate) {
        this.friendshipId = friendshipId;
        this.userId = userId;
        this.friendId = friendId;
        this.friendshipDate = friendshipDate;
    }
    public Friendship(int userId, int friendId, String friendshipDate) {
        this.userId = userId;
        this.friendId = friendId;
        this.friendshipDate = friendshipDate;
    }

    // Getters and setters
    public int getFriendshipId() {
        return friendshipId;
    }

    public void setFriendshipId(int friendshipId) {
        this.friendshipId = friendshipId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getFriendId() {
        return friendId;
    }

    public void setFriendId(int friendId) {
        this.friendId = friendId;
    }

    public String getFriendshipDate() {
        return friendshipDate;
    }

    public void setFriendshipDate(String friendshipDate) {
        this.friendshipDate = friendshipDate;
    }

    // Create a new friendship
    public static void createFriendship(Connection connection, Friendship friendship) throws SQLException {
        String sql = "INSERT INTO friendships (user_id, friend_id, friendship_date) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, friendship.getUserId());
            stmt.setInt(2, friendship.getFriendId());
            stmt.setString(3,friendship.getFriendshipDate());
            stmt.executeUpdate();
        }
    }

    // Retrieve a friendship by ID
    public static Friendship getFriendshipById(Connection connection, int friendshipId) throws SQLException {
        Friendship friendship = null;
        String sql = "SELECT * FROM friendships WHERE friendship_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, friendshipId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    // Populate the Friendship object with data from the ResultSet
                    friendship = new Friendship();
                    friendship.setFriendshipId(rs.getInt("friendship_id"));
                    friendship.setUserId(rs.getInt("user_id"));
                    friendship.setFriendId(rs.getInt("friend_id"));
                    friendship.setFriendshipDate(rs.getString("friendship_date"));
                }
            }
        }
        return friendship;
    }

    // Update friendship information
    public void updateFriendship(Connection connection) throws SQLException {
        String sql = "UPDATE friendships SET friendship_date = ? WHERE friendship_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1,this.getFriendshipDate());
            stmt.setInt(2, this.getFriendshipId());
            stmt.executeUpdate();
        }
    }

    // Delete a friendship by ID
    public static void deleteFriendship(Connection connection, int friendshipId) throws SQLException {
        String sql = "DELETE FROM friendships WHERE friendship_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, friendshipId);
            stmt.executeUpdate();
        }
    }
}
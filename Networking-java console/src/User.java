import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class User {
    private int userId;
    private String username;
    private String email;
    private String password;
    private String profileInfo;

    // Constructors
    public User() {
    }

    public User(int userId, String username, String email, String password, String profileInfo) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileInfo = profileInfo;
    }

    // Getters and setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfileInfo() {
        return profileInfo;
    }

    public void setProfileInfo(String profileInfo) {
        this.profileInfo = profileInfo;
    }

    // Create a new user
    public static void createUser(Connection connection, User user) throws SQLException {
        String sql = "INSERT INTO users (username, email, password, profile_info) VALUES (?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword());
            stmt.setString(4, user.getProfileInfo());
            stmt.executeUpdate();
        }
    }

    // Retrieve a user by ID
    public static User getUserById(Connection connection, int userId) throws SQLException {
        User user = null;
        String sql = "SELECT * FROM users WHERE user_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    // Populate the User object with data from the ResultSet
                    user = new User();
                    user.setUserId(rs.getInt("user_id"));
                    user.setUsername(rs.getString("username"));
                    user.setEmail(rs.getString("email"));
                    user.setPassword(rs.getString("password"));
                    user.setProfileInfo(rs.getString("profile_info"));
                }
            }
        }
        return user;
    }

    // Retrieve a user by username
    public static User getUserByUsername(Connection connection, String username) throws SQLException {
        User user = null;
        String sql = "SELECT * FROM users WHERE username = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, username);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    // Populate the User object with data from the ResultSet
                    user = new User();
                    user.setUserId(rs.getInt("user_id"));
                    user.setUsername(rs.getString("username"));
                    user.setEmail(rs.getString("email"));
                    user.setPassword(rs.getString("password"));
                    user.setProfileInfo(rs.getString("profile_info"));
                }
            }
        }
        return user;
    }

    // Update user information
    public void updateUser(Connection connection) throws SQLException {
        String sql = "UPDATE users SET username = ?, email = ?, password = ?, profile_info = ? WHERE user_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, this.getUsername());
            stmt.setString(2, this.getEmail());
            stmt.setString(3, this.getPassword());
            stmt.setString(4, this.getProfileInfo());
            stmt.setInt(5, this.getUserId());
            stmt.executeUpdate();
        }
    }

    // Delete a user by ID
    public static void deleteUser(Connection connection, int userId) throws SQLException {
        String sql = "DELETE FROM users WHERE user_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            stmt.executeUpdate();
        }
    }
}

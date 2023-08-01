import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PrivacySetting {
    private int privacyId;
    private int userId; // Foreign key to link the privacy setting to its user
    private String visibility; // Possible values: "public", "private", "friends-only"

    // Constructors
    public PrivacySetting() {
    }

    public PrivacySetting(int privacyId, int userId, String visibility) {
        this.privacyId = privacyId;
        this.userId = userId;
        this.visibility = visibility;
    }

    // Getters and setters
    public int getPrivacyId() {
        return privacyId;
    }

    public void setPrivacyId(int privacyId) {
        this.privacyId = privacyId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    // Create a new privacy setting
    public static void createPrivacySetting(Connection connection, PrivacySetting privacySetting) throws SQLException {
        String sql = "INSERT INTO privacy_settings (user_id, visibility) VALUES (?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, privacySetting.getUserId());
            stmt.setString(2, privacySetting.getVisibility());
            stmt.executeUpdate();
        }
    }

    // Retrieve the privacy setting for a user
    public static PrivacySetting getPrivacySettingByUserId(Connection connection, int userId) throws SQLException {
        PrivacySetting privacySetting = null;
        String sql = "SELECT * FROM privacy_settings WHERE user_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    // Populate the PrivacySetting object with data from the ResultSet
                    privacySetting = new PrivacySetting();
                    privacySetting.setPrivacyId(rs.getInt("privacy_id"));
                    privacySetting.setUserId(rs.getInt("user_id"));
                    privacySetting.setVisibility(rs.getString("visibility"));
                }
            }
        }
        return privacySetting;
    }

    // Update privacy setting
    public void updatePrivacySetting(Connection connection) throws SQLException {
        String sql = "UPDATE privacy_settings SET visibility = ? WHERE privacy_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, this.getVisibility());
            stmt.setInt(2, this.getPrivacyId());
            stmt.executeUpdate();
        }
    }
}

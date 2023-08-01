import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ConcreteLike extends Like {

    public ConcreteLike() {
        super();
    }

    public ConcreteLike(int likeId, int userId, int postId, String likeDate) {
        super(likeId, userId, postId, likeDate);
    }

    @Override
    public void createLike(Connection connection, Like like) throws SQLException {
        String sql = "INSERT INTO likes (user_id, post_id, like_date) VALUES (?, ?, ?)";

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, like.getUserId());
            stmt.setInt(2, like.getPostId());
            stmt.setString(3, like.getLikeDate());
            stmt.executeUpdate();
        }
    }

    @Override
    public Like getLikeById(Connection connection, int likeId) throws SQLException {
        Like like = null;
        String sql = "SELECT * FROM likes WHERE like_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, likeId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                   
                    like = new ConcreteLike();
                    like.setLikeId(rs.getInt("like_id"));
                    like.setUserId(rs.getInt("user_id"));
                    like.setPostId(rs.getInt("post_id"));
                    like.setLikeDate(rs.getString("like_date"));
                }
            }
        }
        return like;
    }

    @Override
    public void deleteLike(Connection connection, int likeId) throws SQLException {
        String sql = "DELETE FROM likes WHERE like_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, likeId);
            stmt.executeUpdate();
        }
    }
}
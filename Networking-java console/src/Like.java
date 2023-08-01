import java.sql.Connection;
import java.sql.SQLException;

public abstract class Like {
    private int likeId;
    private int userId; 
    private int postId; 
    private String likeDate;

    public Like() {
    }

    public Like(int likeId, int userId, int postId, String likeDate) {
        this.likeId = likeId;
        this.userId = userId;
        this.postId = postId;
        this.likeDate = likeDate;
    }

    // Getters and setters

    public int getLikeId() {
        return likeId;
    }

    public void setLikeId(int likeId) {
        this.likeId = likeId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getLikeDate() {
        return likeDate;
    }

    public void setLikeDate(String likeDate) {
        this.likeDate = likeDate;
    }

    // Abstract methods

    public abstract void createLike(Connection connection, Like like) throws SQLException;

    public abstract Like getLikeById(Connection connection, int likeId) throws SQLException;

    public abstract void deleteLike(Connection connection, int likeId) throws SQLException;
}

// Concrete subclass implementing Like




import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Post {
    private int postId;
    private int userId; // Foreign key to link the post to its creator
    private String postContent;
    private String postDate;

    // Constructors
    public Post() {
    }

    public Post(int postId, int userId, String postContent, String postDate) {
        this.postId = postId;
        this.userId = userId;
        this.postContent = postContent;
        this.postDate = postDate;
    }

    // Getters and setters
    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getPostContent() {
        return postContent;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    public String getPostDate() {
        return postDate;
    }

    public void setPostDate(String postDate) {
        this.postDate = postDate;
    }

    // Create a new post
 // Create a new post
    public static void createPost(Connection connection, Post post) throws SQLException {
        String sql = "INSERT INTO posts (user_id, post_content, post_date) VALUES (?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, post.getUserId());
            stmt.setString(2, post.getPostContent());

            // Set the post date to the current date if it is not provided
            stmt.setString(3, post.getPostDate());
           
            stmt.executeUpdate();
        }
    }



    // Retrieve a post by ID
    public static Post getPostById(Connection connection, int postId) throws SQLException {
        Post post = null;
        String sql = "SELECT * FROM posts WHERE post_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, postId);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    // Populate the Post object with data from the ResultSet
                    post = new Post();
                    post.setPostId(rs.getInt("post_id"));
                    post.setUserId(rs.getInt("user_id"));
                    post.setPostContent(rs.getString("post_content"));
                    post.setPostDate(rs.getString("post_date"));
                }
            }
        }
        return post;
    }

    // Retrieve all posts by a user
    public static List<Post> getPostsByUserId(Connection connection, int userId) throws SQLException {
        List<Post> posts = new ArrayList<>();
        String sql = "SELECT * FROM posts WHERE user_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    // Populate the Post objects with data from the ResultSet
                    Post post = new Post();
                    post.setPostId(rs.getInt("post_id"));
                    post.setUserId(rs.getInt("user_id"));
                    post.setPostContent(rs.getString("post_content"));
                    post.setPostDate(rs.getString("post_date"));
                    posts.add(post);
                }
            }
        }
        return posts;
    }

    // Update post information
    public void updatePost(Connection connection) throws SQLException {
        String sql = "UPDATE posts SET post_content = ?, post_date = ? WHERE post_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, this.getPostContent());
            stmt.setString(2, this.getPostDate());
            stmt.setInt(3, this.getPostId());
            stmt.executeUpdate();
        }
    }

    // Delete a post by ID
    public static void deletePost(Connection connection, int postId) throws SQLException {
        String sql = "DELETE FROM posts WHERE post_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, postId);
            stmt.executeUpdate();
        }
    }
}

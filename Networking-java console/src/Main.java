import java.sql.Connection;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        try {
            Connection connection = DatabaseManager.getConnection();
            Scanner scanner = new Scanner(System.in);

            while (true) {
                // Display the menu and handle user choices
                System.out.println("Choose an option:");
                System.out.println("1. Create User");
                System.out.println("2. Update User");
                System.out.println("3. Delete User");
                System.out.println("4. Create Post");
                System.out.println("5. Update Post");
                System.out.println("6. Delete Post");
                System.out.println("7. Create Comment");
                System.out.println("8. Update Comment");
                System.out.println("9. Delete Comment");
                System.out.println("10. Create Like");
                System.out.println("11. Delete Like");
                System.out.println("12. Create Friendship");
                System.out.println("13. Update Friendship");
                System.out.println("14. Delete Friendship");
                System.out.println("15. Create Privacy Setting");
                System.out.println("16. Update Privacy Setting");
                System.out.println("17. Send Friend Request");
                System.out.println("18. View Received Friend Requests");
                System.out.println("19. Accept or Reject Friend Request");
                System.out.println("0. Exit");
                System.out.print("Enter your choice: ");
                int choice = scanner.nextInt();

                if (choice == 0) {
                    break;
                } else if (choice == 1) {
                    // Create User
                    System.out.print("Enter username: ");
                    String username = scanner.next();

                    System.out.print("Enter email: ");
                    String email = scanner.next();

                    System.out.print("Enter password: ");
                    String password = scanner.next();

                    System.out.print("Enter profile info: ");
                    String profileInfo = scanner.next();

                    // Create a new User object with the entered information
                    User newUser = new User();
                    newUser.setUsername(username);
                    newUser.setEmail(email);
                    newUser.setPassword(password);
                    newUser.setProfileInfo(profileInfo);

                    try {
                        // Call the createUser method to insert the new user into the database
                        User.createUser(connection, newUser);
                        System.out.println("New user created successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error creating user: " + e.getMessage());
                    }
                } else if (choice == 2) {
                    // Update User
                    System.out.print("Enter the user ID to update: ");
                    int userIdToUpdate = scanner.nextInt();

                    try {
                        User userToUpdate = User.getUserById(connection, userIdToUpdate);

                        if (userToUpdate != null) {
                            System.out.print("Enter new username: ");
                            String newUsername = scanner.next();

                            System.out.print("Enter new email: ");
                            String newEmail = scanner.next();

                            System.out.print("Enter new password: ");
                            String newPassword = scanner.next();

                            System.out.print("Enter new profile info: ");
                            String newProfileInfo = scanner.next();

                            userToUpdate.setUsername(newUsername);
                            userToUpdate.setEmail(newEmail);
                            userToUpdate.setPassword(newPassword);
                            userToUpdate.setProfileInfo(newProfileInfo);

                            userToUpdate.updateUser(connection);
                            System.out.println("User information updated successfully!");
                        } else {
                            System.out.println("User not found with the given ID.");
                        }
                    } catch (SQLException e) {
                        System.err.println("Error updating user: " + e.getMessage());
                    }
                } else if (choice == 3) {
                    // Delete User
                    System.out.print("Enter the user ID to delete: ");
                    int userIdToDelete = scanner.nextInt();

                    try {
                        User.deleteUser(connection, userIdToDelete);
                        System.out.println("User deleted successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error deleting user: " + e.getMessage());
                    }
                } else if (choice == 4) {
                    // Create Post
                    System.out.print("Enter user ID for the post creator: ");
                    int userId = scanner.nextInt();

                    System.out.print("Enter post content: ");
                    scanner.nextLine(); // Consume the new line character
                    String postContent = scanner.nextLine();
                    System.out.print("Enter the post date: ");
                    String postDate=scanner.nextLine();
                    

                    Post newPost = new Post();
                    newPost.setUserId(userId);
                    newPost.setPostContent(postContent);
                    newPost.setPostDate(postDate);


                    // Call the createPost method in the Post class to insert the new post into the database
                    try {
                        Post.createPost(connection, newPost);
                        System.out.println("New post created successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error creating post: " + e.getMessage());
                    }
                                } else if (choice == 5) {
                    // Update Post
                    System.out.print("Enter the post ID to update: ");
                    int postIdToUpdate = scanner.nextInt();

                    try {
                        Post postToUpdate = Post.getPostById(connection, postIdToUpdate);

                        if (postToUpdate != null) {
                            System.out.print("Enter new post content: ");
                            scanner.nextLine(); // Consume the new line character
                            String newPostContent = scanner.nextLine();
                            System.out.print("Enter new post date: ");
                            String newPostDate = scanner.nextLine();

                            postToUpdate.setPostContent(newPostContent);
                            postToUpdate.setPostDate(newPostDate);

                            postToUpdate.updatePost(connection);
                            System.out.println("Post updated successfully!");
                        } else {
                            System.out.println("Post not found with the given ID.");
                        }
                    } catch (SQLException e) {
                        System.err.println("Error updating post: " + e.getMessage());
                    }
                } else if (choice == 6) {
                    // Delete Post
                    System.out.print("Enter the post ID to delete: ");
                    int postIdToDelete = scanner.nextInt();

                    try {
                        Post.deletePost(connection, postIdToDelete);
                        System.out.println("Post deleted successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error deleting post: " + e.getMessage());
                    }
                } else if (choice == 7) {
                    // Create Comment
                    System.out.print("Enter post ID for the comment: ");
                    int postId = scanner.nextInt();

                    System.out.print("Enter user ID for the comment creator: ");
                    int userId = scanner.nextInt();

                    System.out.print("Enter comment content: ");
                    scanner.nextLine(); // Consume the new line character
                    String commentContent = scanner.nextLine();
                    System.out.print("Enter comment date: ");
                    String commentDate = scanner.nextLine();

                    Comment newComment = new Comment();
                    newComment.setPostId(postId);
                    newComment.setUserId(userId);
                    newComment.setCommentContent(commentContent);
                    newComment.setCommentDate(commentDate);

                    try {
                        Comment.createComment(connection, newComment);
                        System.out.println("New comment created successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error creating comment: " + e.getMessage());
                    }
                } else if (choice == 8) {
                    // Update Comment
                    System.out.print("Enter the comment ID to update: ");
                    int commentIdToUpdate = scanner.nextInt();

                    try {
                        Comment commentToUpdate = Comment.getCommentById(connection, commentIdToUpdate);

                        if (commentToUpdate != null) {
                            System.out.print("Enter new comment content: ");
                            scanner.nextLine(); // Consume the new line character
                            String newCommentContent = scanner.nextLine();
                            System.out.print("Enter new comment date: ");
                            String newCommentDate=scanner.nextLine();

                            commentToUpdate.setCommentContent(newCommentContent);
                            commentToUpdate.setCommentDate(newCommentDate);

                            commentToUpdate.updateComment(connection);
                            System.out.println("Comment updated successfully!");
                        } else {
                            System.out.println("Comment not found with the given ID.");
                        }
                    } catch (SQLException e) {
                        System.err.println("Error updating comment: " + e.getMessage());
                    }
                } else if (choice == 9) {
                    // Delete Comment
                    System.out.print("Enter the comment ID to delete: ");
                    int commentIdToDelete = scanner.nextInt();

                    try {
                        Comment.deleteComment(connection, commentIdToDelete);
                        System.out.println("Comment deleted successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error deleting comment: " + e.getMessage());
                    }
                } 
             // ...
                else if (choice == 10) {
                    // Create Like
                    System.out.print("Enter post ID for the like: ");
                    int postId = scanner.nextInt();

                    System.out.print("Enter user ID for the like creator: ");
                    int userId = scanner.nextInt();

                    scanner.nextLine(); // Consume the newline character
                    System.out.print("Enter the Like Date: ");
                    String likeDate = scanner.nextLine();

                    // Create a new ConcreteLike object with the entered information
                    ConcreteLike newLike = new ConcreteLike(0, userId, postId, likeDate); // Assuming likeId is auto-generated and set to 0

                    try {
                        // Call the createLike method to insert the new like into the database
                        newLike.createLike(connection, newLike);
                        System.out.println("New like created successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error creating like: " + e.getMessage());
                    }
                }
                // ...


             // ...
                else if (choice == 11) {
                    // Delete Like
                    System.out.print("Enter the like ID to delete: ");
                    int likeIdToDelete = scanner.nextInt();

                    // Create a new ConcreteLike object with the likeId to use its deleteLike method
                    ConcreteLike likeToDelete = new ConcreteLike(likeIdToDelete, 0, 0, ""); // Other fields don't matter for deletion

                    try {
                        // Call the deleteLike method to delete the like from the database
                        likeToDelete.deleteLike(connection, likeIdToDelete);
                        System.out.println("Like deleted successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error deleting like: " + e.getMessage());
                    }
                }
                // ...
                 else if (choice == 12) {
                    // Create Friendship
                    System.out.print("Enter user ID for one friend: ");
                    int userId = scanner.nextInt();

                    System.out.print("Enter user ID for the other friend: ");
                    int friendId = scanner.nextInt();
                    
                    System.out.print("Enter Friendship Date: ");
                    scanner.nextLine();
                    String friendshipDate= scanner.nextLine();

                    Friendship newFriendship = new Friendship();
                    newFriendship.setUserId(userId);
                    newFriendship.setFriendId(friendId);
                    newFriendship.setFriendshipDate(friendshipDate);

                    try {
                        Friendship.createFriendship(connection, newFriendship);
                        System.out.println("New friendship created successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error creating friendship: " + e.getMessage());
                    }
                } else if (choice == 13) {
                    // Update Friendship
                    System.out.print("Enter the friendship ID to update: ");
                    int friendshipIdToUpdate = scanner.nextInt();

                    try {
                        Friendship friendshipToUpdate = Friendship.getFriendshipById(connection, friendshipIdToUpdate);

                        if (friendshipToUpdate != null) {
                            System.out.print("Enter new user ID for one friend: ");
                            int newUserId = scanner.nextInt();

                            System.out.print("Enter new user ID for the other friend: ");
                            int newFriendId = scanner.nextInt();
                            
                            System.out.print("Enter new Friendship Date: ");
                            scanner.nextLine();
                            String newFriendshipDate = scanner.nextLine();

                            friendshipToUpdate.setUserId(newUserId);
                            friendshipToUpdate.setFriendId(newFriendId);
                            friendshipToUpdate.setFriendshipDate(newFriendshipDate);

                            friendshipToUpdate.updateFriendship(connection);
                            System.out.println("Friendship updated successfully!");
                        } else {
                            System.out.println("Friendship not found with the given ID.");
                        }
                    } catch (SQLException e) {
                        System.err.println("Error updating friendship: " + e.getMessage());
                    }
                } else if (choice == 14) {
                    // Delete Friendship
                    System.out.print("Enter the friendship ID to delete: ");
                    int friendshipIdToDelete = scanner.nextInt();

                    try {
                        Friendship.deleteFriendship(connection, friendshipIdToDelete);
                        System.out.println("Friendship deleted successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error deleting friendship: " + e.getMessage());
                    }
                } else if (choice == 15) {
                    // Create Privacy Setting
                    System.out.print("Enter user ID for the privacy setting: ");
                    int userId = scanner.nextInt();

                    System.out.print("Enter visibility (public, private, friends-only): ");
                    String visibility = scanner.next();

                    PrivacySetting newPrivacySetting = new PrivacySetting();
                    newPrivacySetting.setUserId(userId);
                    newPrivacySetting.setVisibility(visibility);

                    try {
                        PrivacySetting.createPrivacySetting(connection, newPrivacySetting);
                        System.out.println("New privacy setting created successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error creating privacy setting: " + e.getMessage());
                    }
                } else if (choice == 16) {
                    // Update Privacy Setting
                    System.out.print("Enter the privacy setting ID to update: ");
                    int privacyIdToUpdate = scanner.nextInt();

                    try {
                        PrivacySetting privacySettingToUpdate = PrivacySetting.getPrivacySettingByUserId(connection, privacyIdToUpdate);

                        if (privacySettingToUpdate != null) {
                            System.out.print("Enter new visibility (public, private, friends-only): ");
                            String newVisibility = scanner.next();

                            privacySettingToUpdate.setVisibility(newVisibility);

                            privacySettingToUpdate.updatePrivacySetting(connection);
                            System.out.println("Privacy setting updated successfully!");
                        } else {
                            System.out.println("Privacy setting not found with the given ID.");
                        }
                    } catch (SQLException e) {
                        System.err.println("Error updating privacy setting: " + e.getMessage());
                    }
                } else if (choice == 17) {
                    // Send Friend Request
                    System.out.print("Enter sender user ID: ");
                    int senderId = scanner.nextInt();

                    System.out.print("Enter recipient user ID: ");
                    int recipientId = scanner.nextInt();
                    
                   System.out.print("Enter request date: ");
                   scanner.nextLine();
                   String requestDate=scanner.nextLine();

                    FriendRequest newFriendRequest = new FriendRequest();
                    newFriendRequest.setSenderId(senderId);
                    newFriendRequest.setRecipientId(recipientId);
                    newFriendRequest.setRequestDate(requestDate);
                    newFriendRequest.setStatus(FriendRequest.Status.PENDING);
                    // Assuming you have a proper date handling mechanism

                    try {
                        FriendRequest.sendFriendRequest(connection, newFriendRequest);
                        System.out.println("Friend request sent successfully!");
                    } catch (SQLException e) {
                        System.err.println("Error sending friend request: " + e.getMessage());
                    }
                } else if (choice == 18) {
                    // View Received Friend Requests
                    System.out.print("Enter user ID to view received friend requests: ");
                    int userId = scanner.nextInt();

                    try {
                        List<FriendRequest> receivedRequests = FriendRequest.getReceivedFriendRequests(connection, userId);
                        if (receivedRequests.isEmpty()) {
                            System.out.println("No received friend requests.");
                        } else {
                            System.out.println("Received Friend Requests:");
                            for (FriendRequest request : receivedRequests) {
                                System.out.println(request);
                            }
                        }
                    } catch (SQLException e) {
                        System.err.println("Error retrieving received friend requests: " + e.getMessage());
                    }
                } else if (choice == 19) {
                    // Accept or Reject Friend Request
                    System.out.print("Enter user ID to accept/reject friend request: ");
                    int userId = scanner.nextInt();

                    System.out.print("Enter friend request ID to accept/reject: ");
                    int requestId = scanner.nextInt();

                    try {
                        FriendRequest request = FriendRequest.getFriendRequestById(connection, requestId);
                        if (request != null && request.getRecipientId() == userId && request.getStatus() == FriendRequest.Status.PENDING) {
                            System.out.println("Friend Request Details:");
                            System.out.println(request);

                            System.out.print("Do you want to accept or reject the friend request? (Type 'accept' or 'reject'): ");
                            String response = scanner.next();

                            if (response.equalsIgnoreCase("accept")) {
                                request.setStatus(FriendRequest.Status.ACCEPTED);
                                FriendRequest.updateFriendRequest(connection, request);
                                
                                
                                System.out.print("Enter Friendship Date (yyyy-MM-dd): ");
                                scanner.nextLine();
                                String friendshipDate = scanner.nextLine();
                                
                                Friendship.createFriendship(connection, new Friendship(userId, request.getSenderId(), friendshipDate));
                                System.out.println("Friend request accepted successfully!");
                            } else if (response.equalsIgnoreCase("reject")) {
                                request.setStatus(FriendRequest.Status.REJECTED);
                                FriendRequest.updateFriendRequest(connection, request);
                                System.out.println("Friend request rejected successfully!");
                            } else {
                                System.out.println("Invalid response. Friend request not processed.");
                            }
                        } else {
                            System.out.println("Invalid friend request ID or it is not pending.");
                        }
                    } catch (SQLException e) {
                        System.err.println("Error processing friend request: " + e.getMessage());
                    }
                } else {
                    System.out.println("Invalid choice! Please try again.");
                }
            }

            scanner.close();
            DatabaseManager.closeConnection(connection);
        } catch (SQLException e) {
            System.err.println("Error connecting to the database: " + e.getMessage());
        }
    }
}
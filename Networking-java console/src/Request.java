
public class Request {
    protected int requestId;
    protected int senderId;
    protected int recipientId;
    protected String requestDate;
    protected Status status;

    public enum Status {
        PENDING,
        ACCEPTED,
        REJECTED
    }

  
    public Request() {
    }

    public Request(int requestId, int senderId, int recipientId, String requestDate, Status status) {
        this.requestId = requestId;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.requestDate = requestDate;
        this.status = status;
    }

    // Getters and setters
    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public int getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(int recipientId) {
        this.recipientId = recipientId;
    }

    public String getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(String requestDate) {
        this.requestDate = requestDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
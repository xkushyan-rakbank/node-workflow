package ae.rakbank.documentuploader.exception;

public class AmazonS3FileNotFoundException extends RuntimeException {
    public AmazonS3FileNotFoundException(String message) {
        super(message);
    }
}

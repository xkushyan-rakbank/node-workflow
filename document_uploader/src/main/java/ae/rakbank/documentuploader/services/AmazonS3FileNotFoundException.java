package ae.rakbank.documentuploader.services;

public class AmazonS3FileNotFoundException extends RuntimeException {
    public AmazonS3FileNotFoundException(String message) {
        super(message);
    }
}

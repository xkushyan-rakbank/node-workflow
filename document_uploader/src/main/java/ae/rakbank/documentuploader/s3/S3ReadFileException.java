package ae.rakbank.documentuploader.s3;

public class S3ReadFileException extends RuntimeException {
    public S3ReadFileException(String message, Throwable cause) {
        super(message, cause);
    }
}
package ae.rakbank.documentuploader.exception;

public class S3ReadFileException extends RuntimeException {
    public S3ReadFileException(String message, Throwable cause) {
        super(message, cause);
    }
}
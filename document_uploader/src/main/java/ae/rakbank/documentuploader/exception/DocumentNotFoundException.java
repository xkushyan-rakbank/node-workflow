package ae.rakbank.documentuploader.exception;

public class DocumentNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DocumentNotFoundException(String message) {
		super(message);
	}

	public DocumentNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
}
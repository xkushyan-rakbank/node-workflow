package ae.rakbank.documentuploader.commons;

public class DocumentUploadException extends Exception {

	private static final long serialVersionUID = 1L;

	public DocumentUploadException(String message) {
		super(message);
	}

	public DocumentUploadException(String message, Throwable cause) {
		super(message, cause);
	}
}
package ae.rakbank.webapply.commons;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ApiError {

	private HttpStatus status;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
	private LocalDateTime timestamp;
	private String message;
	private String debugMessage;

	private ApiError() {
		timestamp = LocalDateTime.now();
	}

	public ApiError(HttpStatus status) {
		this();
		this.status = status;
	}

	public ApiError(HttpStatus status, Throwable ex) {
		this();
		this.status = status;
		this.message = "Unexpected error";
		setException(ex);
	}

	private void setException(Throwable ex) {
		if (!EnvUtil.isProd()) {
			this.debugMessage = ex.getLocalizedMessage();
		}

	}

	ApiError(HttpStatus status, String message, Throwable ex) {
		this();
		this.status = status;
		this.message = message;
		setException(ex);
	}

	public String getDebugMessage() {
		return debugMessage;
	}

	public String getMessage() {
		return message;
	}

	public HttpStatus getStatus() {
		return status;
	}

}
package ae.rakbank.apisecurity.base.response;

import java.io.Serializable;

/**
 * The Class JWTResponse.
 */
public class JWTResponse implements Serializable {

	private static final long serialVersionUID = -2263926489641534208L;
	/** The body. */
	String error;

	/** The status. */
	String status;

	String message;

	String path;

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}


	/**
	 * failed response.
	 *
	 * @param message the message
	 * @return the success response
	 */
	public static JWTResponse getFailedResponse(String status,String message,String error,String path) {
		JWTResponse jwtResponse = new JWTResponse();
		jwtResponse.setError(error);
		jwtResponse.setMessage(message);
		jwtResponse.setStatus(status);
		jwtResponse.setPath(path);
		return jwtResponse;
	}

}

package ae.rakbank.webapply.response;

import java.io.Serializable;

/**
 * The Class GenericResponse.
 */
public class GenericResponse implements Serializable {

	private static final long serialVersionUID = -2263926489641534208L;

	/** The body. */
	Object body;

	/** The status. */
	Status status;

	/**
	 * Gets the body.
	 *
	 * @return the body
	 */
	public Object getBody() {
		return body;
	}

	/**
	 * Sets the body.
	 *
	 * @param body the new body
	 */
	public void setBody(Object body) {
		this.body = body;
	}

	/**
	 * Gets the status.
	 *
	 * @return the status
	 */
	public Status getStatus() {
		return status;
	}

	/**
	 * Sets the status.
	 *
	 * @param status the new status
	 */
	public void setStatus(Status status) {
		this.status = status;
	}

	/**
	 * Gets the failed response.
	 *
	 * @param message     the message
	 * @param serverError the server error
	 * @return the failed response
	 */
	public static GenericResponse getFailedResponse(String message, String serverError) {
		GenericResponse failure = new GenericResponse();
		Status status2 = new Status();
		status2.setCode(StatusEnum.FAILED.getCode());
		status2.setMessage(message);
		status2.setInternalMessage(serverError);
		failure.setStatus(status2);
		return failure;
	}

	public static GenericResponse getFailedResp(Object body, String message, String serverError, String errorCode) {
		GenericResponse failure = new GenericResponse();
		Status status2 = new Status();
		status2.setCode(StatusEnum.FAILED.getCode());
		status2.setMessage(message);
		status2.setInternalMessage(serverError);
		status2.setErrorCode(errorCode);
		failure.setStatus(status2);
		failure.setBody(body);
		return failure;
	}

	public static GenericResponse getFailedResponse(String message, String serverError, String errorCode) {
		GenericResponse failure = new GenericResponse();
		Status status2 = new Status();
		status2.setCode(StatusEnum.FAILED.getCode());
		status2.setMessage(message);
		status2.setInternalMessage(serverError);
		status2.setErrorCode(errorCode);
		failure.setStatus(status2);
		return failure;
	}

	public static GenericResponse getFailedResponse(String message, String serverError, String errorCode,
			String apiCode) {
		GenericResponse failure = new GenericResponse();
		Status status2 = new Status();
		status2.setCode(StatusEnum.FAILED.getCode());
		status2.setMessage(message);
		status2.setInternalMessage(serverError);
		status2.setErrorCode(errorCode);
		status2.setApiCode(apiCode);
		failure.setStatus(status2);
		return failure;
	}

	/**
	 * Gets the success response.
	 *
	 * @param body    the body
	 * @param message the message
	 * @return the success response
	 */
	public static GenericResponse getSuccessResponse(Object body, String message) {
		GenericResponse successResponse = new GenericResponse();
		Status status2 = new Status();
		status2.setCode(StatusEnum.SUCCESS.getCode());
		status2.setMessage(message);
		successResponse.setStatus(status2);
		successResponse.setBody(body);
		return successResponse;
	}

}

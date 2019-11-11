package ae.rakbank.apisecurity.base.response;

import java.io.Serializable;

/**
 * The Class Status.
 */
public class Status implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -2949651615866591665L;

	/** The message. */
	private String message;

	/** The code. */
	private String code = StatusEnum.SUCCESS.getCode(); // default

	/** The error code. */
	private String errorCode;
	
	/** MC reference */
	private String apiCode;

	/** The internal message. */
	private String internalMessage;

	/**
	 * Gets the message.
	 *
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * Sets the message.
	 *
	 * @param message the new message
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * Gets the code.
	 *
	 * @return the code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * Sets the code.
	 *
	 * @param code the new code
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * Gets the error code.
	 *
	 * @return the error code
	 */
	public String getErrorCode() {
		return errorCode;
	}

	/**
	 * Sets the error code.
	 *
	 * @param errorCode the new error code
	 */
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	/**
	 * Gets the internal message.
	 *
	 * @return the internal message
	 */
	public String getInternalMessage() {
		return internalMessage;
	}

	/**
	 * Sets the internal message.
	 *
	 * @param internalMessage the new internal message
	 */
	public void setInternalMessage(String internalMessage) {
		this.internalMessage = internalMessage;
	}

	/**
	 * @return the apiCode
	 */
	public String getApiCode() {
		return apiCode;
	}

	/**
	 * @param apiCode the apiCode to set
	 */
	public void setApiCode(String apiCode) {
		this.apiCode = apiCode;
	}

}

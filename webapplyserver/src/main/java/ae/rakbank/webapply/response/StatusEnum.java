package ae.rakbank.webapply.response;

/**
 * The Enum StatusEnum.
 */
public enum StatusEnum {

	/** The success. */
	SUCCESS("Y", "Success"),

	/** The failed. */
	FAILED("N", "Failed");

	/** The code. */
	String code;

	/** The message. */
	String message;

	/**
	 * Instantiates a new status enum.
	 *
	 * @param code    the code
	 * @param message the message
	 */
	StatusEnum(String code, String message) {
		this.code = code;

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
	 * Gets the message.
	 *
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

}

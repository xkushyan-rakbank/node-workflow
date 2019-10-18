package ae.rakbank.apisecurity.base.exception;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mastercard.api.core.exception.ApiException;

public class BaseApplicationException extends RuntimeException {
	private static final long serialVersionUID = -5225220094946349404L;
	private static final Logger LOG = LoggerFactory.getLogger(BaseApplicationException.class);

	protected String messageDesc;
	protected String errorCode;
	protected String errorMessage;
	protected int httpStatus;
	protected String apiCode;

	public BaseApplicationException(Exception e) {
		super(e);
	}

	public BaseApplicationException(ApiException ex) {
		this.httpStatus = ex.getHttpStatus();
		this.errorCode = ex.getReasonCode();
		this.errorMessage = ex.getMessage();
		this.apiCode = ex.getSource();

		LOG.info("HttpStatus: {}, errorCode: {}, errorMessage: {}, Api Code : {}", ex.getHttpStatus(),
				ex.getReasonCode(), ex.getMessage(), ex.getSource());

		if (Objects.nonNull(ex.getRawErrorData())) {
			Map errorMap = (Map) ex.getRawErrorData().get("error");
			LOG.info("errorMap=" + errorMap);
			if (Objects.nonNull(errorMap)) {
				List<Map> fieldErrorsMap = (List<Map>) errorMap.get("fieldErrors");
				LOG.info("fieldErrorsMap=" + fieldErrorsMap);
				if (Objects.nonNull(fieldErrorsMap) && !fieldErrorsMap.isEmpty()) {
					StringBuilder message = new StringBuilder();
					for (Map map : fieldErrorsMap) {
						String messageStr = (String) map.get("message");
						LOG.info("messageStr.if=" + messageStr);
						String code = (String) map.get("code");
						LOG.info("code.if=" + code);
						String messageOrCode = StringUtils.isBlank(messageStr) || "null".equalsIgnoreCase(messageStr)
								? (StringUtils.isNotBlank(code) && !"null".equalsIgnoreCase(code)
										? code.replace(".", " ")
										: code)
								: messageStr;
						LOG.info("messageOrCode.if=" + messageOrCode);
						message.append(messageOrCode).append(";");
						LOG.info("message.if=" + message);
					}
					this.messageDesc = message.toString();
					LOG.info("messageDesc.if=" + this.messageDesc);
				} else {
					this.messageDesc = StringUtils.isEmpty(ex.getMessage()) ? ex.getReasonCode().replace(".", " ")
							: ex.getMessage();
					LOG.info("messageDesc.else=" + this.messageDesc);
				}
			}
		}
	}

	public BaseApplicationException(Exception e, String messageDesc) {
		super(e);
		this.messageDesc = messageDesc;
	}

	public String getMessageDesc() {
		return messageDesc;
	}

	public String getErrorCode() {
		return this.errorCode;
	}

	public String getErrorMessage() {
		return this.errorMessage;
	}

	public int getHttpStatus() {
		return httpStatus;
	}

	/**
	 * @return the apiCode
	 */
	public String getApiCode() {
		return apiCode;
	}
}

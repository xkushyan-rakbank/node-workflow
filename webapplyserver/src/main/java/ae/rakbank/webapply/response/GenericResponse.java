package ae.rakbank.webapply.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class GenericResponse implements Serializable {

    private static final long serialVersionUID = -2263926489641534208L;

    Object body;
    Status status;

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

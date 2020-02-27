package ae.rakbank.webapply.util;

import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.exception.ApiException;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class CriteriaParamsValidator {

    private static final String INVALID_VALUES_MESSAGE = "'%s' is invalid, allowed values [%s] ";

    private String[] roles = {"customer", "agent"};
    private String[] products = {"RAKStarter", "Current Account", "RAKelite"};
    private String[] segments = {"sme", "retail"};
    private String[] devices = {"desktop", "mobile", "tablet"};

    public void validateCriteriaParams(String segment, String product, String role, String device) {
        String errorMessage = "";
        if (StringUtils.isNotBlank(segment) && !ArrayUtils.contains(segments, segment)) {
            errorMessage = errorMessage
                    + String.format(INVALID_VALUES_MESSAGE, segment, ArrayUtils.toString(segments));
        }
        if (StringUtils.isNotBlank(product) && !ArrayUtils.contains(products, product)) {
            errorMessage = errorMessage
                    + String.format(INVALID_VALUES_MESSAGE, product, ArrayUtils.toString(products));
        }
        if (StringUtils.isNotBlank(role) && !ArrayUtils.contains(roles, role)) {
            errorMessage = errorMessage
                    + String.format(INVALID_VALUES_MESSAGE, role, ArrayUtils.toString(roles));
        }
        if (StringUtils.isNotBlank(device) && !ArrayUtils.contains(devices, device)) {
            errorMessage = errorMessage
                    + String.format(INVALID_VALUES_MESSAGE, device, ArrayUtils.toString(devices));
        }

        if (StringUtils.isNotBlank(errorMessage)) {
            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, errorMessage, errorMessage);
            throw new ApiException(error, HttpStatus.BAD_REQUEST);
        }
    }
}

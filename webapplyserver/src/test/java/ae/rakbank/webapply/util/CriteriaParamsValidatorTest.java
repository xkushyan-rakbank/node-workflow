package ae.rakbank.webapply.util;

import ae.rakbank.webapply.exception.ApiException;
import org.junit.Before;
import org.junit.Test;

public class CriteriaParamsValidatorTest {

    private String[] roles = {"customer", "agent"};
    private String[] products = {"RAKStarter", "Current Account", "RAKelite"};
    private String[] segments = {"sme", "retail"};
    private String[] devices = {"desktop", "mobile", "tablet"};

    private CriteriaParamsValidator criteriaParamsValidator;

    @Before
    public void setUp() {
        criteriaParamsValidator = new CriteriaParamsValidator();
    }

    @Test
    public void validateCriteriaParamsWithValidSegments() {
        for (String segment : segments) {
            criteriaParamsValidator.validateCriteriaParams(segment, products[0], roles[0], devices[0]);
        }
    }

    @Test
    public void validateCriteriaParamsWithValidRoles() {
        for (String role : roles) {
            criteriaParamsValidator.validateCriteriaParams(segments[0], products[0], role, devices[0]);
        }
    }

    @Test
    public void validateCriteriaParamsWithValidDevice() {
        for (String device : devices) {
            criteriaParamsValidator.validateCriteriaParams(segments[0], products[0], roles[0], device);
        }
    }

    @Test
    public void validateCriteriaParamsWithValidProduct() {
        for (String product : products) {
            criteriaParamsValidator.validateCriteriaParams(segments[0], product, roles[0], devices[0]);
        }
    }

    @Test(expected = ApiException.class)
    public void validateCriteriaParamsInvalidSegment() {
        criteriaParamsValidator.validateCriteriaParams("smeWrong", products[0], roles[0], devices[0]);
    }

    @Test
    public void validateCriteriaParamsEmptySegment() {
        criteriaParamsValidator.validateCriteriaParams("", products[0], roles[0], devices[0]);
    }

    @Test(expected = ApiException.class)
    public void validateCriteriaParamsInvalidDevice() {
        criteriaParamsValidator.validateCriteriaParams(segments[0], products[0], roles[0], "desktopWrong");
    }

    @Test
    public void validateCriteriaParamsEmptyDevice() {
        criteriaParamsValidator.validateCriteriaParams(segments[0], products[0], roles[0], "");
    }

    @Test(expected = ApiException.class)
    public void validateCriteriaParamsInvalidProduct() {
        criteriaParamsValidator.validateCriteriaParams(segments[0], "RAKStarterWrong", roles[0], devices[0]);
    }

    @Test
    public void validateCriteriaParamsEmptyProduct() {
        criteriaParamsValidator.validateCriteriaParams(segments[0], "", roles[0], devices[0]);
    }

    @Test(expected = ApiException.class)
    public void validateCriteriaParamsInvalidRole() {
        criteriaParamsValidator.validateCriteriaParams(segments[0], products[0], "roleWrong", devices[0]);
    }

    @Test
    public void validateCriteriaParamsEmptyRole() {
        criteriaParamsValidator.validateCriteriaParams(segments[0], products[0], "", devices[0]);
    }


}
package ae.rakbank.webapply.response;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class GenericResponseTest {

    public static final String TEST_MESSAGE = "test message";
    public static final String TEST_SERVER_ERROR = "test server error";
    public static final String ERROR_BODY = "error body";
    public static final String ERROR_CODE = "500";

    @Test
    public void getFailedResponse() {
        GenericResponse failedResponse = GenericResponse.getFailedResponse(TEST_MESSAGE, TEST_SERVER_ERROR);
        assertNotNull(failedResponse);
        assertNotNull(failedResponse.getStatus());

        assertEquals(TEST_MESSAGE, failedResponse.getStatus().getMessage());
        assertEquals(TEST_SERVER_ERROR, failedResponse.getStatus().getInternalMessage());
        assertEquals(StatusEnum.FAILED.getCode(), failedResponse.getStatus().getCode());
    }

    @Test
    public void getFailedResp() {
        GenericResponse failedResponse = GenericResponse.getFailedResp(ERROR_BODY, TEST_MESSAGE, TEST_SERVER_ERROR, ERROR_CODE);
        assertNotNull(failedResponse);
        assertNotNull(failedResponse.getStatus());

        assertEquals(TEST_MESSAGE, failedResponse.getStatus().getMessage());
        assertEquals(TEST_SERVER_ERROR, failedResponse.getStatus().getInternalMessage());
        assertEquals(StatusEnum.FAILED.getCode(), failedResponse.getStatus().getCode());
        assertEquals(ERROR_BODY, failedResponse.getBody());
        assertEquals(ERROR_CODE, failedResponse.getStatus().getErrorCode());
    }

    @Test
    public void testGetFailedResponse() {
    }

    @Test
    public void testGetFailedResponse1() {
    }

    @Test
    public void getSuccessResponse() {
    }
}
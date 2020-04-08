package ae.rakbank.documentuploader.services.auth;

import ae.rakbank.documentuploader.dto.JwtPayload;
import ae.rakbank.documentuploader.dto.UserRole;
import ae.rakbank.documentuploader.exception.ApiException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static ae.rakbank.documentuploader.stub.JwtTokenStub.*;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AuthorizationServiceImplTest {

    @Autowired
    AuthorizationService authorizationService;

    @Test
    public void testAgentGetPrincipal() {
        JwtPayload principal = authorizationService.getPrincipal(getAgentJwtTokenStub());

        assertEquals(UserRole.AGENT, principal.getRole());

        assertEquals(TEST_ACCESS_TOKEN, principal.getOauthAccessToken());
        assertEquals(TEST_REFRESH_TOKEN, principal.getOauthRefreshToken());
        assertNull(principal.getPhoneNumber());
        assertNull(principal.getProspectId());
        assertEquals(TEST_EXPIRATION_TIME, principal.getOauthTokenExpiryTime());
    }

    @Test
    public void testCustomerGetPrincipal() {
        JwtPayload principal = authorizationService.getPrincipal(getCustomerJwtTokenStub());

        assertEquals(UserRole.CUSTOMER, principal.getRole());

        assertEquals(TEST_ACCESS_TOKEN, principal.getOauthAccessToken());
        assertEquals(TEST_PHONE_NUMBER, principal.getPhoneNumber());
        assertEquals(TEST_PROSPECT_ID, principal.getProspectId());
        assertEquals(TEST_EXPIRATION_TIME, principal.getOauthTokenExpiryTime());
    }

    @Test
    public void testValidateToken() {
        authorizationService.validateJwtToken(getCustomerJwtTokenStub());
        authorizationService.validateJwtToken(getAgentJwtTokenStub());
    }

    @Test(expected = ApiException.class)
    public void testValidateInvalidToken() {
        authorizationService.validateJwtToken(getInvalidTokenStub());
    }

    @Test(expected = ApiException.class)
    public void testValidateNoRoleToken() {
        authorizationService.validateJwtToken(getNoRoleJwtTokenStub());
    }

    @Test(expected = ApiException.class)
    public void testValidateCustomerNoPhoneToken() {
        authorizationService.validateJwtToken(getCustomerNoPhoneJwtTokenStub());
    }

    @Test(expected = ApiException.class)
    public void testValidateAgentNoAccessToken() {
        authorizationService.validateJwtToken(getAgentNoAccessJwtTokenStub());
    }
}

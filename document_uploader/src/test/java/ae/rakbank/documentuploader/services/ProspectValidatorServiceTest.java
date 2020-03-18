package ae.rakbank.documentuploader.services;

import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.stub.JwtTokenStub;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProspectValidatorServiceTest {

    @Autowired
    private ProspectValidatorService prospectValidatorService;

    @Test
    public void validateCustomerSuccessful() {
        String prospectId = "ABC01";
        prospectValidatorService.validate(JwtTokenStub.getCustomerJwtTokenWithProspect(prospectId), prospectId);
    }

    @Test(expected = ApiException.class)
    public void validateCustomerUnsuccessful() {
        String prospectIdInToken = "ABC01";
        String prospectIdInRequest = "ABC7777";
        prospectValidatorService.validate(JwtTokenStub.getCustomerJwtTokenWithProspect(prospectIdInToken), prospectIdInRequest);
    }

    @Test
    public void validateAgentSuccessful() {
        String prospectId = "ABC01";
        prospectValidatorService.validate(JwtTokenStub.getAgentJwtTokenWithoutProspect(), prospectId);
    }
}
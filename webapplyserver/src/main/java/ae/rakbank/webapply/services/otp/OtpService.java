package ae.rakbank.webapply.services.otp;

import com.fasterxml.jackson.databind.JsonNode;

import javax.servlet.http.HttpServletRequest;

public interface OtpService {
    OtpVerifyGenerateResponse verifyOrGenerate(HttpServletRequest httpRequest, JsonNode requestJSON);
}
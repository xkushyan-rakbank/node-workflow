package ae.rakbank.webapply.services.otp;

import com.fasterxml.jackson.databind.JsonNode;

public interface OtpService {

    OtpVerifyGenerateResponse verifyOrGenerate(JsonNode requestJSON);
}

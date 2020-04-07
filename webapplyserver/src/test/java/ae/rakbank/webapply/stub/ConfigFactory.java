package ae.rakbank.webapply.stub;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class ConfigFactory {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    public static ObjectNode newDocumentControllerConfig() {

        ObjectNode config = objectMapper.createObjectNode();
        ObjectNode dehURIs = objectMapper.createObjectNode();

        dehURIs.put("getProspectDocumentsUri", "/deh-uri");
        dehURIs.put("getProspectDocumentByIdUri", "/deh-uri-by-id");

        config.set("DehURIs", dehURIs);
        config.set("BaseURLs", objectMapper.createObjectNode().set("local", objectMapper.createObjectNode().put("DehBaseUrl", "http://deh-test-url")));

        return config;

    }

    public static ObjectNode newWebapplyControllerConfig() {

        ObjectNode config = objectMapper.createObjectNode();
        ObjectNode dehURIs = objectMapper.createObjectNode();

        dehURIs.put("getProspectDocumentsUri", "/deh-uri");
        dehURIs.put("getProspectDocumentByIdUri", "/deh-uri-by-id");
        dehURIs.put("authenticateUserUri", "/login");

        config.set("DehURIs", dehURIs);
        config.set("BaseURLs", objectMapper.createObjectNode().set("local", objectMapper.createObjectNode().put("DehBaseUrl", "http://deh-test-url")));

        return config;

    }

    public static JsonNode newProspectControllerConfig() {
        ObjectNode config = objectMapper.createObjectNode();
        ObjectNode dehURIs = objectMapper.createObjectNode();

        dehURIs.put("createProspectUri", "/deh-uri");
        dehURIs.put("getProspectUri", "/deh-uri");
        dehURIs.put("updateProspectUri", "/deh-uri");
        dehURIs.put("searchProspectUri", "/deh-uri");
        dehURIs.put("otpUri", "/otp");

        config.set("DehURIs", dehURIs);
        config.set("BaseURLs", objectMapper.createObjectNode().set("local", objectMapper.createObjectNode().put("DehBaseUrl", "http://deh-test-url")));

        return config;

    }

    public static JsonNode newOtpConfigEnabled() {
        ObjectNode config = objectMapper.createObjectNode();
        ObjectNode dehURIs = objectMapper.createObjectNode();

        dehURIs.put("otpUri", "/otp");

        config.set("DehURIs", dehURIs);
        config.set("OtherConfigs", objectMapper.createObjectNode()
                .set("local", objectMapper.createObjectNode()
                        .put("OAuthUsername", "theoauthusername")
                        .put("OAuthPassword", "theoauthpassword")
                        .put("JwtSecret", "1234")
                        .put("OtpEnabled", "Y")));
        config.set("BaseURLs", objectMapper.createObjectNode().set("local", objectMapper.createObjectNode().put("DehBaseUrl", "http://deh-test-url")));

        return config;
    }

    public static JsonNode newOtpConfigDisabled() {
        ObjectNode config = objectMapper.createObjectNode();
        ObjectNode dehURIs = objectMapper.createObjectNode();

        dehURIs.put("otpUri", "/otp");

        config.set("DehURIs", dehURIs);
        config.set("OtherConfigs", objectMapper.createObjectNode()
                .set("local", objectMapper.createObjectNode()
                        .put("OAuthUsername", "theoauthusername")
                        .put("OAuthPassword", "theoauthpassword")
                        .put("JwtSecret", "1234")
                        .put("OtpEnabled", "N")));
        config.set("BaseURLs", objectMapper.createObjectNode().set("local", objectMapper.createObjectNode().put("DehBaseUrl", "http://deh-test-url")));

        return config;
    }

    public static JsonNode newOtherConfig() {
        return objectMapper.createObjectNode()
                .set("OtherConfigs", objectMapper.createObjectNode()
                        .set("local", objectMapper.createObjectNode()
                                .put("OAuthUsername", "theoauthusername")
                                .put("OAuthPassword", "theoauthpassword")
                                .put("JwtSecret", "1234")
                                .put("OtpEnabled", "Y")));
    }

    public static JsonNode newRecaptchaConfig() {
        ObjectNode config = objectMapper.createObjectNode();
        config.set("OtherConfigs", objectMapper.createObjectNode()
                .set("local", objectMapper.createObjectNode()
                        .put("ReCaptchaEnable", "Y")
                        .put("ReCaptchaSiteKey", "re-captcha-site-key")));
        config.set("BaseURLs", objectMapper.createObjectNode().set("local",
                objectMapper.createObjectNode()
                        .put("DehBaseUrl", "http://deh-test-url")
                        .put("TermsConditionsUrl", "http://TermsConditionsUrl")
                        .put("ServicePricingGuideUrl", "http://ServicePricingGuideUrl")
                        .put("RAKvaluePlusReadMoreUrl", "http://RAKvaluePlusReadMoreUrl")
                        .put("RAKvalueMaxReadMoreUrl", "http://RAKvalueMaxReadMoreUrl")
                        .put("RAKvaluePlusIslamicReadMoreUrl", "http://RAKvaluePlusIslamicReadMoreUrl")
                        .put("RAKvalueMaxIslamicReadMoreUrl", "http://RAKvalueMaxIslamicReadMoreUrl")
        ));
        return config;
    }

    public static JsonNode newRecaptchaSMEConfig() {
        return objectMapper.createObjectNode()
                .put("smeTest", true);
    }

    public static JsonNode newRecaptchaServiceConfig() {
        ObjectNode objectNode = objectMapper.createObjectNode();

        objectNode.set("ReCaptchaURIs", objectMapper.createObjectNode().put("siteVerifyUri", "/siteVerifyUri"));

        objectNode.set("BaseURLs", objectMapper.createObjectNode().set("local",
                objectMapper.createObjectNode()
                        .put("ReCaptchaUrl", "http://ReCaptchaUrl")
        ));

        return objectNode
                .set("OtherConfigs", objectMapper.createObjectNode()
                        .set("local", objectMapper.createObjectNode()
                                .put("ReCaptchaSecret", "recaptcha-secret")));
    }

    public static JsonNode newAdviceControllerConfigWithStackTraceEnabled() {
        return objectMapper.createObjectNode()
                .set("OtherConfigs", objectMapper.createObjectNode()
                        .set("local", objectMapper.createObjectNode()
                                .put("ShouldSendErrorDebugDetails", "true")));
    }

    public static JsonNode newAdviceControllerConfigWithStackTraceDisabled() {
        return objectMapper.createObjectNode()
                .set("OtherConfigs", objectMapper.createObjectNode()
                        .set("local", objectMapper.createObjectNode()
                                .put("ShouldSendErrorDebugDetails", "")));
    }

    public static JsonNode newStartUpValidatioConfig() {
        final ObjectNode config = objectMapper.createObjectNode();
        config.set("OtherConfigs", objectMapper.createObjectNode()
                .set("local", objectMapper.createObjectNode()
                        .put("OAuthRefreshGrantType", "OAuthRefreshGrantType")
                        .put("OAuthGrantType", "OAuthGrantType")
                        .put("OAuthClientId", "OAuthClientId")
                        .put("OAuthClientSecret", "OAuthClientSecret")
                        .put("OAuthBankId", "OAuthBankId")
                        .put("OAuthChannelId", "OAuthChannelId")
                        .put("OAuthLangId", "OAuthLangId")
                        .put("OAuthLoginFlag", "OAuthLoginFlag")
                        .put("OAuthLoginType", "OAuthLoginType")
                        .put("OAuthStateMode", "OAuthStateMode")
                        .put("OAuthUsername", "OAuthUsername")
                        .put("OAuthPassword", "OAuthPassword")
                        .put("ReCaptchaEnable", "ReCaptchaEnable")
                        .put("ReCaptchaSiteKey", "ReCaptchaSiteKey")
                        .put("ReCaptchaSecret", "ReCaptchaSecret")
                        .put("RSAPublicKeyFilename", "RSAPublicKeyFilename")
                        .put("JwtSecret", "JwtSecret")
                        .put("OtpEnabled", "OtpEnabled")
                ));

        config.set("DehURIs", objectMapper.createObjectNode()
                .put("generateTokenUri", "generateTokenUri")
        );

        config.set("ReCaptchaURIs", objectMapper.createObjectNode()
                .put("rsaPublicKeyUri", "generateTokenUri")
        )

        ;
        config.set("RSAPublicKeyURIs", objectMapper.createObjectNode()
                .put("ReCaptchaURIs", "generateTokenUri")
        );

        config.set("OAuthURIs", objectMapper.createObjectNode()
                .put("datalistUri", "datalistUri")
                .put("createProspectUri", "createProspectUri")
                .put("searchProspectUri", "searchProspectUri")
                .put("getProspectUri", "getProspectUri")
                .put("updateProspectUri", "updateProspectUri")
                .put("reuploadDocumentUri", "reuploadDocumentUri")
                .put("getProspectDocumentByIdUri", "getProspectDocumentByIdUri")
                .put("prescreeningUri", "prescreeningUri")
                .put("authenticateUserUri", "authenticateUserUri")
                .put("getDocumentByTitleUri", "getDocumentByTitleUri")
                .put("otpUri", "otpUri")
        );

        return config.set("BaseURLs", objectMapper.createObjectNode()
                .set("local", objectMapper.createObjectNode()
                        .put("WebApplyBaseUrl", "WebApplyBaseUrl")
                        .put("DehBaseUrl", "DehBaseUrl")
                        .put("OAuthBaseUrl", "OAuthBaseUrl")
                        .put("ReCaptchaUrl", "ReCaptchaUrl")
                        .put("RAKvaluePlusReadMoreUrl", "RAKvaluePlusReadMoreUrl")
                        .put("RAKvalueMaxReadMoreUrl", "RAKvalueMaxReadMoreUrl")
                        .put("RAKvaluePlusIslamicReadMoreUrl", "RAKvaluePlusIslamicReadMoreUrl")
                        .put("RAKvalueMaxIslamicReadMoreUrl", "RAKvalueMaxIslamicReadMoreUrl")
                        .put("TermsConditionsUrl", "TermsConditionsUrl")
                        .put("ServicePricingGuideUrl", "ServicePricingGuideUrl")
                ));
    }
}

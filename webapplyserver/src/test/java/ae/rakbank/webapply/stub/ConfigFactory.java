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
        dehURIs.put("createInviteUri", "/deh-uri");

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
        dehURIs.put("createInviteUri", "/deh-uri");

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

    public static JsonNode newStartUpValidValidatioConfig() {
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
                        .put("ShouldSendErrorDebugDetails", "ShouldSendErrorDebugDetails")
                        .put("ApplicationLoggingLevel", "ApplicationLoggingLevel")
                ));

        config.set("BaseURLs", objectMapper.createObjectNode()
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

        config.set("OAuthURIs", objectMapper.createObjectNode()
                .put("generateTokenUri", "generateTokenUri")
        );

        config.set("ReCaptchaURIs", objectMapper.createObjectNode()
                .put("siteVerifyUri", "siteVerifyUri")
        )

        ;
        config.set("RSAPublicKeyURIs", objectMapper.createObjectNode()
                .put("rsaPublicKeyUri", "rsaPublicKeyUri")
        );

        config.set("DehURIs", objectMapper.createObjectNode()
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
                .put("getProspectDocumentsUri", "getProspectDocumentsUri")
                .put("uploadDocumentUri", "uploadDocumentUri")
                .put("otpUri", "otpUri")
                .put("createInviteUri", "createInviteUri")
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

    public static JsonNode newStartUpValidValidatioConfigOnOfValueIsEMpty() {
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
                        .put("OAuthLoginType", "")
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

        config.set("BaseURLs", objectMapper.createObjectNode()
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
                        .put("OAuthUsername", "")
                        .put("OAuthPassword", "OAuthPassword")
                        .put("ReCaptchaEnable", "ReCaptchaEnable")
                        .put("ReCaptchaSiteKey", "ReCaptchaSiteKey")
                        .put("ReCaptchaSecret", "ReCaptchaSecret")
                        .put("RSAPublicKeyFilename", "RSAPublicKeyFilename")
                        .put("JwtSecret", "JwtSecret")
                        .put("OtpEnabled", "")
                ));

        config.set("OAuthURIs", objectMapper.createObjectNode()
                .put("generateTokenUri", "generateTokenUri")
        );

        config.set("ReCaptchaURIs", objectMapper.createObjectNode()
                .put("siteVerifyUri", "siteVerifyUri")
        )

        ;
        config.set("RSAPublicKeyURIs", objectMapper.createObjectNode()
                .put("rsaPublicKeyUri", "rsaPublicKeyUri")
        );

        config.set("DehURIs", objectMapper.createObjectNode()
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
                .put("getProspectDocumentsUri", "getProspectDocumentsUri")
                .put("uploadDocumentUri", "uploadDocumentUri")
                .put("otpUri", "otpUri")
                .put("createInviteUri", "createInviteUri")
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

    public static JsonNode newStartUpInValidValidatioConfig() {
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

    public static String rsaPublicKey() {
        return "-----BEGIN PRIVATE KEY-----\n" +
                "MIIJRAIBADANBgkqhkiG9w0BAQEFAASCCS4wggkqAgEAAoICAQDfSJCNoTNOHEVj\n" +
                "WCi64Tf/suV7tmFWJQBNhjtDNndSxfrbcaLn/rbiyY1AMkBtgOHTBZvCc14kk6bY\n" +
                "NglgOV3PrtujymawTNG8BFbHiEL7gV13TTeyC5AkdyvtGCD6Dn4v3XZVmaZ1bdzU\n" +
                "fi/og7Mcg2Vr4dRN4MrD93+sOL+QTqx940Py0wKjmFsqREh7fnptjKgQwfBjV/9+\n" +
                "yzRPlD/AZY/Au9nAkcO/i8MSuvC/vFwL8Lm/09EddE2ZyFjKLeWFWoMVsuKV9Kt4\n" +
                "PrN0gFe8ECDMZv06935SprmO7+/2PLjxbsygkuCRmkJis2vqmTiZTBTqfpqvc15V\n" +
                "CNfGLC/WLLJPYzTYgqUJYQyji2tyj3paGvb17v2DfZL++kDkBv6NTXY3Vf4v6pFw\n" +
                "e2Wjd0ue30QoVhUQbEuXWGZUSmQnSsZGtBaKSQ/DRur5yxbQaMVexVpaXh5o5b0z\n" +
                "iJq9JFhvrgEGlnheCW1yJ5J1BanffKvO+GH7Qw/M7GSbHLJz9nuynVZZuzgXPnKa\n" +
                "7Kv7Gc/uRg2Gikw4GCYi+NfQNlM4L3RBoeG2K3frUZtZJ4lB9f2gJgxpBBGDdb6Z\n" +
                "OhQxr+GgQRFjZAl/U2nxj5w5utuHA9BaNA4gUr8jQwA+gNQW+1Xb/GD6E+jGhqw3\n" +
                "+gELrC8GGvVn1HZQ5YSb7ZxvPyZkWQIDAQABAoICAQCc+8rOGOEWcOAEKc5xHbme\n" +
                "aCvaH+8tftRIrTBrYBbitllaAfo0PCxfJK/Py8TqeGvNTqslOrGc68apSsyqv4qK\n" +
                "Yvj/nmU2XLw1AaP1o4LciyaoozyeTGzqhnL2vjkpNhlYE8+H/YBAHZ7eM14Bjt7W\n" +
                "FDexctQucPZ+cztrXXapwfaah7eVOPApDwxBmkKPuOvgq7zaE1CsuAjlH39G2Ac+\n" +
                "gOlh63D8aD+FI4FiYNa1J3xb1MLz8LuchtGsZmSuuTge2vVAw0V1gtEvuH25Uibd\n" +
                "DUXSEDLIS4ugFqJtsZo3uJea/3iVCM8k75zvAhDEnzdg6FHoUFz3MBjJlm8GYLi7\n" +
                "/n/aYkSpK671FL182fxOPBcuPFgwyzIyHIfymxH/tJ8YKbS5qXC242Iv1nht9mYB\n" +
                "RU6QpA2wRYU2Im54Q9nZ1x7t5RBpwLOopIFpraMgh4BHXMxNiORHAn6pDLGkcj+3\n" +
                "v8GCO4zA+LcAUhXpkVN5oXNd0JgJ4JZiz5DXTHJyv9YKan+HHl7woqAjOzTP1kCS\n" +
                "WxRWNWfAR0uYX/8RcW2k3/JmM0DPqj6UpxRQ+GjqiNKfmVXjQv3xAXyLCliEV3DS\n" +
                "etf5xC00VzXAKnYiM6IJxfwfTjOrzjwz8IbOgZp/WLLOJWZCmpHCr5hL49jnC4Df\n" +
                "H7TeQSlNkP4+NeFogukNFQKCAQEA/Gst94Qt7xPoRCY9dRQz+9K7RvKHIFOvRXt0\n" +
                "tZLNp0GCXwLlDR8aFQPcZJnwWzCINmEuJvlvUIfKZB1e4ai9i6q++AjPD+nCXIto\n" +
                "QStHXi+TaRb9HW1Aj2g8hXCWVb58Mdv3F5o2J0u5KumAs+imk7L03vrA9wR/fNQi\n" +
                "6ptTwX8KsVIRgva4LH3d40J+DBNX2FGukJKC0R+Qmy1poRgkdPO9gJIsUUgl6Ufs\n" +
                "+HGZLBm07NkQd3hfpE/RQLo73VzXUnVOjR8b+gkP5vYvLbiwPx3+nZpWONpVgkIj\n" +
                "fDfOAfpVKv0n4rg+JHNhn5KovQnDJ55lePiw5ulaOC2mnTWm+wKCAQEA4nOP1po0\n" +
                "9Kwqbo1ZzloWfRcCWp4/ZYBE3endOTyuZxQ0g1asTmcs9+7Be5hgknEEpriCFXiZ\n" +
                "qZDa0Xff3fYXQJ4EMsJ4zqI4ilsLg1k2uKzhRcN3F5n8AJVtW2OG2k/1GV1b0/fF\n" +
                "b3gHLMXeifEH/Zh9F+jVYxJsRucK5edIX+suYh0V+mgUVCw1obA7U6lCwL8WMpiU\n" +
                "dsSz3s4OX9rGUIyVME/FtLR8Y1NiKDQmf46LVYcJc0XwqCYzhq4DC7Ar5sdkVpoR\n" +
                "oWHzoYkNZEVfTKDcTi5Z//sdhU0exu8ptyK9jyqsQd3NwL1IOf3JCHKaGl7IOzDq\n" +
                "eyj7P3Xko2BRuwKCAQEA7/Z4cYjgHht/wGHWJRp6vNi+HxlrKmlEA7r03bTc+zdE\n" +
                "2EwpMksyAW51M9JAdIBzzbafKIASua0N1BUz4TUIVOGSwLunFUq18kK5btLU+w4h\n" +
                "hlNLd5EoQeznNDgvQv5elQu3IGIDP2I2ezwWlXIEAf+r2NrrXSmShToqo3vcqOO8\n" +
                "Z4xMh4NC3VEfAvBwYcx1w3kLifcuk939G/iVJYeNCP26VqMfrHn5SIePGTTtV8Zs\n" +
                "gIlupRTzX4JdvLoPNUcQkBxi+7fqYc4BpyC9AytDqg06w9s4Qr4Vckqr72gh2TGB\n" +
                "i+e05k0fDon98bR745KHS3/Cmblae3q1wRhs/6FExwKCAQA8wiTlv5pVy5vW7bYa\n" +
                "17EQ/wtypOL9qNzRbd4dbVqd7Z3pX2f74VL/cuAW+Vtv70MAOKEugZ05EdSkPzWh\n" +
                "qFW00LDvrZ4cUwo4lRURuO4lvrzyqu9ZNceXoIAm9R1Jlgp9M79fsCsZLWs/aBe9\n" +
                "ix5JvJBTyfT3EApdO8CAzv1sPv3C9WrgNOy/aN069L32RIPUk3CxQp8S/tQEA+V3\n" +
                "coujMRUWUVEKmyKEw+qiPtvVfbmEySaP90QK2bUZfbbze+FLmlQhqFTyqAVmYg9l\n" +
                "x/c56C80Ctu7AvV4vqhzV9gpevjBYQG26nw6Ko8mgCFgUt9mE+hFeWpwgR5oeIlQ\n" +
                "DJfhAoIBAQC4DrYpe9xUNxFE84ZmCBeI9fQlDuw9QQxKc5bNskL1ISRbEyhd5MdH\n" +
                "UJiTgn8oPqHCVZ+1kibZyEoK+FIEEvihzVSVQBQHwgH7njzsUuylWOJ0uA71V+XM\n" +
                "dB7kAZAtQiuzEdKRW4VhE0fy1FHNuI03TFu5Z3IGYGawJh28aBZXXh8/oMK+/dVR\n" +
                "4JfwuzX5K8t6QOpFD14PURRvLokX4wZEQ+nkYloNmUZisIyL6YXxFW4A/6hIQoov\n" +
                "z45ZenXZohy65Z43jtvQovhtrkLzAJRlsozqGN7GQLIXOpv92KH6yz/rMKQSylcI\n" +
                "V9K74Jtcr818qQ8Zw7y2cp9SWRynFv1y\n" +
                "-----END PRIVATE KEY-----\n";
    }

}

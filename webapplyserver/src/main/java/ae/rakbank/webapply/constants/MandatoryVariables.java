package ae.rakbank.webapply.constants;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MandatoryVariables {

    private MandatoryVariables() {
    }

    public static final List<String> BASE_URLS_LIST = Collections.unmodifiableList(Arrays.asList(
            "WebApplyBaseUrl",
            "DehBaseUrl",
            "OAuthBaseUrl",
            "ReCaptchaUrl",
            "RAKvaluePlusReadMoreUrl",
            "RAKvalueMaxReadMoreUrl",
            "RAKvaluePlusIslamicReadMoreUrl",
            "RAKvalueMaxIslamicReadMoreUrl",
            "TermsConditionsUrl",
            "ServicePricingGuideUrl"));

    public static final List<String> DEH_URIS_LIST = Collections.unmodifiableList(Arrays.asList(
            "datalistUri",
            "createProspectUri",
            "searchProspectUri",
            "getProspectUri",
            "updateProspectUri",
            "getProspectDocumentsUri",
            "uploadDocumentUri",
            "reuploadDocumentUri",
            "getProspectDocumentByIdUri",
            "prescreeningUri",
            "authenticateUserUri",
            "getDocumentByTitleUri",
            "otpUri"));

    public static final List<String> OAUTH_URIS_LIST = Collections.singletonList(
            "generateTokenUri");

    public static final List<String> RE_CAPTCHA_URIS_LIST = Collections.singletonList(
            "siteVerifyUri");

    public static final List<String> RSA_PUBLIC_KEY_URIS_LIST = Collections.singletonList(
            "rsaPublicKeyUri");

    public static final List<String> OTHER_CONFIGS_LIST = Collections.unmodifiableList(Arrays.asList(
            "OAuthRefreshGrantType",
            "OAuthGrantType",
            "OAuthClientId",
            "OAuthClientSecret",
            "OAuthBankId",
            "OAuthChannelId",
            "OAuthLangId",
            "OAuthLoginFlag",
            "OAuthLoginType",
            "OAuthStateMode",
            "OAuthUsername",
            "OAuthPassword",
            "ReCaptchaEnable",
            "ReCaptchaSiteKey",
            "ReCaptchaSecret",
            "RSAPublicKeyFilename",
            "JwtSecret",
            "OtpEnabled",
            "ShouldSendErrorDebugDetails",
            "ApplicationLoggingLevel"));
}

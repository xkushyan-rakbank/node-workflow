package ae.rakbank.documentuploader.constants;

import java.util.Arrays;
import java.util.List;

public class MandatoryVariables {

    private MandatoryVariables() {
    }

    public static final List<String> BASE_URLS_LIST = Arrays.asList(
            "s3BaseUrl");

    public static final List<String> OTHER_CONFIGS_LIST = Arrays.asList(
            "s3AccessKeyId",
            "s3SecretKey",
            "s3Uri",
            "s3Bucket",
            "JwtSecret",
            "ShouldSendErrorDebugDetails",
            "ApplicationLoggingLevel");
}

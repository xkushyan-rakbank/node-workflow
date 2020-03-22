package ae.rakbank.documentuploader.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.nio.file.Paths;

@Slf4j
public class EnvUtil {

    private EnvUtil() {
    }

    private static String env = System.getenv("WEB_APPLY_ENV");

    private static String webApplyDir = System.getenv("WEB_APPLY_DIR");

    static {
        if (StringUtils.isBlank(webApplyDir)) {
            webApplyDir = Paths.get("").toAbsolutePath().toString();
            log.error("System property 'WEB_APPLY_DIR' not configured, load config files from classpath: {}", webApplyDir);
        }
        if (StringUtils.isBlank(env)) {
            env = "local";
            log.error("System property 'WEB_APPLY_ENV' not configured, defaulted to 'local'. Allowed values dev, uat, test or prod");
        } else {
            env = env.toLowerCase();
        }
        log.info("$WEB_APPLY_ENV={}, $WEB_APPLY_DIR={}", env, webApplyDir);
        createDirs();
    }

    private static void createDirs() {
        File configDirectory = new File(webApplyDir + "/config/");
        if (!configDirectory.exists()) {
            configDirectory.mkdir();
        }

        File uploadsDirectory = new File(webApplyDir + "/uploads/");
        if (!uploadsDirectory.exists()) {
            uploadsDirectory.mkdir();
        }

        File scannedDocsDirectory = new File(webApplyDir + "/scanned_docs/");
        if (!scannedDocsDirectory.exists()) {
            scannedDocsDirectory.mkdir();
        }

        File s3ObjectsDirectory = new File(webApplyDir + "/s3_objects/");
        if (!s3ObjectsDirectory.exists()) {
            s3ObjectsDirectory.mkdir();
        }
    }

    public static String getEnv() {
        return env;
    }

    static String getConfigDir() {
        if (StringUtils.isNotBlank(webApplyDir)) {
            return webApplyDir + "/config/";
        } else {
            log.error("{}/config/ not found.", webApplyDir);
        }
        return "";
    }

    public static String getUploadDir() {
        if (StringUtils.isNotBlank(webApplyDir)) {
            return webApplyDir + "/uploads/";
        } else {
            log.error("{}/uploads/ not found.", webApplyDir);
        }
        return "";
    }

    public static String getScannedDocsDir() {
        if (StringUtils.isNotBlank(webApplyDir)) {
            return webApplyDir + "/scanned_docs/";
        } else {
            log.error("{}/scanned_docs/ not found.", webApplyDir);
        }
        return "";
    }

    public static String getS3ObjectsDir() {
        if (StringUtils.isNotBlank(webApplyDir)) {
            return webApplyDir + "/s3_objects/";
        }
        return "";
    }

    public static String getWebApplyDir() {
        return webApplyDir;
    }

    public static boolean isProd() {
        return "prod".equalsIgnoreCase(env);
    }

    public static boolean isRecaptchaEnable() {
        String env = System.getenv("RECAPTCHA_ENABLE");
        return !StringUtils.isEmpty(env) && env.equals("Y");
    }
}

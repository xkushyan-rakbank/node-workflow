package ae.rakbank.webapply.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

@Slf4j
public class EnvUtil {

    private EnvUtil() {
    }

    private static String env = System.getenv("WEB_APPLY_ENV");

    private static final String WEB_APPLY_DIR = System.getenv("WEB_APPLY_DIR");

    static {
        if (StringUtils.isBlank(WEB_APPLY_DIR)) {
            log.error("System property 'WEB_APPLY_DIR' not configured, load config files from classpath:");
        }
        if (StringUtils.isBlank(env)) {
            env = "local";
            log.error("System property 'WEB_APPLY_ENV' not configured, defaulted to 'local'. Allowed values dev, uat, test or prod");
        } else {
            env = env.toLowerCase();
        }
        log.info("$WEB_APPLY_ENV={}, $WEB_APPLY_DIR={}", env, WEB_APPLY_DIR);
    }

    public static String getEnv() {
        return env;
    }

    static String getConfigDir() {
        if (StringUtils.isNotBlank(WEB_APPLY_DIR)) {
            return WEB_APPLY_DIR + "/config/";
        }
        return "";
    }

    public static boolean isProd() {
        return "prod".equalsIgnoreCase(env);
    }

    public static boolean isRecaptchaEnable() {
        String env = System.getenv("RECAPTCHA_ENABLE");
        return !StringUtils.isEmpty(env) && env.equals("Y");
    }
}

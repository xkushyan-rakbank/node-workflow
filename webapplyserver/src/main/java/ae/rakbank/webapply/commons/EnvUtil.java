package ae.rakbank.webapply.commons;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EnvUtil {

	private static final Logger logger = LoggerFactory.getLogger(EnvUtil.class);

	private static String env = System.getenv("WEB_APPLY_ENV");

	private static final String WEB_APPLY_DIR = System.getenv("WEB_APPLY_DIR");

	static {
		if (StringUtils.isBlank(WEB_APPLY_DIR)) {
			logger.error("System property 'WEB_APPLY_DIR' not configured, load config files from classpath:");
		}

		if (StringUtils.isBlank(env)) {
			env = "local";
			logger.error(
					"System property 'WEB_APPLY_ENV' not configured, defaulted to 'local'. Allowed values dev, uat, test or prod");
		} else {
			env = env.toLowerCase();
		}

		logger.info(String.format("$WEB_APPLY_ENV=%s, $WEB_APPLY_DIR=%s", env, WEB_APPLY_DIR));
	}

	public static String getEnv() {
		return env;
	}

	public static String getConfigDir() {
		if (StringUtils.isNotBlank(WEB_APPLY_DIR)) {
			return WEB_APPLY_DIR + "/config/";
		}
		return "";
	}

	public static boolean isProd() {
		if ("prod".equalsIgnoreCase(env)) {
			return true;
		}
		return false;
  }
  
  public static boolean isRecaptchaEnable() {
	  String env = System.getenv("RECAPTCHA_ENABLE");

    return !StringUtils.isEmpty(env) && env.equals("Y");
  }

  public static boolean isCheckRecaptcha() {
    return false;
  }

}

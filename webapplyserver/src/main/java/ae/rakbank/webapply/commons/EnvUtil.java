package ae.rakbank.webapply.commons;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EnvUtil {

	private static final Logger logger = LoggerFactory.getLogger(EnvUtil.class);

	private static String env = System.getenv("WEB_APPLY_ENV");

	private static String configDir = System.getenv("WEB_APPLY_CONFIG_DIR");

	static {
		if (StringUtils.isBlank(env)) {
			env = "local";
			logger.error(
					"System property 'ENV' not configured, defaulted to 'local'. Allowed values dev, uat, test or prod");
		} else {
			env = env.toLowerCase();
		}
	}

	public static String getEnv() {
		return env;
	}

	public static String getConfigDir() {
		return configDir;
	}

	public static boolean isProd() {
		if ("prod".equalsIgnoreCase(env)) {
			return true;
		}
		return false;
	}
}

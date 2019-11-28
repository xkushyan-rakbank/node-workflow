package ae.rakbank.documentuploader.commons;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;

@Component
public class EnvironmentUtil {
    private static final Logger logger = LoggerFactory.getLogger(EnvironmentUtil.class);

    @Value("${webapply.dir}")
    private String webApplyDir;

    @Value("${webapply.env}")
    private String webApplyEnv;

    @PostConstruct
    public void initEnviromentUtilState() {
        logger.info("WEBAPPLY_DIR = " + webApplyDir);
        logger.info("WEBAPPLY_ENV = " + webApplyEnv);
        createDirs();
    }

    public String getWebApplyDir() {
        return webApplyDir;
    }

    public String getWebApplyEnv() {
        return webApplyEnv;
    }

    private void createDirs() {
        File configDirectory = new File(webApplyDir + "/config/");
        if (! configDirectory.exists()){
            configDirectory.mkdir();
        }

        File uploadsDirectory = new File(webApplyDir + "/uploads/");
        if (! uploadsDirectory.exists()){
            uploadsDirectory.mkdir();
        }

        File scannedDocsDirectory = new File(webApplyDir + "/scanned_docs/");
        if (!scannedDocsDirectory.exists()){
            scannedDocsDirectory.mkdir();
        }

        File s3ObjectsDirectory = new File(webApplyDir + "/s3_objects/");
        if (!s3ObjectsDirectory.exists()){
            s3ObjectsDirectory.mkdir();
        }
    }

    public String getConfigDir() {
        if (StringUtils.isNotBlank(webApplyDir)) {
            return webApplyDir + "/config/";
        } else {
            logger.error(webApplyDir + "/config/ not found.");
        }
        return "";
    }

    public String getUploadDir() {
        if (StringUtils.isNotBlank(webApplyDir)) {
            return webApplyDir + "/uploads/";
        } else {
            logger.error(webApplyDir + "/uploads/ not found.");
        }
        return "";
    }

    public String getScannedDocsDir() {
        if (StringUtils.isNotBlank(webApplyDir)) {
            return webApplyDir + "/scanned_docs/";
        } else {
            logger.error(webApplyDir + "/scanned_docs/ not found.");
        }
        return "";
    }

    public String getS3ObjectsDir() {
        if (StringUtils.isNotBlank(webApplyDir)) {
            return webApplyDir + "/s3_objects/";
        }
        return "";
    }

    public boolean isWebApplyEnvProd() {
        return webApplyEnv.equalsIgnoreCase("prod");
    }

}

package ae.rakbank.documentuploader.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;

@Slf4j
@Component
public class EnvironmentUtil {

    @Value("${webapply.dir}")
    private String webApplyDir;

    @Value("${webapply.env}")
    private String webApplyEnv;

    @PostConstruct
    public void initEnviromentUtilState() {
        log.info("WEBAPPLY_DIR = {}", webApplyDir);
        log.info("WEBAPPLY_ENV = {}", webApplyEnv);
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

    String getConfigDir() {
        if (StringUtils.isNotBlank(webApplyDir)) {
            return webApplyDir + "/config/";
        } else {
            log.error("{}/config/ not found.", webApplyDir);
        }
        return "";
    }

    public String getUploadDir() {
        if (StringUtils.isNotBlank(webApplyDir)) {
            return webApplyDir + "/uploads/";
        } else {
            log.error("{}/uploads/ not found.", webApplyDir);
        }
        return "";
    }

    public String getScannedDocsDir() {
        if (StringUtils.isNotBlank(webApplyDir)) {
            return webApplyDir + "/scanned_docs/";
        } else {
            log.error("{}/scanned_docs/ not found.", webApplyDir);
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

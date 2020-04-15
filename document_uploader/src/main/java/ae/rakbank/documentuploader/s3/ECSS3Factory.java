package ae.rakbank.documentuploader.s3;

import java.net.URI;
import java.net.URISyntaxException;

import javax.annotation.PostConstruct;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.emc.object.s3.S3Client;
import com.emc.object.s3.S3Config;
import com.emc.object.s3.jersey.S3JerseyClient;
import com.fasterxml.jackson.databind.JsonNode;

import ae.rakbank.documentuploader.util.FileUtil;

import static ae.rakbank.documentuploader.constants.ConfigurationKeys.OTHER_CONFIGS;

@Slf4j
@Component
@RequiredArgsConstructor
public class ECSS3Factory {

    private final FileUtil fileUtil;

    @Value("${webapply.dir}")
    private String webApplyDir;
    @Value("${webapply.env}")
    private String webApplyEnv;

    private String s3AccessKeyId = "";
    private String s3SecretKey = "";
    private String s3Url = "";
    private String s3Bucket = "";

    @PostConstruct
    public void initAppState() {
        log.info("Configuring initial state");
        log.info("WEBAPPLY_DIR = {}", webApplyDir);
        log.info("WEBAPPLY_ENV = {}", webApplyEnv);

        JsonNode docUploadConfig = fileUtil.getAppConfigJSON();
        JsonNode otherConfigs = docUploadConfig.get(OTHER_CONFIGS).get(webApplyEnv);
        s3AccessKeyId = otherConfigs.get("s3AccessKeyId").asText();
        s3SecretKey = otherConfigs.get("s3SecretKey").asText();
        s3Bucket = otherConfigs.get("s3Bucket").asText();
        s3Url = docUploadConfig.get("BaseURLs").get(webApplyEnv).get("s3BaseUrl").asText()
                + otherConfigs.get("s3Uri").asText();
    }

    S3Client getS3Client() throws URISyntaxException {
        S3Config config = new S3Config(new URI(s3Url));
        config.withIdentity(s3AccessKeyId).withSecretKey(s3SecretKey);

        return new S3JerseyClient(config);
    }

    String getS3Bucket() {
        return s3Bucket;
    }
}

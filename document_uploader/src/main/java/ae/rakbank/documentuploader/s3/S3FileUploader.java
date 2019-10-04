package ae.rakbank.documentuploader.s3;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.emc.object.s3.S3Client;

/**
 * 
 * https://github.com/EMCECS/ecs-samples
 *
 */
@Component
@EnableAsync
public class S3FileUploader {

	private static final Logger logger = LoggerFactory.getLogger(S3FileUploader.class);

	@Value("${s3.source.dir}")
	String s3SourceDir;

	@Async
	@Scheduled(cron = "0 0/5 * * * ?")
	public void uploadFilesToS3Bucket() throws InterruptedException {
		try {
			Files.newDirectoryStream(Paths.get(s3SourceDir)).forEach(path -> {
				File file = path.toFile();
				if (!file.getName().startsWith("_")) {

					try {
						S3Client s3 = ECSS3Factory.getS3Client();

						// retrieve object key/value from user
						String key = file.getName();
						byte[] content = FileUtils.readFileToByteArray(file);

						// create the object in the demo bucket
						s3.putObject(ECSS3Factory.S3_BUCKET, key, content, null);

						logger.info(String.format("created object [%s/%s] for file [%s]", ECSS3Factory.S3_BUCKET, key,
								file.getName()));

					} catch (URISyntaxException e) {
						logger.error("error in getS3Client ", e);
					} catch (IOException e) {
						logger.error("error in reading file content ", e);
					}
				}
			});
		} catch (Exception e) {
			logger.error("error occured while reading from " + s3SourceDir, e);
		}
	}
}

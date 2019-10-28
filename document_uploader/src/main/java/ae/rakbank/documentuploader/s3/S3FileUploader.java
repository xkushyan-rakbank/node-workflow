package ae.rakbank.documentuploader.s3;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.activation.MimetypesFileTypeMap;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.emc.object.s3.S3Client;

import ae.rakbank.documentuploader.commons.EnvUtil;

/**
 * 
 * https://github.com/EMCECS/ecs-samples
 *
 */
@Component
@EnableAsync
public class S3FileUploader {

	private static final Logger logger = LoggerFactory.getLogger(S3FileUploader.class);

	@Autowired
	private ECSS3Factory ecsS3Factory;

	@Async
	@Scheduled(cron = "0 0/5 * * * ?")
	public void uploadFilesToS3Bucket() throws InterruptedException {
		logger.info("[Begin] uploadFilesToS3Bucket() method");

		Path scannedDocsDir = Paths.get(EnvUtil.getScannedDocsDir());
		long totalDocs = 0;

		try {
			totalDocs = Files.list(scannedDocsDir).count();
		} catch (IOException e) {
			logger.error("Error occured while listing documents from " + EnvUtil.getScannedDocsDir(), e);
		}

		logger.info(String.format("%s documents found in %s", totalDocs, scannedDocsDir));

		if (totalDocs != 0) {

			try {
				S3Client s3 = ecsS3Factory.getS3Client();
				uploadToS3(s3);
			} catch (URISyntaxException e) {
				logger.error("exception in getS3Client() method ", e);
			}
		}
		logger.info("[End] uploadFilesToS3Bucket() method");

	}

	private void uploadToS3(S3Client s3) {
		try {
			Files.newDirectoryStream(Paths.get(EnvUtil.getScannedDocsDir())).forEach(path -> {
				File file = path.toFile();

				String objectKey = FilenameUtils.getBaseName(file.getName());
				byte[] fileData;
				try {
					fileData = FileUtils.readFileToByteArray(file);

					MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();
					String mimeType = fileTypeMap.getContentType(file.getName());

					// create the object in S3 bucket
					s3.putObject(ecsS3Factory.getS3Bucket(), objectKey, fileData, mimeType);

					logger.info(String.format("created object [%s/%s] for file [%s]", ecsS3Factory.getS3Bucket(),
							objectKey, file.getName()));

					moveFileFromScannedDocsToS3Object(path, file);

				} catch (IOException e) {
					logger.error("unable to read file contents into byte[]", e);
				}

			});
		} catch (IOException e) {
			logger.error("Error occured while iterating files ", e);
		}

	}

	private void moveFileFromScannedDocsToS3Object(Path path, File file) {
		Path targetPath = Paths.get(EnvUtil.getS3ObjectsDir() + "/" + file.getName());
		try {
			// move the file to sObject directory
			Files.move(path, targetPath, StandardCopyOption.REPLACE_EXISTING);

			logger.info(String.format("moved file from [%s] to [%s]", path, targetPath));
		} catch (Exception e) {
			logger.error(String.format("Unable to move file from [%s] to [%s]", path, targetPath), e);
		}
	}
}

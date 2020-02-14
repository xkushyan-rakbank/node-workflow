package ae.rakbank.documentuploader.s3;

import ae.rakbank.documentuploader.commons.EnvironmentUtil;
import ae.rakbank.documentuploader.dto.FileDto;
import com.emc.object.s3.S3Client;
import com.emc.object.s3.bean.GetObjectResult;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.activation.MimetypesFileTypeMap;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

/**
 * https://github.com/EMCECS/ecs-samples
 */
@Component
@EnableAsync
public class S3FileUploader {

	private static final Logger logger = LoggerFactory.getLogger(S3FileUploader.class);

	@Autowired
	private ECSS3Factory ecsS3Factory;

	@Autowired
	private EnvironmentUtil environmentUtil;

	@Async
	@Scheduled(cron = "0 0/5 * * * ?")
	public void uploadFilesToS3Bucket() throws InterruptedException {
		logger.info("[Begin] uploadFilesToS3Bucket() method");

		logger.info("Initializing scanned docs dir: " + environmentUtil.getScannedDocsDir());
		Path scannedDocsDir = Paths.get(environmentUtil.getScannedDocsDir());
		long totalDocs = 0;

		try {
			totalDocs = Files.list(scannedDocsDir).count();
		} catch (IOException e) {
			logger.error("Error occured while listing documents from " + environmentUtil.getScannedDocsDir(), e);
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
			Files.newDirectoryStream(Paths.get(environmentUtil.getScannedDocsDir())).forEach(path -> {
				File file = path.toFile();

				byte[] fileData;
				try {
					fileData = FileUtils.readFileToByteArray(file);

					MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();
					String mimeType = fileTypeMap.getContentType(file.getName());

					// create the object in S3 bucket
					s3.putObject(ecsS3Factory.getS3Bucket(), file.getName(), fileData, mimeType);

					logger.info(String.format("created object [%s/%s] for file [%s]", ecsS3Factory.getS3Bucket(),
            file.getName(), file.getName()));

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
		logger.info("Moving file " + file.getName() + " from scanned docs to S3Object");
		logger.info("S3Objects dir = " + environmentUtil.getS3ObjectsDir());
		Path targetPath = Paths.get(environmentUtil.getS3ObjectsDir() + "/" + file.getName());
		try {
			// move the file to sObject directory
			Files.move(path, targetPath, StandardCopyOption.REPLACE_EXISTING);

			logger.info(String.format("moved file from [%s] to [%s]", path, targetPath));
		} catch (Exception e) {
			logger.error(String.format("Unable to move file from [%s] to [%s]", path, targetPath), e);
		}
	}

    public Optional<FileDto> downloadFile(String documentKey) {
        try {
			final GetObjectResult<InputStream> object = ecsS3Factory.getS3Client().getObject(ecsS3Factory.getS3Bucket(), documentKey);
			return Optional.of(object).map(obj -> mapS3ObjectToFileDto(object, documentKey));
        } catch (URISyntaxException e) {
            logger.info(e.getMessage(), e);
            return Optional.empty();
        }
    }

    private FileDto mapS3ObjectToFileDto(GetObjectResult<InputStream> s3Object, String key) {
        try {
            return new FileDto(s3Object.getObjectMetadata().getContentType(), key, IOUtils.toByteArray(s3Object.getObject()));
        } catch (IOException e) {
            throw new S3ReadFileException(key, e);
        }
    }
}
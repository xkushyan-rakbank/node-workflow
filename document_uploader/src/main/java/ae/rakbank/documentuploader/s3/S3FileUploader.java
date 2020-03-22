package ae.rakbank.documentuploader.s3;

import ae.rakbank.documentuploader.exception.S3ReadFileException;
import ae.rakbank.documentuploader.dto.FileDto;
import ae.rakbank.documentuploader.util.EnvUtil;
import com.emc.object.s3.S3Client;
import com.emc.object.s3.bean.GetObjectResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.activation.MimetypesFileTypeMap;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.nio.file.*;
import java.util.Optional;
import java.util.stream.Stream;

@Slf4j
@Component
@EnableAsync
@RequiredArgsConstructor
public class S3FileUploader {

    private final ECSS3Factory ecsS3Factory;

    @Async
    @Scheduled(cron = "0 0/5 * * * ?")
    public void uploadFilesToS3Bucket() {
        log.info("[Begin] uploadFilesToS3Bucket() method");

        log.info("Initializing scanned docs dir: " + EnvUtil.getScannedDocsDir());
        Path scannedDocsDir = Paths.get(EnvUtil.getScannedDocsDir());
        long totalDocs = 0;
        try (Stream<Path> pathStream = Files.list(scannedDocsDir)) {
            totalDocs = pathStream.count();
        } catch (IOException e) {
            log.error("Error occurred while listing documents from " + EnvUtil.getScannedDocsDir(), e);
        }

        log.info("{} documents found in {}", totalDocs, scannedDocsDir);
        if (totalDocs != 0) {

            try {
                S3Client s3 = ecsS3Factory.getS3Client();
                uploadToS3(s3);
            } catch (URISyntaxException e) {
                log.error("exception in getS3Client() method ", e);
            }
        }
        log.info("[End] uploadFilesToS3Bucket() method");
    }

    private void uploadToS3(S3Client s3) {
        try (DirectoryStream<Path> directoryStream =
                     Files.newDirectoryStream(Paths.get(EnvUtil.getScannedDocsDir()))) {
            directoryStream.forEach(path -> {
                File file = path.toFile();
                byte[] fileData;
                try {
                    fileData = FileUtils.readFileToByteArray(file);
                } catch (IOException e) {
                    log.error("unable to read file contents into byte[]", e);
                    return;
                }
                MimetypesFileTypeMap fileTypeMap = new MimetypesFileTypeMap();
                String mimeType = fileTypeMap.getContentType(file.getName());

                // create the object in S3 bucket
                s3.putObject(ecsS3Factory.getS3Bucket(), file.getName(), fileData, mimeType);
                log.info(String.format("created object [%s/%s] for file [%s]", ecsS3Factory.getS3Bucket(),
                        file.getName(), file.getName()));

                moveFileFromScannedDocsToS3Object(path, file);
            });
        } catch (IOException e) {
            log.error("Error occured while iterating files ", e);
        }
    }

    private void moveFileFromScannedDocsToS3Object(Path path, File file) {
        log.info("Moving file " + file.getName() + " from scanned docs to S3Object");
        log.info("S3Objects dir = " + EnvUtil.getS3ObjectsDir());
        Path targetPath = Paths.get(EnvUtil.getS3ObjectsDir() + File.separator + file.getName());
        try {
            // move the file to sObject directory
            Files.move(path, targetPath, StandardCopyOption.REPLACE_EXISTING);

            log.info("moved file from {} to {}", path, targetPath);
        } catch (IOException e) {
            log.error("Unable to move file from {} to {}", path, targetPath, e);
        }
    }

    public Optional<FileDto> downloadFile(String documentKey) {
        try {
            final GetObjectResult<InputStream> object =
                    ecsS3Factory.getS3Client().getObject(ecsS3Factory.getS3Bucket(), documentKey);
            return Optional.of(object).map(obj -> mapS3ObjectToFileDto(object, documentKey));
        } catch (URISyntaxException e) {
            log.info(e.getMessage(), e);
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

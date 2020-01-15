package ae.rakbank.documentuploader.services;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.Date;

import ae.rakbank.documentuploader.commons.EnvironmentUtil;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;

import ae.rakbank.documentuploader.commons.DocumentUploadException;

@Service
public class DocumentUploadServiceImpl implements ae.rakbank.documentuploader.services.DocumentUploadService {

	private static final Logger logger = LoggerFactory.getLogger(DocumentUploadServiceImpl.class);

	private Path uploadsDir;

	@Autowired
	private EnvironmentUtil environmentUtil;

    @Override
    public void store(MultipartFile file, JsonNode fileInfo, String prospectId) throws IOException, DocumentUploadException {
        Date date = new Date();
        long time = date.getTime();
        Timestamp ts = new Timestamp(time);
        String originalFilename = prospectId + "_" + sanitizeFilename(fileInfo.get("documentType").asText()) + "_" + ts;
        String documentKey = originalFilename + "." + FilenameUtils.getExtension(file.getOriginalFilename());

        if (file.isEmpty()) {
            throw new DocumentUploadException("Failed to store empty file " + originalFilename);
        }

        if (originalFilename.contains("..")) {
            // This is a security check
            throw new DocumentUploadException(
                    "Cannot store file with relative path outside current directory " + originalFilename);
        }
        try (InputStream inputStream = file.getInputStream()) {
            logger.info("Initialiaing uploads dir: " + environmentUtil.getUploadDir());
            uploadsDir = Paths.get(environmentUtil.getUploadDir());

            Files.copy(inputStream, this.uploadsDir.resolve(documentKey), StandardCopyOption.REPLACE_EXISTING);
            logger.info(String.format("ProspectId=%s, File [%s] created/replaced.", prospectId,

                    this.uploadsDir.resolve(documentKey)));
        }
        catch (Exception exc) {
            logger.error(exc.getMessage());
        }
    }

    public String sanitizeFilename(String fileName) {
        // Unix limit is 255 for a fileName, but let's make it 100:
        int maxLength = Math.min(fileName.length(), 100);
        return fileName
                .replaceAll("[:\\\\/*?|<>]", "_")
                .substring(0, maxLength);
    }

}

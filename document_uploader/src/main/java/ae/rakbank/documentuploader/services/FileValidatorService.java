package ae.rakbank.documentuploader.services;

import ae.rakbank.documentuploader.exception.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.tika.Tika;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.MimetypesFileTypeMap;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Component
public class FileValidatorService {

    private final List<String> allowedExtensions;
    private final List<String> allowedMimeTypes;

    public FileValidatorService() {
        this.allowedExtensions = new ArrayList<>();
        allowedExtensions.add("png");
        allowedExtensions.add("jpeg");
        allowedExtensions.add("jpg");
        allowedExtensions.add("pdf");
        allowedExtensions.add("txt");

        allowedMimeTypes = new ArrayList<>();
        allowedMimeTypes.add(MediaType.IMAGE_PNG_VALUE);
        allowedMimeTypes.add(MediaType.IMAGE_JPEG_VALUE);
        allowedMimeTypes.add(MediaType.APPLICATION_PDF_VALUE);
        allowedMimeTypes.add(MediaType.TEXT_PLAIN_VALUE);
    }

    void validate(MultipartFile file) {
        String extension = Objects.requireNonNull(FilenameUtils.getExtension(file.getOriginalFilename()));
        if (allowedExtensions.stream().noneMatch(extension::equalsIgnoreCase)) {
            throw new ApiException("Not supported file extension", HttpStatus.BAD_REQUEST);
        }

        String contentType = new MimetypesFileTypeMap().getContentType(file.getOriginalFilename());
        validateMediaType(contentType);

        Tika tika = new Tika();
        String mediaType;
        try {
            //check with magic symbols in content
            mediaType = tika.detect(file.getInputStream());
            validateMediaType(mediaType);
        } catch (IOException e) {
            log.error("Failed to detect file media content");
            throw new ApiException("Failed to read file media content", e);
        }
        if (!contentType.equals(mediaType)) {
            throw new ApiException("The content type does not match file content", HttpStatus.BAD_REQUEST);
        }
    }

    private void validateMediaType(String mediaType) {
        if (!allowedMimeTypes.contains(mediaType)) {
            throw new ApiException("Not supported content type", HttpStatus.BAD_REQUEST);
        }
    }
}

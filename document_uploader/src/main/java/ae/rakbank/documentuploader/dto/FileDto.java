package ae.rakbank.documentuploader.dto;

import lombok.Data;

@Data
public class FileDto {

    private final String contentType;
    private final String fileName;
    private final byte[] content;
}

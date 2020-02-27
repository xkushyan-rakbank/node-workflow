package ae.rakbank.documentuploader.dto;

public class FileDto {

    private final String contentType;
    private final String fileName;
    private final byte[] content;

    public FileDto(String contentType, String fileName, byte[] content) {
        this.contentType = contentType;
        this.fileName = fileName;
        this.content = content;
    }

    public String getContentType() {
        return contentType;
    }

    public String getFileName() {
        return fileName;
    }

    public byte[] getContent() {
        return content;
    }
}

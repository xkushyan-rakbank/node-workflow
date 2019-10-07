package ae.rakbank.documentuploader.services;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import ae.rakbank.documentuploader.commons.AppConfigProps;
import ae.rakbank.documentuploader.commons.DocumentNotFoundException;
import ae.rakbank.documentuploader.commons.DocumentUploadException;

@Service
public class DocumentUploadServiceImpl implements DocumentUploadService {
	
	private static final Logger logger = LoggerFactory.getLogger(DocumentUploadServiceImpl.class);

	private final Path rootLocation;

	@Autowired
	public DocumentUploadServiceImpl(AppConfigProps properties) {
		this.rootLocation = Paths.get(properties.getLocation());
	}

	@Override
	@PostConstruct
	public void init() {
		try {
			Files.createDirectories(rootLocation);
		} catch (IOException e) {
			throw new DocumentUploadException("Could not initialize storage location", e);
		}
	}

	@Override
	public String store(MultipartFile file) {
		String filename = StringUtils.cleanPath(file.getOriginalFilename());
		logger.info("rootLocation="+rootLocation);
		try {
			if (file.isEmpty()) {
				throw new DocumentUploadException("Failed to store empty file " + filename);
			}
			if (filename.contains("..")) {
				// This is a security check
				throw new DocumentUploadException(
						"Cannot store file with relative path outside current directory " + filename);
			}
			try (InputStream inputStream = file.getInputStream()) {
				Files.copy(inputStream, this.rootLocation.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
			}
		} catch (IOException e) {
			throw new DocumentUploadException("Failed to store file " + filename, e);
		}

		logger.info("rootLocation="+rootLocation);
		return filename;
	}

	@Override
	public Path load(String filename) {
		return rootLocation.resolve(filename);
	}

	@Override
	public Resource loadAsResource(String filename) {
		try {
			Path file = load(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new DocumentNotFoundException("Could not read file: " + filename);
			}
		} catch (MalformedURLException e) {
			throw new DocumentNotFoundException("Could not read file: " + filename, e);
		}
	}

}
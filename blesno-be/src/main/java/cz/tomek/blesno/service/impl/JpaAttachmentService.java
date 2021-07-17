package cz.tomek.blesno.service.impl;

import static java.util.stream.Collectors.toList;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import cz.tomek.blesno.model.Attachment;
import cz.tomek.blesno.repository.AttachmentRepository;
import cz.tomek.blesno.service.AttachmentService;

/**
 * Default implementation of {@link AttachmentService}.
 * 
 * @author tomek
 *
 */
@Service
public class JpaAttachmentService extends AbstractJpaAppEntityService<Attachment> implements AttachmentService {

	private static final String PATH_TO_ASSETS
		= "/home/tomek/development/workspace/projects/blesno-be/blesno-be/src/main/resources/static/assets";

	@Autowired
	private AttachmentRepository attachmentRepository;
	
	@Override
	public List<Attachment> getByCategory(String category, Pageable pageRequest) {
		List<Attachment> attachments = attachmentRepository.findByCategory(category, pageRequest);
		for (Attachment attachment : attachments) {
			if (attachment.isFile()) {
				String normalizedContentUrl = attachment.getContentUrl().replace("assets/", "");
				Path filePath = Paths.get(PATH_TO_ASSETS, normalizedContentUrl);
				long fileSize;
				try {
					fileSize = Files.size(filePath);
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
				attachment.setSize(fileSize);
			}
		}
		return attachmentRepository.findByCategory(category, pageRequest);
	}
	
	@Override
	public long countByCategory(String category) {
		return attachmentRepository.countByCategory(category);
	}
	
	@Override
	public List<String> getCategories() {
		return attachmentRepository.findDistinctCategories();
	}

	@Override
	public List<Path> getImages() {
		Path root = Paths.get(PATH_TO_ASSETS);
		try {
			return Files.find(root, Integer.MAX_VALUE, (path, attrs) -> isImage(path))
					.collect(toList());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private boolean isImage(Path path) {
		String fileName = path.getFileName().toString();
		return fileName.matches(".*[.](jpg|png|gif)");
	}

}

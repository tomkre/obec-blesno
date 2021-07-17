package cz.tomek.blesno.controller;

import static java.util.stream.Collectors.toList;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import cz.tomek.blesno.model.Attachment;
import cz.tomek.blesno.service.AttachmentService;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller exposing rest operations for managing {@link Attachment} entities.
 * 
 * @author tomek
 *
 */
@RestController
@RequestMapping("attachments")
@Slf4j
public class AttachmentController {

	private static final String LABEL = "label";

	private static final String CHILDREN = "children";

	@Autowired
	private AttachmentService attachmentService;
	
	@GetMapping("{id}")
	public ResponseEntity<Attachment> getOne(@PathVariable String id) {
		log.debug("getOne(): [id={}]", id);
		return attachmentService
				.findOne(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping
	public List<Attachment> getAll(Pageable pageRequest) {
		log.debug("getAll(): [pageable={}]", pageRequest);
		return attachmentService.getAll(pageRequest);
	}
	
	@GetMapping(params = "category")
	public List<Attachment> getByCategory(@RequestParam("category") String category, Pageable pageRequest) {
		log.debug("getByCategory(): [category={}, pageRequest={}]", category, pageRequest);
		return attachmentService.getByCategory(category, pageRequest);
	}
	
	@GetMapping(value = "count", params = "category")
	public long countByCategory(@RequestParam String category) {
		return attachmentService.countByCategory(category);
	}
	
	@PostMapping
	public ResponseEntity<Void> save(@RequestBody Attachment attachment, UriComponentsBuilder uriBuilder) throws MalformedURLException, URISyntaxException {
		log.info("save(): [attachment={}]", attachment);
		attachmentService.save(attachment);
		return ResponseEntity
				.created(uriBuilder.path("attachments/{id}").build(attachment.getId()))
				.build();
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Void> delete(@PathVariable String id) {
		log.debug("delete(): [id={}]", id);
		attachmentService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("categories")
	public List<String> getAllCategories() {
		return attachmentService.getCategories();
	}

	@GetMapping("images")
	public ArrayNode getImages() {
		ObjectMapper mapper = new ObjectMapper();
		ArrayNode nodes = mapper.createArrayNode();
		List<String[]> pathNames = 
			attachmentService.getImages().stream()
			.map(Path::toString)
			.map(pathName -> pathName.substring(pathName.indexOf("articles") + "articles/".length()))
			.map(pathName -> pathName.split("/"))
			.collect(toList());
		for (String[] pathSegments : pathNames) {
			ObjectNode parentNode = null;
			for (String pathSegment : pathSegments) {
				ArrayNode children = null;
				if (parentNode == null) {
					children = nodes;
				} else {
					if (!parentNode.has(CHILDREN)) {
						parentNode.set(CHILDREN, mapper.createArrayNode());
					}
					children = (ArrayNode) parentNode.get(CHILDREN);
				}
				ObjectNode currentNode = StreamSupport.stream(children.spliterator(), false)
					.filter(node -> node.get(LABEL).asText().equals(pathSegment))
					.map(jsonNode -> (ObjectNode) jsonNode)
					.findFirst().orElse(null);
				if (currentNode == null) {
					currentNode = mapper.createObjectNode();
					currentNode.put(LABEL, pathSegment);
					children.add(currentNode);
				}
				parentNode = currentNode;
			}
		}
		return nodes;
	}
	
}

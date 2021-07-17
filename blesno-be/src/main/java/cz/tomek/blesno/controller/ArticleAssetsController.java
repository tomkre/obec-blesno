package cz.tomek.blesno.controller;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.extern.slf4j.Slf4j;

/**
 * Manage articles assets.
 * 
 * @author tomek
 *
 */
@RestController
@RequestMapping("articles")
@Slf4j
public class ArticleAssetsController {
	
	@Value("${pathToAssets:#{systemProperties['user.dir']}/src/main/resources/static/assets/articles}")
	private String pathToAssets;
	
	@GetMapping(value = "{id}/assets", params = "type=references")
	public ArrayNode loadDocumentReferences(@PathVariable String id, UriComponentsBuilder uriBuilder) throws IOException {
		Path assets = Paths.get(String.format("%s/%s", pathToAssets, id));
		ObjectMapper mapper = new ObjectMapper();
		ArrayNode jsonArray = mapper.createArrayNode();
		if (Files.notExists(assets)) {
			return jsonArray;
		}
		String urlTemplate = uriBuilder.path("articles").build().toString() + "/{articleId}/assets/{assetName}";
		Files.walk(assets)
			.filter(Files::isRegularFile)
			.map(path -> {
				ObjectNode json = mapper.createObjectNode();
				String fileName = path.getFileName().toString(); 
				json.put("name", fileName);
				json.put("url", urlTemplate.replace("{articleId}", id).replace("{assetName}", fileName));
				return json;
			}).forEach(jsonArray::add);
		return jsonArray;
	}
	
	@GetMapping(value = "{id}/assets/{assetName:[-a-z0-9]+[.]pdf}", produces = MediaType.APPLICATION_PDF_VALUE)
	public byte[] loadPdf(@PathVariable String id, @PathVariable String assetName) throws IOException {
		return loadAsset(id, assetName);
	}
	
	@GetMapping(value = "{id}/assets/{assetName:[-a-z0-9]+[.]zip}", produces = "application/zip")
	public byte[] loadZip(@PathVariable String id, @PathVariable String assetName, HttpServletResponse response) throws IOException {
		return loadAttachment(id, assetName, response);
	}
	
	@GetMapping(value = "{id}/assets/{assetName:[-a-z0-9]+[.]rtf}", produces = "application/rtf")
	public byte[] loadRtf(@PathVariable String id, @PathVariable String assetName, HttpServletResponse response) throws IOException {
		return loadAttachment(id, assetName, response);
	}
	
	@GetMapping(value = "{id}/assets/{assetName:[-a-z0-9]+[.]doc}", produces = "application/msword")
	public byte[] loadDoc(@PathVariable String id, @PathVariable String assetName, HttpServletResponse response) throws IOException {
		return loadAttachment(id, assetName, response);
	}
	
	@GetMapping(value = "{id}/assets/{assetName:[-a-z0-9]+[.]docx}", produces = "application/vnd.openxmlformatsofficedocument.wordprocessingm")
	public byte[] loadDocx(@PathVariable String id, @PathVariable String assetName, HttpServletResponse response) throws IOException {
		return loadAttachment(id, assetName, response);
	}

	private byte[] loadAttachment(String id, String assetName, HttpServletResponse response) throws IOException {
		response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + assetName); 
		return loadAsset(id, assetName);
	}
	
	@GetMapping(value = "{id}/assets/{assetName:[-a-z0-9]+[.]jpe?g}", produces = MediaType.IMAGE_JPEG_VALUE)
	public byte[] loadJpg(@PathVariable String id, @PathVariable String assetName, HttpServletResponse response) throws IOException {
		return loadAsset(id, assetName);
	}
	
	@GetMapping(value = "{id}/assets/{assetName:[-a-z0-9]+[.]png}", produces = MediaType.IMAGE_PNG_VALUE)
	public byte[] loadPng(@PathVariable String id, @PathVariable String assetName, HttpServletResponse response) throws IOException {
		return loadAsset(id, assetName);
	}
	
	@GetMapping(value = "{id}/assets/{assetName:[-a-z0-9]+[.]gif}", produces = MediaType.IMAGE_GIF_VALUE)
	public byte[] loadGif(@PathVariable String id, @PathVariable String assetName, HttpServletResponse response) throws IOException {
		return loadAsset(id, assetName);
	}
	
	private byte[] loadAsset(String id, String assetName) throws IOException {
		Path pathToAsset = Paths.get(pathToAssets, id, assetName);
		return Files.readAllBytes(pathToAsset);
	}
	
	@PostMapping("{id}/assets")
	public JsonNode saveAsset(@PathVariable String id, @RequestParam("file") MultipartFile uploadedFile,
			UriComponentsBuilder uriBuilder) throws IOException {
		Path pathToDir = Paths.get(pathToAssets, id);
		if (Files.notExists(pathToDir)) {
			Files.createDirectory(pathToDir);
		}
		String fileName = uploadedFile.getOriginalFilename();
		Path pathToFile = pathToDir.resolve(fileName);
		Files.write(pathToFile, uploadedFile.getBytes());
		log.debug("File '{}' has been successfully uploaded", fileName);
		URI assetUri = uriBuilder.path("articles/{articleId}/assets/{assetName}").build(id, fileName);
		ObjectNode objectNode = new ObjectMapper().createObjectNode();
		objectNode.put("location", assetUri.toString());
		return objectNode;
	}
	
	@DeleteMapping(value = "{id}/assets/{assetName}")
	public ResponseEntity<Void> deleteAsset(@PathVariable String id, @PathVariable String assetName) throws IOException {
		Path path = Paths.get(pathToAssets, id, assetName);
		Files.delete(path);
		log.debug("File '{}' has been successfully deleted", assetName);
		return ResponseEntity.noContent().build();
	}

}

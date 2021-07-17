package cz.tomek.blesno.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

/**
 * Manages user authentication.
 * 
 * @author tomek
 *
 */
@RestController
@RequestMapping("auth")
@Slf4j
public class AuthController {
	
	@GetMapping("login")
	public ResponseEntity<Void> login(@AuthenticationPrincipal User user) {
		log.debug("User {} has been logged", user);
		return ResponseEntity.ok().build();
	}

}

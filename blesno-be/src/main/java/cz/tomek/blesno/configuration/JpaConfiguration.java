package cz.tomek.blesno.configuration;

import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Configuration of persistence layer.
 * 
 * @author tomek
 *
 */
@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaConfiguration {

	@Bean
	@Scope("session")
	public AuditorAware<String> auditorProvider() {
		String name = SecurityContextHolder.getContext().getAuthentication().getName();
		return () -> Optional.of(name);
	}
	
}

package cz.tomek.blesno.configuration;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.swagger.models.HttpMethod;

/**
 * Additional configuration of web layer.
 * 
 * @author tomek
 *
 */
@Configuration
public class WebConfiguration implements WebMvcConfigurer {
	
	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(new PageableHandlerMethodArgumentResolver());
	}
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://localhost:4200")
			.allowedMethods(HttpMethod.GET.name(), HttpMethod.HEAD.name(), 
					HttpMethod.POST.name(), HttpMethod.DELETE.name())
			.allowCredentials(true);
	}

}

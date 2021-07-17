package cz.tomek.blesno.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Configuration of security layer.
 * 
 * @author tomek
 *
 */
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
			.withUser("admin").password("{noop}blesno2020").roles("ADMIN");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.cors()
		.and()
			.csrf().disable()
			.httpBasic()
		.and()
			.authorizeRequests()
			.antMatchers(HttpMethod.POST).authenticated()
			.antMatchers(HttpMethod.DELETE).authenticated()
			.antMatchers("/auth/login").authenticated()
			.anyRequest().permitAll();
	}

}

package com.smhrd.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@CrossOrigin(origins = "http://localhost:8084/controller/")
@ComponentScan(basePackages = "com.smhrd.controller")
public class WebConfig implements WebMvcConfigurer {
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
		
		 @Override
		    public void addCorsMappings(CorsRegistry registry) {
		        registry.addMapping("/**")
		                .allowedOrigins("http://localhost:3000")  
		                .allowedMethods("GET", "POST", "PUT", "DELETE")
		        		.allowCredentials(true);
	}
		};
        
    }
}
package com.longkimvo.proathlete.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().
                info(new Info().title("ProAthlete's API")
                        .description("E-Commerce ReactJS Spring Boot")
                        .version("1.0")
                        .contact(new Contact().name("vokimlong11.cs@gmail.com")));
    }
}

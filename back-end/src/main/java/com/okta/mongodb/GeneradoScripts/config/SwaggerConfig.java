package com.okta.mongodb.GeneradoScripts.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

  @Bean
  public OpenAPI customOpenAPI() {
    return new OpenAPI()
      // .addSecurityItem(
      //   new SecurityRequirement().addList("Bearer Authentication")
      // )
      // .components(
      //   new Components()
      //     .addSecuritySchemes("Bearer Authentication", createAPIKeyScheme())
      // )
      .info( 
        new Info()
          .title("Generate scripts for Mikrotik")
          .description("The application is a tool to generate scripts for Mikrotik")
          .version("1.0")
          .contact(
            new Contact()
              .name("Xander LS")
              .email("https://xanderls.dev/")
              .url("xanderlsdev@gmail.com")
          )
      );
  }

  // private SecurityScheme createAPIKeyScheme() {
  //   return new SecurityScheme()
  //     .type(SecurityScheme.Type.HTTP)
  //     .bearerFormat("JWT")
  //     .scheme("bearer");
  // }
}

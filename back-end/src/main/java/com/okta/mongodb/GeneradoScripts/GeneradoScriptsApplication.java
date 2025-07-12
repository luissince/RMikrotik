package com.okta.mongodb.GeneradoScripts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration(exclude = {
    org.springdoc.core.configuration.SpringDocDataRestConfiguration.class
})
public class GeneradoScriptsApplication {
	public static void main(String[] args) {
		SpringApplication.run(GeneradoScriptsApplication.class, args);
	}

}

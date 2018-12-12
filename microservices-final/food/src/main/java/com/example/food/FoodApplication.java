package com.example.food;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class FoodApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodApplication.class, args);
	}

}

@RefreshScope
@RestController
class MessageRestController {
	@Value("${message: Hello Default}")
	private String message;
	
	@RequestMapping("/message")
	String getMessage() {
		return this.message;
	}
}

package com.example.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.discovery.DiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
@RestController
public class UserApplication {

	@Autowired
	public DiscoveryClient discoveryClient;
	
	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}
	
	@RequestMapping("/")
	public String getName() {
		return discoveryClient.getApplication("demo").getName();
	}
}

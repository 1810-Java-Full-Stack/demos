package com.example.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.netflix.appinfo.InstanceInfo;
import com.netflix.discovery.EurekaClient;
import com.netflix.discovery.shared.Application;

@SpringBootApplication
@RestController
public class UserApplication {
	
	@Autowired
	public DiscoveryClient discoveryClient;
	
	@Autowired
	private EurekaClient eurekaClient;
	
	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}
	
	@RequestMapping("/")
	public List<String> getName() {
		Application application = eurekaClient.getApplication("hero");
        InstanceInfo instanceInfo = application.getInstances().get(0);
        String url = "http://" + instanceInfo.getIPAddr() + ":" + instanceInfo.getPort() + "/";
        System.out.println(url);
        List<String> heros = new RestTemplate().getForObject(url, List.class);
        
		return heros;
	}
}

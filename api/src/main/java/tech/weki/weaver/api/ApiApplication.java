package tech.weki.weaver.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import tech.weki.weaver.api.config.ApplicationProperties;

@SpringBootApplication
@EnableConfigurationProperties({ApplicationProperties.class})
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }
}

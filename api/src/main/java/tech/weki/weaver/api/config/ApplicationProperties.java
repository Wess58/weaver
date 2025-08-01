package tech.weki.weaver.api.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {
    private String mediaUrl;
}

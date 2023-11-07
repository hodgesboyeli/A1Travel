package famu.edu.a1travel.Security;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties("security")
@Data
public class SecurityProperties {

    boolean allowCredentials;
    List<String> allowedOrigins;
    List<String> allowedHeaders;
    List<String> exposedHeaders;
    List<String> allowedMethods;
    List<String> allowedPublicApis;

}

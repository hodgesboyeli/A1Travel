package famu.edu.a1travel.Security;

import com.fasterxml.jackson.databind.ObjectMapper;
import famu.edu.a1travel.Util.ErrorMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class FirebaseAuthenticationFailureHandler implements AuthenticationFailureHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(FirebaseAuthenticationFailureHandler.class);

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        LOGGER.error("Authentication failed: {}", exception.getMessage());

        // Set the response status code to 401 (Unauthorized)
        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        // Set the response content type
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // Write the error message to the response body
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(response.getWriter(), new ErrorMessage("Authentication failed","", null));
    }

}

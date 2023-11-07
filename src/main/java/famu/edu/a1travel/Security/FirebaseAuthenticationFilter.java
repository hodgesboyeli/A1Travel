package famu.edu.a1travel.Security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import famu.edu.a1travel.Util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

@Order(Ordered.HIGHEST_PRECEDENCE)
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {


    private AuthenticationManager authenticationManager;
    private FirebaseAuthenticationFailureHandler failureHandler;

    public FirebaseAuthenticationFilter( AuthenticationManager authenticationManager, FirebaseAuthenticationFailureHandler failureHandler) {

        this.authenticationManager = authenticationManager;
        this.failureHandler = failureHandler;

    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String authToken = extractAuthenticationTokenFromRequest(request);

            if (StringUtils.hasText(authToken)) {
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(authToken);
                String uid = decodedToken.getUid();
                Collection<GrantedAuthority> authorities = new ArrayList<>();
                authorities.add(new SimpleGrantedAuthority("USER"));
                Authentication authentication = new UsernamePasswordAuthenticationToken(uid, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            else
            {
                authToken = extractAuthorizationTokenFromRequest(request);

                if (StringUtils.hasText(authToken)) {
                    Claims claims = JwtUtil.getClaimsFromToken(authToken);
                    String uid = claims.getSubject();
                    Collection<GrantedAuthority> authorities = new ArrayList<>();
                    authorities.add(new SimpleGrantedAuthority("USER"));
                    Authentication authentication = new UsernamePasswordAuthenticationToken(uid, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (AuthenticationException e) {
            failureHandler.onAuthenticationFailure(request, response, e);
            return;
        } catch (FirebaseAuthException e) {
            throw new RuntimeException(e);
        }

        filterChain.doFilter(request, response);
    }

    private String extractAuthenticationTokenFromRequest(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization");
        if (StringUtils.hasText(authToken) && authToken.startsWith("Bearer ")) {
            return authToken.substring(7);
        }
        return null;
    }

    private String extractAuthorizationTokenFromRequest(HttpServletRequest request) {
        return request.getHeader("X-Auth-Token");
    }


    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public void setAuthenticationFailureHandler(FirebaseAuthenticationFailureHandler failureHandler) {
        this.failureHandler = failureHandler;
    }
}

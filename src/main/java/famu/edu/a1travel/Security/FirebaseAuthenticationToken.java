package famu.edu.a1travel.Security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

public class FirebaseAuthenticationToken extends AbstractAuthenticationToken {

    private final UserDetails principal;
    private final String token;

    public FirebaseAuthenticationToken(UserDetails principal, String token) {
        super(principal.getAuthorities());
        this.principal = principal;
        this.token = token;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return token;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}

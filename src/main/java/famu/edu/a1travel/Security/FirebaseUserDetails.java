package famu.edu.a1travel.Security;

import com.google.firebase.auth.UserRecord;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class FirebaseUserDetails implements UserDetails {

    private final UserRecord userRecord;
    private final List<GrantedAuthority> authorities;

    public FirebaseUserDetails(UserRecord userRecord) {
        this.userRecord = userRecord;
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return null; // Firebase Auth does not expose user passwords
    }

    @Override
    public String getUsername() {
        return userRecord.getUid();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return userRecord.isDisabled();
    }
}

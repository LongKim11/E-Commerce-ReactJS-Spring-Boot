package com.longkimvo.proathlete.auth.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@Entity
@Table(name="AUTH_USER_DETAILS")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String firstName;
    private String lastName;

    @JsonIgnore
    private String password;

    private Date createdAt;
    private Date updatedAt;

    @Column(nullable = false, unique = true)
    private String email;

    private String phoneNumber;

    private String provider;

    private String verificationCode;

    private boolean enabled = false;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name="AUTH_USER_AUTHORITY", joinColumns = @JoinColumn(referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(referencedColumnName = "id"))
    private List<Authority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }
}

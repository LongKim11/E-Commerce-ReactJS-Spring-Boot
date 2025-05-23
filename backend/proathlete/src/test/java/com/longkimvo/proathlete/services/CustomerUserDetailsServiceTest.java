package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.auth.repositories.UserDetailsRepository;
import com.longkimvo.proathlete.auth.services.CustomUserDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


public class CustomerUserDetailsServiceTest {
    @Mock
    private UserDetailsRepository userDetailsRepository;

    @InjectMocks
    private CustomUserDetailsService customUserDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void loadUserByUsername_UserExists_ReturnsUserDetails() {
        String email = "user@example.com";
        User user = new User();
        user.setEmail(email);

        when(userDetailsRepository.findByEmail(email)).thenReturn(user);

        UserDetails result = customUserDetailsService.loadUserByUsername(email);

        assertNotNull(result);
        assertEquals(email, result.getUsername());
        verify(userDetailsRepository, times(1)).findByEmail(email);
    }

    @Test
    void loadUserByUsername_UserNotFound_ThrowsException() {
        String email = "nonexistent@example.com";
        when(userDetailsRepository.findByEmail(email)).thenReturn(null);

        UsernameNotFoundException ex = assertThrows(UsernameNotFoundException.class,
                () -> customUserDetailsService.loadUserByUsername(email));
        assertEquals("User not found with email: " + email, ex.getMessage());

        verify(userDetailsRepository, times(1)).findByEmail(email);
    }

}

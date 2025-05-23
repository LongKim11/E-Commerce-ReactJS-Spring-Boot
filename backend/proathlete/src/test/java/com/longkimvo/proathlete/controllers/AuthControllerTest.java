package com.longkimvo.proathlete.controllers;

import com.longkimvo.proathlete.auth.controllers.AuthController;
import com.longkimvo.proathlete.auth.dto.LoginRequest;
import com.longkimvo.proathlete.auth.dto.RegistrationRequest;
import com.longkimvo.proathlete.auth.dto.RegistrationResponse;
import com.longkimvo.proathlete.auth.dto.UserToken;
import com.longkimvo.proathlete.auth.entities.Authority;
import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.auth.services.RegistrationService;
import com.longkimvo.proathlete.auth.config.JWTTokenHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private RegistrationService registrationService;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private JWTTokenHelper jwtTokenHelper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testLogin_Success() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("test@example.com");
        loginRequest.setPassword("password");

        User mockUser = mock(User.class);
        when(mockUser.isEnabled()).thenReturn(true);
        when(mockUser.getEmail()).thenReturn("test@example.com");

        Authority authority = mock(Authority.class);
        when(authority.getAuthority()).thenReturn("ROLE_USER");

        Authentication auth = mock(Authentication.class);
        when(auth.isAuthenticated()).thenReturn(true);
        when(auth.getPrincipal()).thenReturn(mockUser);

        when(authenticationManager.authenticate(any(Authentication.class))).thenReturn(auth);
        when(jwtTokenHelper.generateToken(eq("test@example.com"), anyList())).thenReturn("mocked-jwt-token");

        ResponseEntity<UserToken> response = authController.login(loginRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("mocked-jwt-token", response.getBody().getToken());
    }

    @Test
    public void testLogin_UnauthorizedWhenUserNotEnabled() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("test@example.com");
        loginRequest.setPassword("password");

        User mockUser = mock(User.class);
        when(mockUser.isEnabled()).thenReturn(false);

        Authentication auth = mock(Authentication.class);
        when(auth.isAuthenticated()).thenReturn(true);
        when(auth.getPrincipal()).thenReturn(mockUser);

        when(authenticationManager.authenticate(any(Authentication.class))).thenReturn(auth);

        ResponseEntity<UserToken> response = authController.login(loginRequest);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    public void testLogin_BadCredentials() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("test@example.com");
        loginRequest.setPassword("wrongpassword");

        when(authenticationManager.authenticate(any(Authentication.class))).thenThrow(BadCredentialsException.class);

        ResponseEntity<UserToken> response = authController.login(loginRequest);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    public void testRegister_Success() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("newuser@example.com");
        request.setFirstName("New");
        request.setLastName("User");
        request.setPassword("password");

        RegistrationResponse registrationResponse = RegistrationResponse.builder()
                .code(200)
                .message("User created successfully!")
                .build();

        when(registrationService.createUser(any(RegistrationRequest.class))).thenReturn(registrationResponse);

        ResponseEntity<RegistrationResponse> response = authController.register(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(registrationResponse, response.getBody());
    }

    @Test
    public void testRegister_Fail() {
        RegistrationRequest request = new RegistrationRequest();

        RegistrationResponse registrationResponse = RegistrationResponse.builder()
                .code(400)
                .message("Email already existed!")
                .build();

        when(registrationService.createUser(any(RegistrationRequest.class))).thenReturn(registrationResponse);

        ResponseEntity<RegistrationResponse> response = authController.register(request);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(registrationResponse, response.getBody());
    }

    @Test
    public void testVerifyCode_Success() {
        String username = "test@example.com";
        String code = "123456";

        User mockUser = mock(User.class);
        when(mockUser.getVerificationCode()).thenReturn(code);
        when(userDetailsService.loadUserByUsername(username)).thenReturn(mockUser);

        Map<String, String> map = new HashMap<>();
        map.put("username", username);
        map.put("code", code);

        ResponseEntity<?> response = authController.verifyCode(map);

        verify(registrationService, times(1)).verifyUser(username);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testVerifyCode_Fail() {
        String username = "test@example.com";
        String code = "123456";

        User mockUser = mock(User.class);
        when(mockUser.getVerificationCode()).thenReturn("wrongcode");
        when(userDetailsService.loadUserByUsername(username)).thenReturn(mockUser);

        Map<String, String> map = new HashMap<>();
        map.put("username", username);
        map.put("code", code);

        ResponseEntity<?> response = authController.verifyCode(map);

        verify(registrationService, never()).verifyUser(anyString());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    public void testVerifyCode_UserNotFound() {
        when(userDetailsService.loadUserByUsername(anyString())).thenReturn(null);

        Map<String, String> map = new HashMap<>();
        map.put("username", "unknown@example.com");
        map.put("code", "123456");

        ResponseEntity<?> response = authController.verifyCode(map);

        verify(registrationService, never()).verifyUser(anyString());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}

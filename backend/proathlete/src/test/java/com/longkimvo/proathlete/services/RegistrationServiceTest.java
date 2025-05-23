package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.auth.dto.RegistrationRequest;
import com.longkimvo.proathlete.auth.dto.RegistrationResponse;
import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.auth.repositories.UserDetailsRepository;
import com.longkimvo.proathlete.auth.services.AuthorityService;
import com.longkimvo.proathlete.auth.services.EmailService;
import com.longkimvo.proathlete.auth.services.RegistrationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ServerErrorException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RegistrationServiceTest {

    @Mock
    private UserDetailsRepository userDetailsRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthorityService authorityService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private RegistrationService registrationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createUser_EmailAlreadyExists_ReturnsBadRequest() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("existing@example.com");

        when(userDetailsRepository.findByEmail("existing@example.com"))
                .thenReturn(new User());

        RegistrationResponse response = registrationService.createUser(request);

        assertEquals(400, response.getCode());
        assertEquals("Email already existed!", response.getMessage());
        verify(userDetailsRepository, never()).save(any());
        verify(emailService, never()).sendMail(any());
    }

    @Test
    void createUser_ValidRequest_Success() {
        RegistrationRequest request = new RegistrationRequest();
        request.setFirstName("Long");
        request.setLastName("Kim");
        request.setEmail("longkim@example.com");
        request.setPassword("password");

        when(userDetailsRepository.findByEmail("longkim@example.com")).thenReturn(null);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(authorityService.getUserAuthority()).thenReturn(null); // hoặc mock đúng role nếu cần

        RegistrationResponse response = registrationService.createUser(request);

        assertEquals(200, response.getCode());
        assertEquals("User created successfully!", response.getMessage());

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userDetailsRepository, times(1)).save(userCaptor.capture());
        verify(emailService, times(1)).sendMail(userCaptor.getValue());

        User savedUser = userCaptor.getValue();
        assertEquals("Long", savedUser.getFirstName());
        assertEquals("Kim", savedUser.getLastName());
        assertEquals("longkim@example.com", savedUser.getEmail());
        assertEquals("encodedPassword", savedUser.getPassword());
        assertEquals("manual", savedUser.getProvider());
        assertNotNull(savedUser.getVerificationCode());
    }

    @Test
    void createUser_WhenExceptionThrown_ThrowsServerErrorException() {
        RegistrationRequest request = new RegistrationRequest();
        request.setEmail("test@example.com");

        when(userDetailsRepository.findByEmail("test@example.com")).thenReturn(null);
        when(passwordEncoder.encode(anyString())).thenThrow(new RuntimeException("Encode failed"));

        ServerErrorException ex = assertThrows(ServerErrorException.class,
                () -> registrationService.createUser(request));

        assertTrue(ex.getMessage().contains("Encode failed"));
        verify(userDetailsRepository, never()).save(any());
        verify(emailService, never()).sendMail(any());
    }

    @Test
    void verifyUser_EnableUserAndSave() {
        User user = new User();
        user.setEnabled(false);

        when(userDetailsRepository.findByEmail("user@example.com")).thenReturn(user);

        registrationService.verifyUser("user@example.com");

        assertTrue(user.isEnabled());
        verify(userDetailsRepository, times(1)).save(user);
    }
}

package com.longkimvo.proathlete.controllers;

import com.longkimvo.proathlete.auth.controllers.UserDetailsController;
import com.longkimvo.proathlete.auth.entities.Authority;
import com.longkimvo.proathlete.auth.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import java.security.Principal;
import java.util.*;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserDetailsController.class)
class UserDetailsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserDetailsService userDetailsService;

    private Principal principal;

    @BeforeEach
    void setUp() {
        principal = () -> "user@example.com"; // mock Principal.getName()
    }

    @Test
    void getUserProfile_UserExists_ReturnsUserDetails() throws Exception {
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("user@example.com");
        user.setPhoneNumber("1234567890");
        Set<Authority> authoritySet = new HashSet<>();
        List<Authority> authorityList = new ArrayList<>(authoritySet);
        user.setAuthorities(authorityList);
        user.setAddressList(Collections.emptyList());

        when(userDetailsService.loadUserByUsername(principal.getName())).thenReturn(user);

        mockMvc.perform(get("/api/user/profile")
                        .principal(principal)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.email").value("user@example.com"))
                .andExpect(jsonPath("$.phoneNumber").value("1234567890"));
    }

    @Test
    void getUserProfile_UserNotFound_ReturnsUnauthorized() throws Exception {
        when(userDetailsService.loadUserByUsername(principal.getName())).thenReturn(null);

        mockMvc.perform(get("/api/user/profile")
                        .principal(principal)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}

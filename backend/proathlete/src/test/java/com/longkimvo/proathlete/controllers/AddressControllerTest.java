package com.longkimvo.proathlete.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.longkimvo.proathlete.dto.AddressRequest;
import com.longkimvo.proathlete.entities.Address;
import com.longkimvo.proathlete.services.AddressService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.security.Principal;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AddressControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AddressService addressService;

    @InjectMocks
    private AddressController addressController;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(addressController).build();
    }

    @Test
    void testCreateAddress() throws Exception {
        AddressRequest request = new AddressRequest();
        request.setStreet("123 Street");
        request.setCity("CityName");
        request.setState("StateName");
        request.setZipCode("12345");

        Address address = Address.builder()
                .id(UUID.randomUUID())
                .street(request.getStreet())
                .city(request.getCity())
                .state(request.getState())
                .zipCode(request.getZipCode())
                .build();

        Principal principal = () -> "user@example.com";

        when(addressService.createAddress(any(AddressRequest.class), any(Principal.class))).thenReturn(address);

        mockMvc.perform(post("/api/address")
                        .principal(principal)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.street").value("123 Street"))
                .andExpect(jsonPath("$.city").value("CityName"))
                .andExpect(jsonPath("$.state").value("StateName"))
                .andExpect(jsonPath("$.zipCode").value("12345"));

        verify(addressService, times(1)).createAddress(any(AddressRequest.class), any(Principal.class));
    }

    @Test
    void testDeleteAddress() throws Exception {
        UUID id = UUID.randomUUID();

        doNothing().when(addressService).deleteAddress(id);

        mockMvc.perform(delete("/api/address/{id}", id))
                .andExpect(status().isOk());

        verify(addressService, times(1)).deleteAddress(id);
    }
}

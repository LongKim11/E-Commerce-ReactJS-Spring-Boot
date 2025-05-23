package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.dto.AddressRequest;
import com.longkimvo.proathlete.entities.Address;
import com.longkimvo.proathlete.repositories.AddressRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.security.Principal;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.springframework.security.core.userdetails.UserDetailsService;

class AddressServiceTest {

    @InjectMocks
    private AddressService addressService;

    @Mock
    private AddressRepository addressRepository;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private Principal principal;

    private AddressRequest addressRequest;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail("test@example.com");

        addressRequest = new AddressRequest();
        addressRequest.setStreet("123 Main St");
        addressRequest.setCity("HCM");
        addressRequest.setState("District 1");
        addressRequest.setZipCode("70000");

        when(principal.getName()).thenReturn(user.getEmail());
        when(userDetailsService.loadUserByUsername(user.getEmail())).thenReturn(user);
    }

    @Test
    void testCreateAddress() {
        // mock addressRepository.save(...) trả lại chính address được lưu
        ArgumentCaptor<Address> addressCaptor = ArgumentCaptor.forClass(Address.class);
        when(addressRepository.save(any(Address.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Address result = addressService.createAddress(addressRequest, principal);

        verify(userDetailsService, times(1)).loadUserByUsername(user.getEmail());
        verify(addressRepository).save(addressCaptor.capture());

        Address captured = addressCaptor.getValue();

        assertEquals("123 Main St", captured.getStreet());
        assertEquals("HCM", captured.getCity());
        assertEquals("District 1", captured.getState());
        assertEquals("70000", captured.getZipCode());
        assertEquals(user, captured.getUser());
    }

    @Test
    void testDeleteAddress() {
        UUID addressId = UUID.randomUUID();

        addressService.deleteAddress(addressId);

        verify(addressRepository, times(1)).deleteById(addressId);
    }
}

package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.entities.Order;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
import com.stripe.model.PaymentIntent;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerListParams;
import com.stripe.param.PaymentIntentCreateParams;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class PaymentIntentServiceTest {

    private PaymentIntentService paymentIntentService;

    @BeforeEach
    void setUp() {
        paymentIntentService = new PaymentIntentService();
    }

    @Test
    void testGetOrCreateCustomer_ReturnExistingCustomer() throws StripeException {
        User user = User.builder()
                .email("existing@example.com")
                .firstName("Test")
                .lastName("User")
                .build();

        try (MockedStatic<Customer> mockedCustomer = mockStatic(Customer.class)) {
            Customer existingCustomer = mock(Customer.class);
            when(existingCustomer.getId()).thenReturn("cus_existing123");

            CustomerCollection customerCollection = mock(CustomerCollection.class);
            when(customerCollection.getData()).thenReturn(List.of(existingCustomer));

            mockedCustomer.when(() -> Customer.list(any(CustomerListParams.class))).thenReturn(customerCollection);

            String customerId = paymentIntentService.getOrCreateCustomer(user);

            assertEquals("cus_existing123", customerId);

            mockedCustomer.verify(() -> Customer.list(any(CustomerListParams.class)), times(1));
        }
    }

    @Test
    void testGetOrCreateCustomer_CreateNewCustomer() throws StripeException {
        User user = User.builder()
                .email("newuser@example.com")
                .firstName("New")
                .lastName("User")
                .build();

        try (MockedStatic<Customer> mockedCustomer = mockStatic(Customer.class)) {
            CustomerCollection emptyCollection = mock(CustomerCollection.class);
            when(emptyCollection.getData()).thenReturn(List.of());
            mockedCustomer.when(() -> Customer.list(any(CustomerListParams.class))).thenReturn(emptyCollection);

            Customer newCustomer = mock(Customer.class);
            when(newCustomer.getId()).thenReturn("cus_new123");
            mockedCustomer.when(() -> Customer.create(any(CustomerCreateParams.class))).thenReturn(newCustomer);

            String customerId = paymentIntentService.getOrCreateCustomer(user);

            assertEquals("cus_new123", customerId);

            mockedCustomer.verify(() -> Customer.list(any(CustomerListParams.class)), times(1));
            mockedCustomer.verify(() -> Customer.create(any(CustomerCreateParams.class)), times(1));
        }
    }

    @Test
    void testCreatePaymentIntent_Success() throws StripeException {
        User user = User.builder()
                .email("payuser@example.com")
                .firstName("Pay")
                .lastName("User")
                .build();

        Order order = Order.builder()
                .id(UUID.randomUUID())
                .user(user)
                .build();

        try (MockedStatic<Customer> mockedCustomer = mockStatic(Customer.class);
             MockedStatic<PaymentIntent> mockedPaymentIntent = mockStatic(PaymentIntent.class)) {

            CustomerCollection emptyCollection = mock(CustomerCollection.class);
            when(emptyCollection.getData()).thenReturn(List.of());
            mockedCustomer.when(() -> Customer.list(any(CustomerListParams.class))).thenReturn(emptyCollection);

            Customer newCustomer = mock(Customer.class);
            when(newCustomer.getId()).thenReturn("cus_test_123");
            mockedCustomer.when(() -> Customer.create(any(CustomerCreateParams.class))).thenReturn(newCustomer);

            PaymentIntent paymentIntent = mock(PaymentIntent.class);
            when(paymentIntent.getClientSecret()).thenReturn("pi_client_secret_123");
            mockedPaymentIntent.when(() -> PaymentIntent.create(any(PaymentIntentCreateParams.class))).thenReturn(paymentIntent);

            Map<String, String> paymentMap = paymentIntentService.createPaymentIntent(order);

            assertNotNull(paymentMap);
            assertEquals("pi_client_secret_123", paymentMap.get("client_secret"));

            mockedCustomer.verify(() -> Customer.list(any(CustomerListParams.class)), times(1));
            mockedCustomer.verify(() -> Customer.create(any(CustomerCreateParams.class)), times(1));
            mockedPaymentIntent.verify(() -> PaymentIntent.create(any(PaymentIntentCreateParams.class)), times(1));
        }
    }
}

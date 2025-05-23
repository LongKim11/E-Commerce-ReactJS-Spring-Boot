package com.longkimvo.proathlete.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.longkimvo.proathlete.dto.OrderDeliveryStatusRequest;
import com.longkimvo.proathlete.dto.OrderRequest;
import com.longkimvo.proathlete.dto.OrderResponse;
import com.longkimvo.proathlete.entities.Order;
import com.longkimvo.proathlete.enums.OrderStatus;
import com.longkimvo.proathlete.services.OrderService;
import com.longkimvo.proathlete.services.PaymentIntentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.security.Principal;
import java.util.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class OrderControllerTest {

    private MockMvc mockMvc;

    @Mock
    private OrderService orderService;

    @Mock
    private PaymentIntentService paymentIntentService;

    @InjectMocks
    private OrderController orderController;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(orderController).build();
    }

    @Test
    void testCreateOrder() throws Exception {
        OrderRequest orderRequest = OrderRequest.builder()
                .totalAmount(100.0)
                .paymentMethod("card")
                .build();

        OrderResponse orderResponse = OrderResponse.builder()
                .order_id(UUID.randomUUID())
                .paymentMethod("card")
                .credentials(Map.of("client_secret", "secret_key"))
                .build();

        Principal principal = () -> "user@example.com";

        when(orderService.createOrder(any(OrderRequest.class), any(Principal.class))).thenReturn(orderResponse);

        mockMvc.perform(post("/api/orders")
                        .principal(principal)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.order_id").exists())
                .andExpect(jsonPath("$.paymentMethod").value("card"))
                .andExpect(jsonPath("$.credentials.client_secret").value("secret_key"));

        verify(orderService, times(1)).createOrder(any(OrderRequest.class), any(Principal.class));
    }

    @Test
    void testUpdatePaymentStatus() throws Exception {
        Map<String, String> request = Map.of("paymentIntent", "pi_123", "status", "succeeded");
        Map<String, String> response = Map.of("result", "updated");

        when(orderService.updateStatus("pi_123", "succeeded")).thenReturn(response);

        mockMvc.perform(post("/api/orders/update-payment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").value("updated"));

        verify(orderService, times(1)).updateStatus("pi_123", "succeeded");
    }

    @Test
    void testGetOrdersByUser() throws Exception {
        Principal principal = () -> "user@example.com";
        List<Order> orders = List.of(new Order(), new Order());

        when(orderService.getOrdersByUser("user@example.com")).thenReturn(orders);

        mockMvc.perform(get("/api/orders/user")
                        .principal(principal))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));

        verify(orderService, times(1)).getOrdersByUser("user@example.com");
    }

    @Test
    void testGetAllOrders_Authorized() throws Exception {
        Principal principal = () -> "admin@example.com";
        List<Order> orders = List.of(new Order(), new Order(), new Order());

        when(orderService.getAllOrders("admin@example.com")).thenReturn(orders);

        mockMvc.perform(get("/api/orders")
                        .principal(principal))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3));

        verify(orderService, times(1)).getAllOrders("admin@example.com");
    }

    @Test
    void testGetAllOrders_Unauthorized() throws Exception {
        Principal principal = () -> "user@example.com";

        when(orderService.getAllOrders("user@example.com")).thenReturn(null);

        mockMvc.perform(get("/api/orders")
                        .principal(principal))
                .andExpect(status().isUnauthorized());

        verify(orderService, times(1)).getAllOrders("user@example.com");
    }

    @Test
    void testUpdateOrderDeliveryStatus() throws Exception {
        UUID orderId = UUID.randomUUID();

        OrderDeliveryStatusRequest deliveryStatusRequest = new OrderDeliveryStatusRequest();
        deliveryStatusRequest.setStatus(OrderStatus.DELIVERED);

        Order updatedOrder = new Order();
        updatedOrder.setId(orderId);

        when(orderService.updateOrderDeliveryStatus(eq(orderId), any(OrderDeliveryStatusRequest.class))).thenReturn(updatedOrder);

        mockMvc.perform(put("/api/orders/{id}", orderId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(deliveryStatusRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(orderId.toString()));

        verify(orderService, times(1)).updateOrderDeliveryStatus(eq(orderId), any(OrderDeliveryStatusRequest.class));
    }
}

package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.auth.entities.Authority;
import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.dto.OrderDeliveryStatusRequest;
import com.longkimvo.proathlete.dto.OrderItemRequest;
import com.longkimvo.proathlete.dto.OrderRequest;
import com.longkimvo.proathlete.dto.OrderResponse;
import com.longkimvo.proathlete.entities.*;
import com.longkimvo.proathlete.enums.OrderStatus;
import com.longkimvo.proathlete.repositories.OrderRepository;
import com.stripe.model.PaymentIntent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import org.springframework.security.core.userdetails.UserDetailsService;

import java.security.Principal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class OrderServiceTest {

    @InjectMocks
    private OrderService orderService;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductService productService;

    @Mock
    private PaymentIntentService paymentIntentService;

    @Mock
    private Principal principal;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateOrder_WithCardPayment_Success() throws Exception {
        UUID addressId = UUID.randomUUID();
        UUID productId = UUID.randomUUID();
        UUID productVariantId = UUID.randomUUID();

        User user = User.builder()
                .email("test@example.com")
                .firstName("John")
                .lastName("Doe")
                .addressList(List.of(
                        Address.builder().id(addressId).build()
                ))
                .build();

        when(principal.getName()).thenReturn("test@example.com");
        when(userDetailsService.loadUserByUsername("test@example.com")).thenReturn(user);

        Product product = Product.builder()
                .id(productId)
                .resources(new LinkedList<>(List.of(Resource.builder().url("http://image-url").build())))
                .build();

        when(productService.getProductByID(productId)).thenReturn(product);

        OrderItemRequest orderItemRequest = OrderItemRequest.builder()
                .productID(productId)
                .productVariantID(productVariantId)
                .size("M")
                .color("Red")
                .quantity(2)
                .price(50.0)
                .subTotal(100.0)
                .build();

        OrderRequest orderRequest = OrderRequest.builder()
                .addressID(addressId)
                .orderItemRequestList(List.of(orderItemRequest))
                .totalAmount(100.0)
                .expectedDeliveryDate(new Date())
                .paymentMethod("CARD")
                .build();

        Order savedOrder = Order.builder()
                .id(UUID.randomUUID())
                .build();

        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);
        when(paymentIntentService.createPaymentIntent(any(Order.class))).thenReturn(Map.of("client_secret", "secret_key"));

        OrderResponse response = orderService.createOrder(orderRequest, principal);

        assertNotNull(response);
        assertEquals(savedOrder.getId(), response.getOrder_id());
        assertEquals("CARD", response.getPaymentMethod());
        assertNotNull(response.getCredentials());
        assertEquals("secret_key", response.getCredentials().get("client_secret"));

        verify(orderRepository, times(1)).save(any(Order.class));
        verify(paymentIntentService, times(1)).createPaymentIntent(any(Order.class));
    }

    @Test
    void testCreateOrder_WithOtherPaymentMethod_Success() throws Exception {
        UUID addressId = UUID.randomUUID();
        UUID productId = UUID.randomUUID();
        UUID productVariantId = UUID.randomUUID();

        User user = User.builder()
                .email("test2@example.com")
                .firstName("Jane")
                .lastName("Smith")
                .addressList(List.of(
                        Address.builder().id(addressId).build()
                ))
                .build();

        when(principal.getName()).thenReturn("test2@example.com");
        when(userDetailsService.loadUserByUsername("test2@example.com")).thenReturn(user);

        Product product = Product.builder()
                .id(productId)
                .resources(new LinkedList<>(List.of(Resource.builder().url("http://image-url2").build())))
                .build();

        when(productService.getProductByID(productId)).thenReturn(product);

        OrderItemRequest orderItemRequest = OrderItemRequest.builder()
                .productID(productId)
                .productVariantID(productVariantId)
                .size("L")
                .color("Blue")
                .quantity(1)
                .price(75.0)
                .subTotal(75.0)
                .build();

        OrderRequest orderRequest = OrderRequest.builder()
                .addressID(addressId)
                .orderItemRequestList(List.of(orderItemRequest))
                .totalAmount(75.0)
                .expectedDeliveryDate(new Date())
                .paymentMethod("CASH")
                .build();

        Order savedOrder = Order.builder()
                .id(UUID.randomUUID())
                .build();

        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        OrderResponse response = orderService.createOrder(orderRequest, principal);

        assertNotNull(response);
        assertEquals(savedOrder.getId(), response.getOrder_id());
        assertEquals("CASH", response.getPaymentMethod());
        assertNull(response.getCredentials());

        verify(orderRepository, times(1)).save(any(Order.class));
        verify(paymentIntentService, never()).createPaymentIntent(any(Order.class));
    }

    @Test
    void testUpdateStatus_Success() throws Exception {
        UUID orderId = UUID.randomUUID();
        String paymentIntentId = "pi_test_123";

        PaymentIntent paymentIntent = mock(PaymentIntent.class);
        when(paymentIntent.getStatus()).thenReturn("succeeded");
        Map<String, String> metadata = new HashMap<>();
        metadata.put("orderID", orderId.toString());
        when(paymentIntent.getMetadata()).thenReturn(metadata);
    }

    @Test
    void testGetOrdersByUser_Success() {
        String username = "user1";
        User user = User.builder()
                .email(username)
                .build();

        when(userDetailsService.loadUserByUsername(username)).thenReturn(user);

        List<Order> orders = List.of(Order.builder().id(UUID.randomUUID()).build());
        when(orderRepository.findByUser(user)).thenReturn(orders);

        List<Order> result = orderService.getOrdersByUser(username);

        assertEquals(orders.size(), result.size());
        verify(orderRepository, times(1)).findByUser(user);
    }

    @Test
    void testGetAllOrders_AdminRole() {
        String username = "admin";
        Authority adminAuthority = Authority.builder().roleCode("ADMIN").build();
        User user = User.builder()
                .email(username)
                .authorities(List.of(adminAuthority))
                .build();

        when(userDetailsService.loadUserByUsername(username)).thenReturn(user);

        List<Order> orders = List.of(Order.builder().id(UUID.randomUUID()).build());
        when(orderRepository.findAll()).thenReturn(orders);

        List<Order> result = orderService.getAllOrders(username);

        assertNotNull(result);
        assertEquals(orders.size(), result.size());
        verify(orderRepository, times(1)).findAll();
    }

    @Test
    void testGetAllOrders_NonAdminRole() {
        String username = "user";
        Authority userAuthority = Authority.builder().roleCode("USER").build();
        User user = User.builder()
                .email(username)
                .authorities(List.of(userAuthority))
                .build();

        when(userDetailsService.loadUserByUsername(username)).thenReturn(user);

        List<Order> result = orderService.getAllOrders(username);

        assertNull(result);
        verify(orderRepository, never()).findAll();
    }

    @Test
    void testUpdateOrderDeliveryStatus_Success() {
        UUID orderId = UUID.randomUUID();
        Order order = Order.builder().id(orderId).orderStatus(OrderStatus.PENDING).build();

        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        OrderDeliveryStatusRequest request = new OrderDeliveryStatusRequest();
        request.setStatus(OrderStatus.SHIPPED);

        Order updatedOrder = orderService.updateOrderDeliveryStatus(orderId, request);

        assertEquals(OrderStatus.SHIPPED, updatedOrder.getOrderStatus());
        verify(orderRepository, times(1)).save(order);
    }

    @Test
    void testUpdateOrderDeliveryStatus_NotFound() {
        UUID orderId = UUID.randomUUID();

        when(orderRepository.findById(orderId)).thenReturn(Optional.empty());

        OrderDeliveryStatusRequest request = new OrderDeliveryStatusRequest();
        request.setStatus(OrderStatus.SHIPPED);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            orderService.updateOrderDeliveryStatus(orderId, request);
        });

        assertEquals("Order not found", exception.getMessage());
        verify(orderRepository, never()).save(any(Order.class));
    }
}

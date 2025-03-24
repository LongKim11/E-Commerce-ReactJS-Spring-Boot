package com.longkimvo.proathlete.services;

import com.longkimvo.proathlete.auth.entities.User;
import com.longkimvo.proathlete.dto.OrderRequest;
import com.longkimvo.proathlete.entities.*;
import com.longkimvo.proathlete.enums.OrderStatus;
import com.longkimvo.proathlete.enums.PaymentStatus;
import com.longkimvo.proathlete.repositories.OrderRepository;
import com.longkimvo.proathlete.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;


    @Transactional
    public Order createOrder (OrderRequest orderRequest, Principal principal) throws BadRequestException {
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        Address address = user.getAddressList().stream().filter((address1 -> orderRequest.getAddressID().equals(address1.getId()))).findFirst().orElseThrow(BadRequestException::new);

        Order order = Order.builder()
                .user(user)
                .address(address)
                .totalAmount(orderRequest.getTotalAmount())
                .orderDate(new Date())
                .expectedDeliveryDate(orderRequest.getExpectedDeliveryDate())
                .orderStatus(OrderStatus.PENDING)
                .build();

        List<OrderItem> orderItems = orderRequest.getOrderItemRequestList().stream().map(orderItemRequest -> {
            Product product = productService.getProductByID(orderItemRequest.getProductID());
            return OrderItem.builder()
                    .product(product)
                    .productVariantID(orderItemRequest.getProductVariantID())
                    .quantity(orderItemRequest.getQuantity())
                    .price(orderItemRequest.getPrice())
                    .subTotal(orderItemRequest.getSubTotal())
                    .order(order)
                    .build();
        }).toList();

        order.setOrderItemList(orderItems);

        Payment payment = new Payment();
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod("");
        payment.setPaymentDate(new Date());

        order.setPayment(payment);

        return orderRepository.save(order);
    }
}

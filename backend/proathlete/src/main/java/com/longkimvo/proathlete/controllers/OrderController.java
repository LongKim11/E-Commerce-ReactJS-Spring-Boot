package com.longkimvo.proathlete.controllers;

import com.longkimvo.proathlete.dto.OrderRequest;
import com.longkimvo.proathlete.dto.OrderResponse;
import com.longkimvo.proathlete.entities.Order;
import com.longkimvo.proathlete.services.OrderService;
import com.longkimvo.proathlete.services.PaymentIntentService;
import com.stripe.exception.StripeException;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    PaymentIntentService paymentIntentService;

    @PostMapping
    public ResponseEntity<?> createOrder (@RequestBody OrderRequest orderRequest, Principal principal) throws BadRequestException, StripeException {
        OrderResponse orderResponse = orderService.createOrder(orderRequest, principal);

        return new ResponseEntity<>(orderResponse, HttpStatus.OK);
    }

    @PostMapping("/update-payment")
    public ResponseEntity<?> updatePaymentStatus (@RequestBody  Map<String, String> request) {
        Map<String, String> response = orderService.updateStatus(request.get("paymentIntent"), request.get("status"));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> getOrdersByUser(Principal principal) {
        List<Order> orderDetails = orderService.getOrdersByUser(principal.getName());
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }

}

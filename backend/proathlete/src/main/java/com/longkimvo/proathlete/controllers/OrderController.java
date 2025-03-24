package com.longkimvo.proathlete.controllers;

import com.longkimvo.proathlete.dto.OrderRequest;
import com.longkimvo.proathlete.entities.Order;
import com.longkimvo.proathlete.services.OrderService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder (@RequestBody OrderRequest orderRequest, Principal principal) throws BadRequestException {
        Order order = orderService.createOrder(orderRequest, principal);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
